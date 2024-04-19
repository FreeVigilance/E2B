import typing as t

from app.src.layers.base.services import ServiceProtocol, BusinessServiceProtocol, CIOMSServiceProtocol
from app.src.layers.domain.models import DomainModel, ICSR
from app.src.layers.domain.models import CIOMS


class DomainService(BusinessServiceProtocol[DomainModel]):
    def __init__(self, storage_service: ServiceProtocol[DomainModel]) -> None:
        self.storage_service = storage_service

    def list(self, model_class: type[DomainModel]) -> list[dict[str, t.Any]]:
        return self.storage_service.list(model_class)

    def read(self, model_class: type[DomainModel], pk: int) -> DomainModel:
        return self.storage_service.read(model_class, pk)

    def create(self, model: DomainModel) -> DomainModel:
        if not model.is_valid:
            return model
        return self.storage_service.create(model)

    def update(self, model: DomainModel, pk: int) -> DomainModel:
        if not model.is_valid:
            return model
        return self.storage_service.update(model, pk)

    def delete(self, model_class: type[DomainModel], pk: int) -> None:
        return self.storage_service.delete(model_class, pk)

    def business_validate(self, model: DomainModel, initial_data: dict[str, t.Any] | None = None) -> DomainModel:
        return model.model_business_validate(initial_data)


class CIOMSService(CIOMSServiceProtocol):
    def __init__(self, storage_service: ServiceProtocol[DomainModel]) -> None:
        self.storage_service = storage_service

    def convert_icsr_to_cioms(self, pk: int) -> CIOMS:
        icsr = self.storage_service.read(ICSR, pk)
        return CIOMS.from_icsr(icsr)
