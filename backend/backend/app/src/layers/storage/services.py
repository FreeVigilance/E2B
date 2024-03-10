import typing as t

from django.db import transaction

from app.src.layers.storage.models import StorageModel
from extensions.django.models import TEMP_RELATION_FIELD_NAME_PREFIX


class StorageService:
    def read(self, model_class: type[StorageModel], pk: int) -> StorageModel:
        return model_class.objects.get(pk=pk)

    @transaction.atomic
    def save_with_related(self, source_model: StorageModel) -> None:
        source_model.save()
        for key, value in vars(source_model).items():
            if key.startswith(TEMP_RELATION_FIELD_NAME_PREFIX):
                field_name = key.replace(TEMP_RELATION_FIELD_NAME_PREFIX, '', 1)
                related_field_name = source_model._meta.get_field(field_name).remote_field.name
                if not isinstance(value, list):
                    value = [value]
                for related_model in value:
                    setattr(related_model, related_field_name, source_model)
                    self.save_with_related(related_model)

    def create(self, storage_model: StorageModel) -> int:
        self.save_with_related(storage_model)
        return storage_model.pk

    def update(self, storage_model: StorageModel) -> None:
        self.save_with_related(storage_model)

    def delete(self, storage_model_class: type[StorageModel], pk: int) -> None:
        storage_model_class.objects.get(pk=pk).delete()