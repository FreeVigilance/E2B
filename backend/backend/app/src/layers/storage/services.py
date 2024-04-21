import enum
import typing as t

from django.core import exceptions as dje
from django.db import models as djm
from django.db import transaction

from app.src.layers.base.services import ServiceProtocol
from app.src.layers.storage.models import StorageModel
from extensions.django.fields import temp_relation_field_utils


class StorageService(ServiceProtocol[StorageModel]):
    class SaveOperation(enum.Enum):
        INSERT = enum.auto()
        UPDATE = enum.auto()

    def list(self, model_class: type[StorageModel]) -> list[dict[str, t.Any]]:
        return model_class.list()

    def read(self, model_class: type[StorageModel], pk: int) -> StorageModel:
        return model_class.objects.get(pk=pk)

    @transaction.atomic
    def create(self, new_model: StorageModel) -> StorageModel:
        if new_model.id is not None:
            raise ValueError('Id can not be specified when creating a new entity')
        new_model.pre_create()
        self._save_with_related(new_model, self.SaveOperation.INSERT)
        return new_model

    @transaction.atomic
    def update(self, new_model: StorageModel, pk: int) -> StorageModel:
        new_model.id = pk
        try:
            old_model = self.read(type(new_model), pk)
        except dje.ObjectDoesNotExist:
            raise ValueError(f'Cannot update not existing entity: {new_model.__class__.__name__}(id={pk})')

        # Delete old related models if they are missing in new model
        for key, new_value in vars(new_model).items():
            if not temp_relation_field_utils.is_special_field_name(key):
                continue

            field_name = temp_relation_field_utils.get_base_field_name(key)
            field = new_model._meta.get_field(field_name)
            old_value = getattr(old_model, field_name, None)
            if not old_value:
                continue

            if field.many_to_one or field.one_to_one:
                if not new_value or new_value.id != old_value.id:
                    self.delete_model(old_value)
            else:
                old_id_to_model_dict = {v.id: v for v in old_value.all()}
                old_ids = old_id_to_model_dict.keys()
                new_ids = set(v.id for v in new_value) if new_value else set()
                for old_id in old_ids - new_ids:
                    self.delete_model(old_id_to_model_dict[old_id])

        # Check that model doesn't change fk as it is not allowed
        fk_names = [
            f.name for f in new_model._meta.get_fields() 
            # Get only real db fk without backward rel
            if f.many_to_one or f.one_to_one and not isinstance(f, djm.ForeignObjectRel)
        ]
        for fk_name in fk_names:
            new_fk_val = getattr(new_model, fk_name, None)
            old_fk_val = getattr(old_model, fk_name, None)
            if old_fk_val and new_fk_val != old_fk_val:
                print(new_model)
                print(fk_name)
                raise ValueError('Foreign key cannot be chenged')

        self._save_with_related(new_model, self.SaveOperation.UPDATE)
        return new_model

    def _save_with_related(self, new_model: StorageModel, save_operation: SaveOperation) -> None:
        if not isinstance(save_operation, self.SaveOperation):
            raise ValueError('Expected save_operation to be an instance of SaveOperation')

        new_model.save(
            # To prevent django from inserting an entity with the id that does not exist
            force_insert=save_operation == self.SaveOperation.INSERT,
            force_update=save_operation == self.SaveOperation.UPDATE
        )

        # Create or update related models
        for key, value in vars(new_model).items():
            if not temp_relation_field_utils.is_special_field_name(key):
                continue

            field_name = temp_relation_field_utils.get_base_field_name(key)
            related_field_name = new_model._meta.get_field(field_name).remote_field.name
            related_models = value if isinstance(value, list) else [value]

            for related_model in related_models:
                if related_model is None:
                    continue
                setattr(related_model, related_field_name, new_model)
                if related_model.id is None:
                    self.create(related_model)
                else:
                    self.update(related_model, related_model.id)

    def delete(self, model_class: type[StorageModel], pk: int) -> None:
        model_class.objects.get(pk=pk).delete()

    def delete_model(self, old_model: StorageModel) -> None:
        self.delete(type(old_model), old_model.pk)
