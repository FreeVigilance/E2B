from app.src.layers.domain.models import DomainModel
from app.src.shared.protocols import SupportsServiceMethods


class DomainService:
    def __init__(self, storage_service: SupportsServiceMethods[DomainModel]) -> None:
        self.repository = storage_service

    def read(self, domain_model_class: type[DomainModel], pk: int) -> DomainModel:
        return self.repository.read(domain_model_class, pk)

    def create(self, domain_model: DomainModel) -> int:
        return self.repository.create(domain_model)

    def update(self, domain_model: DomainModel) -> None:
        self.repository.update(domain_model)

    def delete(self, domain_model_class: type[DomainModel], pk: int) -> None:
        self.repository.delete(domain_model_class, pk)