import enum
import functools
import inspect
import types
import typing as t

import pydantic as pd
import pydantic_core as pdc

from extensions import utils


class CustomErrorType(enum.StrEnum):
    # From this names error list keys are created, therefore change them with caution, 
    # as some code can depend on these keys
    PARSING = enum.auto()
    BUSINESS = enum.auto()


class PostValidatableModel(pd.BaseModel):
    """Allows custom validation to avoid problems with basic pydantic consequential field validation."""

    _CURRENT_CONTEXT_KEY: t.ClassVar = '_context'
    _VALID_DATA_KEY: t.ClassVar = '_validated_data'

    tech_mock: t.Any = pd.Field(default=None, exclude=True)

    @classmethod
    def model_validate(
        cls: type[t.Self],
        obj: t.Any,
        *,
        strict: bool | None = None,
        from_attributes: bool | None = None,
        context: dict[str, t.Any] | None = None,
    ) -> t.Self:
        # Note that this won't be called from __init__
        if context is None: 
            context = {}
        return super().model_validate(obj, strict=strict, from_attributes=from_attributes, context=context)

    @pd.model_validator(mode='wrap')
    @classmethod
    def _post_validate_wrap(cls, data: t.Any, handler: pd.ValidatorFunctionWrapHandler, info: pd.ValidationInfo) -> t.Self:
        """
        Allows custom validation and concatenates custom errors with catched basic pydantic errors.
        Note that other model_validator declared in a derived model will be called outside this method.
        """
        data['tech_mock'] = None

        context = cls._get_deepest_context(info)
        if context is not None:
            # Create deeper context to isolate current model context
            context[cls._CURRENT_CONTEXT_KEY] = {cls._VALID_DATA_KEY: None}

        errors = list()
        expected_exception = None
        unexpected_exception = None

        try:
            return handler(data)

        except pd.ValidationError as e:
            expected_exception = e

        except BaseException as e:
            unexpected_exception = e

        finally:
            if unexpected_exception:
                raise unexpected_exception
            
            if expected_exception:
                errors = expected_exception.errors()

            if context is not None:
                valid_data = context[cls._CURRENT_CONTEXT_KEY][cls._VALID_DATA_KEY]
                if valid_data:
                    processor = PostValidationProcessor(valid_data, data, errors)
                    cls._post_validate(processor)
                    errors = processor.errors

                # Delete the current context so that the upper models will see their context and not the current one
                del context[cls._CURRENT_CONTEXT_KEY]

            if errors:
                raise pd.ValidationError.from_exception_data(title=cls.__name__, line_errors=errors)
            
    @pd.field_validator('tech_mock', mode='after')
    @classmethod
    def _save_data(cls, val: t.Any, info: pd.ValidationInfo) -> t.Any:
        """
        Saves validated data into the current model context.
        Needed because pydantic doesn't allow to get succesfully validated data if at least one error has occurred.
        """
        context = cls._get_deepest_context(info)
        if context is not None:
            # Data is saved by reference, thus will be avaiable in model validator being filled with all valid fields
            context[cls._VALID_DATA_KEY] = info.data
        return val
            
    @classmethod
    def _get_deepest_context(cls, info: pd.ValidationInfo) -> dict[t.Any, t.Any] | None:
        context = info.context
        if context is None:
            return None
        while cls._CURRENT_CONTEXT_KEY in context:
            context = context[cls._CURRENT_CONTEXT_KEY]
        return context
            
    @classmethod
    def _post_validate(cls, processor: 'PostValidationProcessor') -> None:
        """Override it for custom validation after basic pydantic validation."""


