import typing as t

from django import forms

from app.src.layers.domain import models as domain_models
from app.src.layers.domain.models import DomainModel
from app.src.layers.storage import models as storage_models
from app.src.layers.storage.models import StorageModel, NULL_FLAVOR_FIELD_NAME_PREFIX
from app.src.model_converters.base import ModelConverter
from app.src.shared.enums import NullFlavor
from extensions.django.models import TEMP_RELATION_FIELD_NAME_PREFIX


DOMAIN_TO_STORAGE_MODEL_CLASS_MAP = {
    domain_models.ICSR:
        storage_models.ICSR,
    domain_models.C_1_identification_case_safety_report:
        storage_models.C_1_identification_case_safety_report,
    domain_models.C_1_6_1_r_documents_held_sender:
        storage_models.C_1_6_1_r_documents_held_sender,
    domain_models.C_1_9_1_r_source_case_id:
        storage_models.C_1_9_1_r_source_case_id,
    domain_models.C_1_10_r_identification_number_report_linked:
        storage_models.C_1_10_r_identification_number_report_linked
}


class DomainToStorageModelConverter(ModelConverter[DomainModel, StorageModel]):
    INCLUDE_RELATED_DEFAULT = True

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
                target_model_dict[TEMP_RELATION_FIELD_NAME_PREFIX + key] = result_value

            if is_default_conditions_met:
                continue

            if isinstance(value, NullFlavor):
                del target_model_dict[key]
                target_model_dict[NULL_FLAVOR_FIELD_NAME_PREFIX + key] = value

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

            if field_name.startswith(NULL_FLAVOR_FIELD_NAME_PREFIX):
                null_flavor = lower_model_dict.pop(field_name)
                if null_flavor:
                    value_field_name = field_name.replace(NULL_FLAVOR_FIELD_NAME_PREFIX, '')
                    lower_model_dict[value_field_name] = null_flavor

            if field_name in lower_model_dict or not include_related:
                continue

            # Following code is executed only if include_related is True

            if field.one_to_many or field.many_to_many:
                related_lower_models = getattr(lower_model, field_name).all()
                related_lower_models_dicts = []
                for related_lower_model in related_lower_models:
                    related_lower_models_dict = self._convert_to_higher_model_dict(related_lower_model, include_related)
                    related_lower_models_dicts.append(related_lower_models_dict)
                lower_model_dict[field_name] = related_lower_models_dicts

            elif field.one_to_one:
                related_lower_model = getattr(lower_model, field_name)
                if related_lower_model:
                    related_lower_model_dict = self._convert_to_higher_model_dict(related_lower_model, include_related)
                    lower_model_dict[field_name] = related_lower_model_dict

        return lower_model_dict
