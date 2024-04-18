import abc
import functools
import string
import typing as t

import pydantic as pd
import pydantic_core as pdc

from app.src.hl7date import HL7DateUtils, DatePrecision
from extensions import pydantic as pde


# This class and all its children expect that the owner model passes the validation context
class BaseType[T](abc.ABC):
    @classmethod
    def _validate(cls, val: t.Any, info: pd.ValidationInfo, type_param: T) -> t.Any:
        from app.src.layers.domain.models import DomainModel

        if val is None:
            return val
        
        is_ok, err_msg = cls._validate_parsing(val, info, type_param)
        if not is_ok:
            raise pdc.PydanticCustomError(pde.CustomErrorType.PARSING, err_msg)
        
        if not info.context.get(DomainModel.BUSINESS_VALIDATION_FLAG_KEY):
            return val
        
        is_ok, err_msg = cls._validate_business(val, info, type_param)
        if not is_ok:
            raise pdc.PydanticCustomError(pde.CustomErrorType.BUSINESS, err_msg)
        
        return val

    @classmethod
    def _validate_parsing(cls, val: t.Any, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        """
        Override in the derived class. 
        Return the flag showing if validation was successful and the error message to be used if wasn't.
        """
        return True, ''

    @classmethod
    def _validate_business(cls, val: t.Any, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        """
        Override in the derived class. 
        Return the flag showing if validation was successful and the error message to be used if wasn't.
        """
        return True, ''

    @classmethod
    def _get_pydantic_core_schema(cls, source_type: t.Any, handler: pd.GetCoreSchemaHandler) -> pdc.CoreSchema:
        """Must be called from the derived class."""
        try:
            type_param = t.get_args(t.get_args(source_type)[0])[0]
        except IndexError:
            raise RuntimeError(f'Expected type param to be set as {cls.__name__}[Literal[type_param]]')

        return pdc.core_schema.chain_schema([
            pdc.core_schema.str_schema(),
            pdc.core_schema.with_info_plain_validator_function(
                functools.partial(
                    cls._validate,
                    type_param=type_param
                ),
                field_name=handler.field_name
            )
        ])
    

class BaseAlphaType[T: int](BaseType[T], str):
    @classmethod
    def _validate_business(cls, val: str, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        max_length = type_param
        length = len(val)
        return length <= max_length, f'Text length cannot be grater than {max_length}, got {length}'


class AlphaNumeric[T: int](BaseAlphaType[T]):
    SPECIAL_CHARS = set(string.punctuation + string.whitespace)

    @classmethod
    def _validate_parsing(cls, val: str, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        return ''.join(set(val) - cls.SPECIAL_CHARS).isalnum(), \
            'Value can contain only alphabetic, numerical, special and whitespace characters'
    
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: t.Any, handler: pd.GetCoreSchemaHandler) -> pdc.CoreSchema:
        return cls._get_pydantic_core_schema(source_type, handler)
    

class Alpha[T: int](BaseAlphaType[T]):
    @classmethod
    def _validate_parsing(cls, val: str, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        return val.isalpha(), 'Value can contain only alphabetic characters'
    
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: t.Any, handler: pd.GetCoreSchemaHandler) -> pdc.CoreSchema:
        return cls._get_pydantic_core_schema(source_type, handler)


class Datetime[T: DatePrecision](BaseType[T], str):
    @classmethod
    def _validate_parsing(cls, val: t.Any, info: pd.ValidationInfo, type_param: T) -> tuple[bool, str]:
        try:
            precision = HL7DateUtils.parse_and_get_precision(val)
            info.context['precision'] = precision
            return True, ''
        except ValueError as e:
            return False, str(e)

    @classmethod
    def _validate_business(cls, val: t.Any, info: pd.ValidationInfo, type_param: T) -> tuple[bool]:
        min_precision = type_param
        precision = info.context['precision']  # Is set in _validate_parsing
        return precision >= min_precision, f'Expected at least {min_precision.name.lower()} precision'
    
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: t.Any, handler: pd.GetCoreSchemaHandler) -> pdc.CoreSchema:
        return cls._get_pydantic_core_schema(source_type, handler)