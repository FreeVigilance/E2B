from app.src.model_converters.base import ModelConverter
from app.src.shared.services import SupportsServiceMethods


class ServiceAdapter[H, L](SupportsServiceMethods[H]):
    def __init__(self, adapted_service: SupportsServiceMethods[L], model_converter: ModelConverter[H, L]) -> None:
        self.adapted_service = adapted_service
        self.model_converter = model_converter

    def list(self, higher_model_class: type[H]) -> list[int]:
        lower_model_class = self.model_converter.get_lower_model_class(higher_model_class)
        return self.adapted_service.list(lower_model_class)

    def read(self, higher_model_class: type[H], pk: int) -> H:
        lower_model_class = self.model_converter.get_lower_model_class(higher_model_class)
        lower_model = self.adapted_service.read(lower_model_class, pk)
        higher_model = self.model_converter.convert_to_higher_model(lower_model)
        return higher_model

    def create(self, higher_model: H) -> H:
        lower_model = self.model_converter.convert_to_lower_model(higher_model)
        lower_model = self.adapted_service.create(lower_model)
        higher_model = self.model_converter.convert_to_higher_model(lower_model)
        return higher_model

    def update(self, higher_model: H, pk: int) -> H:
        lower_model = self.model_converter.convert_to_lower_model(higher_model)
        lower_model = self.adapted_service.update(lower_model, pk)
        higher_model = self.model_converter.convert_to_higher_model(lower_model)
        return higher_model

    def delete(self, higher_model_class: type[H], pk: int) -> None:
        lower_model_class = self.model_converter.get_lower_model_class(higher_model_class)
        return self.adapted_service.delete(lower_model_class, pk)
