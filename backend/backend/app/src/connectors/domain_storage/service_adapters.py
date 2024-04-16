from app.src.connectors.base.service_adapters import BaseServiceAdapter
from app.src.connectors.domain_storage import model_converters as mc
from app.src.layers.base.services import Service
from app.src.layers.domain.models import DomainModel
from app.src.layers.storage.models import StorageModel


class StorageServiceAdapter[U: DomainModel, L: StorageModel](BaseServiceAdapter[U, L]):
    def __init__(self, adapted_service: Service[L]) -> None:
        super().__init__(
            adapted_service,
            upper_to_lower_model_converter=mc.DomainToStorageModelConverter(),
            lower_to_upper_model_converter=mc.StorageToDomainModelConverter()
        )
    
    