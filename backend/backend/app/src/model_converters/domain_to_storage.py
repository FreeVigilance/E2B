import typing as t

from django import forms
from django.db import models

from app.src.layers.domain.models import DomainModel
from app.src.layers.storage.models import StorageModel, null_flavor_field_utils
from app.src.model_converters.base import ModelConverter
from app.src.shared.enums import NullFlavor
from extensions.django.fields import temp_relation_field_utils


class DomainToStorageModelConverter(ModelConverter[DomainModel, StorageModel]):
    INCLUDE_RELATED_DEFAULT = True

    @classmethod
    def get_higher_model_base_class(cls):
        return DomainModel

    @classmethod
    def get_lower_model_base_class(cls):
        return StorageModel

    def convert_to_lower_model(self, higher_model: DomainModel, **kwargs) -> StorageModel:
        target_model_dict = dict()
        target_model_class = self.get_lower_model_class(type(higher_model))

        iterator = self._get_pydantic_model_attr_conversion_iterator(
            higher_model,
            target_model_dict,
            DomainModel,
            self.convert_to_lower_model,
        )

        for key, value, is_default_conditions_met in iterator:

            # Saving fields with relations as temp fields
            target_model_field = target_model_class._meta.get_field(key)
            if target_model_field.is_relation:
                result_value = target_model_dict.pop(key)
                temp_field_name = temp_relation_field_utils.make_special_field_name(key)
                target_model_dict[temp_field_name] = result_value

            if is_default_conditions_met:
                continue

            if isinstance(value, NullFlavor):
                del target_model_dict[key]
                target_model_dict[null_flavor_field_utils.make_special_field_name(key)] = value

        return target_model_class(**target_model_dict)

    def convert_to_higher_model(
            self,
            lower_model: StorageModel,
            include_related: bool = INCLUDE_RELATED_DEFAULT,
            **kwargs
    ) -> DomainModel:
        return super().convert_to_higher_model(lower_model, include_related=include_related, **kwargs)

    def _convert_to_higher_model_dict(
            self,
            lower_model: StorageModel,
            include_related: bool = INCLUDE_RELATED_DEFAULT,
            **kwargs
    ) -> dict[str, t.Any]:
        lower_model_dict = forms.model_to_dict(lower_model)

        for field in lower_model._meta.get_fields():
            field_name = field.name

            if null_flavor_field_utils.is_special_field_name(field_name):
                null_flavor = lower_model_dict.pop(field_name)
                if null_flavor:
                    value_field_name = null_flavor_field_utils.get_base_field_name(field_name)
                    lower_model_dict[value_field_name] = NullFlavor(null_flavor)

            # Related models are retrieved only from 1-m and backward 1-1 relations
            # (1-m relations can only be created as backward relations in django).
            # m-m relations are ignored as there are none among the models.
            # Forward relations are ignored as the domain models are only aware of embedded models
            # (which are stored in storage models backward relations).

            # m-1 and forward 1-1 relations are retrieved as ids by forms.model_to_dict

            # Last condition checks if this field is a backward (reverse) relation
            if not include_related or not field.is_relation or not isinstance(field, models.ForeignObjectRel):
                continue

            if field.one_to_many:
                related_lower_models = getattr(lower_model, field_name).all()
                related_lower_models_dicts = []
                for related_lower_model in related_lower_models:
                    related_lower_models_dict = self._convert_to_higher_model_dict(related_lower_model, include_related)
                    related_lower_models_dicts.append(related_lower_models_dict)
                lower_model_dict[field_name] = related_lower_models_dicts

            elif field.one_to_one:
                related_lower_model = getattr(lower_model, field_name, None)
                if related_lower_model:
                    related_lower_model_dict = self._convert_to_higher_model_dict(related_lower_model, include_related)
                    lower_model_dict[field_name] = related_lower_model_dict

        return lower_model_dict
