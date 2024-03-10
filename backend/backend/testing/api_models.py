# from pydantic import BaseModel, model_validator
# from pydantic_core import PydanticCustomError
#
#
# class Value[T](BaseModel):
#     value: T | None = None
#
#
# class NullableValue[T](Value[T]):
#     null_flavor: str | None = None
#
#     @model_validator(mode='after')
#     def _check_value_and_null_flavor_are_not_present_together(self) -> 'NullableValue':
#         if self.null_flavor is not None and self.value is not None:
#             raise PydanticCustomError('data_error', 'Null flavor should not be present if value is present')
#         return self
#
#
# class BaseApiModel(BaseModel):
#     id: int | None = None
#
#
# class ContainerApiModel(BaseApiModel):
#     elements: list['ElementApiModel'] = []
#
#
# class ElementApiModel(BaseApiModel):
#     text: NullableValue[str] = NullableValue[str]()
#     num: Value[int] = Value[int]()