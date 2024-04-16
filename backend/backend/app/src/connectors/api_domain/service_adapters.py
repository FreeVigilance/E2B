from app.src.connectors.api_domain import model_converters as mc
from app.src.connectors.base.service_adapters import BaseServiceAdapter
from app.src.layers.api.models import ApiModel
from app.src.layers.base.services import ServiceWithBusinessValidation
from app.src.layers.domain.models import DomainModel
from app.src.layers.domain.services import DomainService


class DomainServiceAdapter[U: ApiModel, L: DomainModel](
    BaseServiceAdapter[U, L], 
    ServiceWithBusinessValidation[U]
):
    def __init__(self, adapted_service: DomainService) -> None:
        self.adapted_service = adapted_service
        self.upper_to_lower_model_converter = mc.ApiToDomainModelConverter()
        self.lower_to_upper_model_converter = mc.DomainToApiModelConverter()

    def business_validate(self, upper_model: U) -> U:
        # Convert withoud basic validation as it will be done together with business validation
        lower_model, lower_dict = self.upper_to_lower_model_converter.convert_to_model_and_dict(upper_model)
        lower_model = self.adapted_service.business_validate(lower_model, initial_data=lower_dict)
        upper_model = self.lower_to_upper_model_converter.convert(lower_model)
        return upper_model