class SafeValidatableModel(pd.BaseModel):
    """
    Allows parsing models from dicts and then safe validating them.
    All models in the hierarchy must have this class among their bases for algorithm to work.
    """

    SELF_ERRORS_KEY: t.ClassVar = '_self'

    _errors: dict[str, t.Any] = {}
    _exception: pd.ValidationError | None = None

    @pd.computed_field(alias='_errors')
    @property
    def errors(self) -> dict[str, t.Any]:
        return self._errors.copy()
    
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
        """Validates model without throwing a validation error and saving it instead."""
        
        if initial_data is None:
            # Dump model as pydantic will not validate the model itself
            # and ignore warnings about wrong data format and etc.
            initial_data = utils.exec_without_warnings(lambda: self.model_dump())     

        result_self = self
        unexpected_exception = None

        try:
            result_self = self.model_validate(initial_data, context=context)

        except pd.ValidationError as e:
            self._exception = e

        except BaseException as e:
            unexpected_exception = e

        finally:
            if unexpected_exception:
                raise unexpected_exception
            
            result_self._save_errors(initial_data)
            return result_self
        
    def _save_errors(self, initial_data: dict[str, t.Any]) -> None:
        if not self._exception:
            return
            
        # Saving errors as dict of dicts (of dicts and so on) with max depth = max len of loc
        for err in self._exception.errors():
            errors = self._errors
            loc = err['loc']

            if loc:
                context_data = initial_data

                for key in loc:
                    if isinstance(key, int):
                        context_data = context_data[key]
                    else:  # dict
                        # If key not in data, then pydntic generated specific error, which will be saved on field level
                        # (e.g. several erros for union type conversion)
                        if key not in context_data:
                            break
                        context_data = context_data[key]

                    errors = utils.get_or_create_dict_in_dict(errors, key)

            errors = utils.get_or_create_dict_in_dict(errors, self.SELF_ERRORS_KEY)

            try:
                # Trying to parse custom type if it is one
                type_ = CustomErrorType(err['type']).value
            except ValueError:
                # This type will be used for any pydantic type
                type_ = CustomErrorType.PARSING
            
            utils.update_or_create_list_in_dict(errors, type_, err['msg'])

    @classmethod
    def model_dict_construct(cls, data: dict[str, t.Any]) -> t.Self:
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
                if (
                    isinstance(field_type, type)
                    and issubclass(field_type, SafeValidatableModel)
                ):
                    parsed_data[key] = field_type.model_dict_construct(val)

                # Actually check `Optional[T]`, `T | None`, `Union[T, None]`
                elif (
                    field_type_origin in [t.Union, types.UnionType]
                    and len(field_type_args) == 2
                    and field_type_args[1] == type(None)
                    and issubclass(field_type_first_arg, SafeValidatableModel)
                ):
                    parsed_data[key] = field_type_first_arg.model_dict_construct(val)
            
            # Check if list of models
            if (
                isinstance(val, list)
                and isinstance(field_type, types.GenericAlias)
                and issubclass(field_type_origin, list)
                and field_type_args
            ):
                parsed_list = []

                for item in val:
                    parsed_item = item

                    if (
                        isinstance(item, dict) 
                        and isinstance(field_type_first_arg, type)
                        and issubclass(field_type_first_arg, SafeValidatableModel)
                    ):
                        parsed_item = field_type_first_arg.model_dict_construct(item)

                    parsed_list.append(parsed_item)

                parsed_data[key] = parsed_list

        return super().model_construct(**parsed_data)

    @classmethod
    @functools.cache
    def get_type_hints(cls):
        return t.get_type_hints(cls)


class PostValidationProcessor:
    """Manages custom validation."""

    def __init__(
        self, 
        valid_data: dict[str, t.Any], 
        initial_data: dict[str, t.Any],
        errors: list[pdc.ErrorDetails]
    ) -> None:
        self._valid_data = valid_data.copy()
        self._initial_data = initial_data.copy()

        self._errors = []
        for error in errors: 
            error_type = error.get('type')
            if error_type in CustomErrorType:
                # Crutch for error with custom type because of the bug in pydantic
                self.add_error(
                    type=error_type,
                    message=error.get('msg'),
                    loc=error.get('loc'),
                    input=error.get('input'),
                    ctx=error.get('ctx')
                )
            else:
                self._errors.append(error)

    @property
    def errors(self) -> list[pdc.ErrorDetails | pdc.InitErrorDetails]:
        return self._errors.copy()

    def try_validate_fields(
        self,
        *,
        validate: t.Callable[..., bool],
        error_message: str | None = None,
        is_abort_next: bool = False,
        is_add_single_error: bool = False,
        is_add_error_manually: bool = False,
    ) -> None:
        """
        Calls validation for fields.
        Fields are extracted from func params, thus their names must equal field names.
        If validate func params len > 1, logically it's integration validation.  
        If is_add_error_manually is True, first validate func param must be PostValidationProcessor.
        Enable is_add_single_error to display a single error on model level and not on each field level.
        """
        if not is_add_error_manually and error_message is None:
            raise ValueError('Required error_message if is_add_error_manually is disabled')

        field_names = inspect.getfullargspec(validate).args
        if is_add_error_manually:
            field_names.pop(0)

        valid_data = {}
        initial_data = {}
        try:
            for field_name in field_names:
                valid_data[field_name] = self._valid_data[field_name]
                initial_data[field_name] = self._initial_data[field_name]
        except KeyError:
            # If some data is missing, it haven't been parsed and valdiaion shouldn't be done
            return
        
        args = valid_data.values()
        if is_add_error_manually:
            is_valid = validate(self, *args) 
        else:
            is_valid = validate(*args)

        if is_valid:
            return
        
        if not is_add_error_manually:
            if is_add_single_error:
                self.add_error(
                    type=CustomErrorType.PARSING,
                    message=error_message,
                    loc=tuple(),
                    input=initial_data
                )
            else:
                for field_name in field_names:
                    self.add_error(
                        type=CustomErrorType.PARSING,
                        message=error_message,
                        loc=(field_name,),
                        input=initial_data
                    )

        # Prevent further validation for these fields 
        if is_abort_next:
            for field_name in field_names:
                self._valid_data.pop(field_name)

    def add_error(
        self, 
        *,
        type: str, 
        message: str, 
        loc: tuple[int | str, ...], 
        input: t.Any, 
        ctx: dict[str, t.Any] | None = None
    ) -> None:
        self._errors.append(
            pdc.InitErrorDetails(
                type=pdc.PydanticCustomError(
                    type,
                    message
                ),
                loc=loc,
                input=input,
                ctx=ctx
            )
        )