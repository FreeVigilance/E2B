import enum
from typing import Literal, Any, Self
from pydantic import field_validator, BaseModel


class DatetimePrecision(enum.IntEnum):
    YEAR = enum.auto()
    MONTH = enum.auto()
    DAY = enum.auto()


class NullableDatetime[PrecisionValue](BaseModel):
    year: int | None = None
    month: int | None = None
    day: int | None = None
    # hour: int | None = None
    # minute: int | None = None
    # second: int | None = None
    # microsecond: int | None = None
    # pr: Precision | None = None

    def __class_getitem__(cls, type_var_val: PrecisionValue):
        print('__class_getitem__', type_var_val)
        typed_cls = super().__class_getitem__(type_var_val)
        typed_cls.__type_var_val = type_var_val
        return typed_cls

    @classmethod
    def get_type_var_val(cls) -> PrecisionValue:
        return cls.__type_var_val

    @classmethod
    def from_str(cls, string) -> Self:
        pass


class Entity(BaseModel):
    dtr: NullableDatetime[DatetimePrecision.YEAR]
    dto: NullableDatetime[DatetimePrecision.MONTH] | None = None


vals = {}
src_data = {
    'dtr': {
        'year': 2023,
        # 'pr': DatetimePrecision.YEAR
    },
    # 'dto': {
    #     'year': 2002
    # }
}
# for field_name, field_vals_dict in src_data.items():
#     annotation = Entity.__annotations__[field_name]
#     if isinstance(annotation, UnionType):
#         val_cls = annotation.__args__[0]
#     else:
#         val_cls = annotation
#     vals[field_name] = val_cls(**field_vals_dict)
