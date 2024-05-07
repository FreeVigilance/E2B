from app.src.connectors.base.model_converters.base import BaseModelConverter
from app.src.layers.base.services import Service


class BaseServiceAdapter[U, L](Service[U]):
    def __init__(
        self, 
        adapted_service: Service[L],
        *,
        upper_to_lower_model_converter: BaseModelConverter[U, L],
        lower_to_upper_model_converter: BaseModelConverter[L, U]
    ) -> None:
        
        self.adapted_service = adapted_service
        self.upper_to_lower_model_converter = upper_to_lower_model_converter
        self.lower_to_upper_model_converter = lower_to_upper_model_converter

    def list(self, upper_model_class: type[U]) -> list[int]:
        lower_model_class = self.upper_to_lower_model_converter.get_target_model_class(upper_model_class)
        return self.adapted_service.list(lower_model_class)

    def read(self, upper_model_class: type[U], pk: int) -> U:
        lower_model_class = self.upper_to_lower_model_converter.get_target_model_class(upper_model_class)
        lower_model = self.adapted_service.read(lower_model_class, pk)
        upper_model = self.lower_to_upper_model_converter.convert(lower_model)
        return upper_model

    def create(self, upper_model: U) -> U:
        lower_model = self.upper_to_lower_model_converter.convert(upper_model)
        lower_model = self.adapted_service.create(lower_model)
        upper_model = self.lower_to_upper_model_converter.convert(lower_model)
        return upper_model

    def update(self, upper_model: U, pk: int) -> U:
        lower_model = self.upper_to_lower_model_converter.convert(upper_model)
        lower_model = self.adapted_service.update(lower_model, pk)
        upper_model = self.lower_to_upper_model_converter.convert(lower_model)
        return upper_model

    def delete(self, upper_model_class: type[U], pk: int) -> None:
        lower_model_class = self.upper_to_lower_model_converter.get_target_model_class(upper_model_class)
        return self.adapted_service.delete(lower_model_class, pk)
