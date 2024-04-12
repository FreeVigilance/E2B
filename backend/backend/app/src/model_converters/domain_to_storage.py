import typing as t

from django import forms
from django.db import models
from django.core import exceptions

from app.src.layers.domain.models import DomainModel
from app.src.layers.storage.models import StorageModel, null_flavor_field_utils
from app.src.model_converters import pydantic as pmc
from app.src.model_converters.base import BaseModelConverter
from app.src.shared.enums import NullFlavor
from extensions.django.fields import temp_relation_field_utils


class DomainToStorageModelConverter[S: DomainModel, T: StorageModel](
    BaseModelConverter[S, T], 
    pmc.PydanticSourceModelConverter[S, T]
):
    @classmethod
    def convert(cls, source_model: S, **kwargs) -> T:
        target_model, _ = cls.convert_to_model_and_dict(source_model)
        return target_model
    
    @classmethod
    def construct_target_model(cls, clazz: type[T], dict_: dict[str, t.Any]) -> T:
        return clazz(**dict_)
    
    @classmethod
    def _pre_convert_field(cls, field_data: pmc.FieldData, model_data: pmc.TargetModelData) -> bool:
        # Skip field parsing if it doesn't exist in model
        try:
            model_data.clazz._meta.get_field(field_data.name)
            return False
        except exceptions.FieldDoesNotExist:
            field_data.is_skip_post_convert = True
            return True
        
    @classmethod
    def _post_convert_field(cls, field_data: pmc.FieldData, model_data: pmc.TargetModelData) -> bool:
        value = field_data.initial_value
        field_name = field_data.name
        # Field existence was checked in pre_convert
        target_model_field = model_data.clazz._meta.get_field(field_name)

        # Resaving fields with relations as temp fields
        # This fields must have already been converted, but only if their value is not none
        if field_data.is_converted and target_model_field.is_relation:
            temp_field_name = temp_relation_field_utils.make_special_field_name(field_name)
            model_data.dict_with_models[temp_field_name] = model_data.dict_with_models.pop(field_name)
            model_data.dict_with_dicts[temp_field_name] = model_data.dict_with_dicts.pop(field_name)

        if field_data.is_converted:
            return True

        if isinstance(value, NullFlavor):
            null_flavor_field_name = null_flavor_field_utils.make_special_field_name(field_name)
            model_data.update(null_flavor_field_name, value)
            return True
        
        return False


class StorageToDomainModelConverter[S: StorageModel, T: DomainModel](
    BaseModelConverter[S, T]
):  
    INCLUDE_RELATED_DEFAULT = True

    @classmethod
    def convert(cls, source_model: S, include_related: bool = INCLUDE_RELATED_DEFAULT, **kwargs) -> T:
        target_model, target_dict = cls.convert_to_model_and_dict(source_model, include_related)
        return target_model.model_safe_validate(target_dict)

    @classmethod
    def convert_to_model_and_dict(
        cls,
        source_model: S,
        include_related: bool = INCLUDE_RELATED_DEFAULT
    ) -> tuple[T, dict[str, t.Any]]:
        """Same as in PydanticModelConverter but for conversion from django model."""
        
        target_dict_with_models = forms.model_to_dict(source_model)
        target_dict_with_dicts = target_dict_with_models.copy()

        for field in source_model._meta.get_fields():
            field_name = field.name

            if null_flavor_field_utils.is_special_field_name(field_name):
                null_flavor = target_dict_with_models.pop(field_name)
                target_dict_with_dicts.pop(field_name)
                if null_flavor:
                    value_field_name = null_flavor_field_utils.get_base_field_name(field_name)
                    result_value = NullFlavor(null_flavor)
                    target_dict_with_models[value_field_name] = result_value
                    target_dict_with_dicts[value_field_name] = result_value

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
                related_source_models = getattr(source_model, field_name).all()
                target_list_with_models = []
                target_list_with_dicts = []

                for related_source_model in related_source_models:
                    model, dict_ = cls.convert_to_model_and_dict(related_source_model, include_related)
                    target_list_with_models.append(model)
                    target_list_with_dicts.append(dict_)

                target_dict_with_models[field_name] = target_list_with_models
                target_dict_with_dicts[field_name] = target_list_with_dicts

            elif field.one_to_one:
                related_source_model = getattr(source_model, field_name, None)
                if related_source_model:
                    model, dict_ = cls.convert_to_model_and_dict(related_source_model, include_related)
                    target_dict_with_models[field_name] = model
                    target_dict_with_dicts[field_name] = dict_

        target_model_class = cls.get_target_model_class(type(source_model))
        target_model = pmc.PydanticSourceModelConverter.construct_pydantic_model(target_model_class, target_dict_with_models)
        return target_model, target_dict_with_dicts