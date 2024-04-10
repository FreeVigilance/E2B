import enum
import functools
import types
import typing as t

import pydantic as pd
import pydantic_core as pdc

from extensions import utils


class ErrorType(enum.StrEnum):
    CUSTOM = enum.auto()


class PostValidatableModel(pd.BaseModel):
    @pd.model_validator(mode='wrap')
    @classmethod
    def _model_validate_wrap(cls, data: t.Any, handler: pd.ValidatorFunctionWrapHandler) -> t.Self:
        error_fields = set()
        errors = list()

        try:
            return handler(data)

        except pd.ValidationError as exc:
            errors = exc.errors()
            for e in errors:
                loc = e['loc']
                if loc:
                    error_fields.add(loc[0])

        finally:
            processor = PostValidationProcessor(data, errors)
            cls._post_validate(processor)
            errors = processor.errors
            if errors:
                raise pd.ValidationError.from_exception_data(title=cls.__name__, line_errors=errors)
            
    @classmethod
    def _post_validate(cls, processor: 'PostValidationProcessor'):
        """Override it for custom validation after basic pydantic validation."""


class SafeValidatableModel(pd.BaseModel):
    """
    Allows parsing models from dicts and then safe validating them.
    All models in the hierarchy must have this class among their supers for algorithm to work.
    """

    _SELF_ERRORS_KEY: t.ClassVar = '_self'
    _PARSE_CLASS: t.ClassVar = pd.BaseModel

    _errors: dict[str, t.Any] = {}
    _exception: pd.ValidationError | None = None

    @pd.computed_field(alias='_errors')
    @property
    def errors(self) -> dict[str, t.Any]:
        return self._errors
    
    @errors.setter
    def errors(self, val: dict[str, t.Any]) -> None:
        self._errors = val

    @property
    def exception(self) -> pd.ValidationError | None:
        return self._exception
    
    @property
    def is_valid(self) -> bool:
        return not self._errors and not self._exception
    
    def model_safe_validate(
        self, 
        initial_data: dict[str, t.Any] | None = None, 
        *, 
        context: dict[str, t.Any] | None = None
    ) -> t.Self:
        
        if initial_data == None:
            # Dump model as pydantic will not validate the model itself
            # and ignore warnings about wrong data format and etc.
            initial_data = utils.exec_without_warnings(lambda: self.model_dump())     

        result_self = self
        try:
            result_self = self.model_validate(initial_data, context=context)

        except pd.ValidationError as e:
            self._exception = e

            for err in e.errors():
                loc = err['loc']
                msg = err['msg']

                if not loc:
                    utils.update_or_create_list_in_dict(self._errors, self._SELF_ERRORS_KEY, msg)

                errors = self._errors
                for key in loc:
                    errors = utils.get_or_create_dict_in_dict(errors, key)
                utils.update_or_create_list_in_dict(errors, self._SELF_ERRORS_KEY, msg)

        finally:
            return result_self

    @classmethod
    def model_parse(cls, data: dict[str, t.Any]) -> t.Self:
        """Converts model dicts to model instances without validation and calls the super."""

        type_hints = cls.get_type_hints()
        parsed_data = data.copy()
        
        for key, val in data.items():
            if key not in cls.model_fields:
                continue

            field_type = type_hints.get(key)
            if not field_type:
                continue
            
            field_type_origin = t.get_origin(field_type)
            field_type_args = t.get_args(field_type)
            field_type_first_arg = field_type_args[0] if field_type_args else None

            # Check if model
            if isinstance(val, dict):
                if isinstance(field_type, type) and issubclass(field_type, cls._PARSE_CLASS):
                    parsed_data[key] = field_type.model_parse(val)

                # Actually check `Optional[T]`, `T | None`, `Union[T, None]`
                elif (field_type_origin in [t.Union, types.UnionType]
                        and len(field_type_args) == 2
                        and field_type_args[1] == type(None)
                        and issubclass(field_type_first_arg, cls._PARSE_CLASS)):
                
                    parsed_data[key] = field_type_first_arg.model_parse(val)
            
            # Check if list of models
            if (isinstance(val, list)
                    and isinstance(field_type, types.GenericAlias)
                    and issubclass(field_type_origin, list)
                    and field_type_args):

                parsed_list = []

                for item in val:
                    parsed_item = item
                    if isinstance(item, dict) and issubclass(field_type_first_arg, cls._PARSE_CLASS):
                        parsed_item = field_type_first_arg.model_parse(item)
                    parsed_list.append(parsed_item)

                parsed_data[key] = parsed_list

        return super().model_construct(**parsed_data)

    @classmethod
    @functools.cache
    def get_type_hints(cls):
        return t.get_type_hints(cls)


class PostValidationProcessor:
    def __init__(self, data: dict[str, t.Any], errors: list[pdc.ErrorDetails]) -> None:
        self._data = data

        self._errors = []
        for error in errors: 
            error_type = error.get('type')
            if error_type in ErrorType:
                # Crutch for error with custom type because of the bug in pydantic
                self._errors.append(
                    self._build_error(
                        error_type,
                        error.get('msg'),
                        error.get('loc'),
                        error.get('input'),
                        error.get('ctx')
                    )
                )
            else:
                self._errors.append(error)

        self._error_field_names = set()
        for e in errors:
            loc = e['loc']
            if loc:
                self._error_field_names.add(loc[0])

    @property
    def errors(self) -> list[pdc.ErrorDetails | pdc.InitErrorDetails]:
        return self._errors

    def try_validate(
        self, 
        field_names: tuple[str, ...], 
        error_message: str, 
        validate: t.Callable[[t.Any], bool], 
        *, 
        is_abort_next: bool = False
    ) -> None:
        
        field_names_set = set(field_names)
        
        # If errors were founnd before for these fields
        # (after basic pydantic validation, 
        #  or custom validation on embedded models, 
        #  or previous custom validation for this model with `is_abort_next = True`),
        # validation shouldn't be done
        if self._error_field_names & field_names_set:
            return
        
        try:
            data = {f: self._data[f] for f in field_names}
        except KeyError:
            # If some data is missing, valdiaion shouldn't be done
            return
        
        is_valid = validate(*data.values())

        if not is_valid:
            for field_name in field_names:
                self._errors.append(
                    self._build_error(
                        ErrorType.CUSTOM,
                        error_message,
                        (field_name,),
                        data,
                        {}
                    )
                )
            # Prevents further validation for these fields 
            if is_abort_next:
                self._error_field_names |= field_names_set

    def _build_error(
        self, 
        type: str, 
        message: str, 
        loc: tuple[int | str, ...] | None, 
        input: t.Any, 
        ctx: dict[str, t.Any] | None
    ) -> pdc.InitErrorDetails:
        
        return pdc.InitErrorDetails(
            type=pdc.PydanticCustomError(
                type,
                message
            ),
            loc=loc,
            input=input,
            ctx=ctx
        )