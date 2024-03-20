from app.src.layers.domain.cioms_models import CIOMS, convert_to_cioms
from app.src.layers.domain.models import ICSR, DomainModel
from app.src.shared.protocols import SupportsServiceMethods


class DomainService:
	def __init__(self, storage_service: SupportsServiceMethods[DomainModel]) -> None:
		self.repository = storage_service

	def list(self, model_class: type[DomainModel]) -> list[int]:
		return self.repository.list(model_class)

	def read(self, model_class: type[DomainModel], pk: int) -> DomainModel:
		return self.repository.read(model_class, pk)

	def create(self, model: DomainModel) -> DomainModel:
		return self.repository.create(model)

	def update(self, model: DomainModel, pk: int) -> DomainModel:
		return self.repository.update(model, pk)

	def delete(self, model_class: type[DomainModel], pk: int) -> None:
		return self.repository.delete(model_class, pk)


class CIOMSService:
	def __init__(self, storage_service: SupportsServiceMethods[DomainModel]) -> None:
		self.repository = storage_service

	def read(self, pk: int) -> CIOMS:
		icsr = self.repository.read(ICSR, pk)
		cioms = convert_to_cioms(icsr)
		return cioms


