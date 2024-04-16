from app.src.connectors.api_domain import model_converters as mc
from app.src.connectors.base.service_adapters import BaseServiceAdapter
from app.src.layers.api.models import ApiModel
from app.src.layers.base.services import ServiceWithBusinessValidation
from app.src.layers.domain.models import DomainModel


class DomainServiceAdapter[U: ApiModel, L: DomainModel](
    BaseServiceAdapter[U, L], 
    ServiceWithBusinessValidation[U]
):
    def __init__(self, adapted_service: ServiceWithBusinessValidation[L]) -> None:
        super().__init__(
            adapted_service,
            upper_to_lower_model_converter=mc.ApiToDomainModelConverter(),
            lower_to_upper_model_converter=mc.DomainToApiModelConverter()
        )
        self.adapted_service = adapted_service

    def business_validate(self, upper_model: U) -> U:
        lower_model = self.upper_to_lower_model_converter.convert(upper_model)
        lower_model = self.adapted_service.business_validate(lower_model)
        upper_model = self.lower_to_upper_model_converter.convert(lower_model)
        return upper_model