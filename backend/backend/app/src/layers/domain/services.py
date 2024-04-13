from app.src.layers.domain.models import DomainModel
from app.src.shared.services import SupportsServiceMethods


class DomainService(SupportsServiceMethods[DomainModel]):
	def __init__(self, storage_service: SupportsServiceMethods[DomainModel]) -> None:
		self.storage_service = storage_service

	def list(self, model_class: type[DomainModel]) -> list[int]:
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
