from app.src.model_converters.base import ModelConverter
from app.src.shared.services import SupportsServiceMethods


class ServiceAdapter[U, L](SupportsServiceMethods[U]):
    def __init__(self, adapted_service: SupportsServiceMethods[L], model_converter: ModelConverter[U, L]) -> None:
        self.adapted_service = adapted_service
        self.model_converter = model_converter

    def list(self, upper_model_class: type[U]) -> list[int]:
        lower_model_class = self.model_converter.get_lower_model_class(upper_model_class)
        return self.adapted_service.list(lower_model_class)

    def read(self, upper_model_class: type[U], pk: int) -> U:
        lower_model_class = self.model_converter.get_lower_model_class(upper_model_class)
        lower_model = self.adapted_service.read(lower_model_class, pk)
        upper_model = self.model_converter.convert_to_upper_model(lower_model)
        return upper_model

    def create(self, upper_model: U) -> U:
        lower_model = self.model_converter.convert_to_lower_model(upper_model)
        lower_model = self.adapted_service.create(lower_model)
        upper_model = self.model_converter.convert_to_upper_model(lower_model)
        return upper_model

    def update(self, upper_model: U, pk: int) -> U:
        lower_model = self.model_converter.convert_to_lower_model(upper_model)
        lower_model = self.adapted_service.update(lower_model, pk)
        upper_model = self.model_converter.convert_to_upper_model(lower_model)
        return upper_model

    def delete(self, upper_model_class: type[U], pk: int) -> None:
        lower_model_class = self.model_converter.get_lower_model_class(upper_model_class)
        return self.adapted_service.delete(lower_model_class, pk)
