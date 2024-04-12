import typing as t

from app.src.layers.api.models import ApiModel, Value
from app.src.layers.domain.models import DomainModel
from app.src.model_converters.base import ModelConverter
from app.src.shared.enums import NullFlavor


class ApiToDomainModelConverter(ModelConverter[ApiModel, DomainModel]):
    @classmethod
    def get_higher_model_base_class(cls):
        return ApiModel

    @classmethod
    def get_lower_model_base_class(cls):
        return DomainModel
    
    def convert_to_lower_model(self, source_model: ApiModel, **kwargs) -> DomainModel:
        target_model_class = self.get_lower_model_class(type(source_model))
        target_model_dict = self._convert_to_lower_model_dict(source_model)
        target_model = target_model_class.model_dict_construct(target_model_dict)
        return target_model.model_safe_validate(target_model_dict)

    def _convert_to_lower_model_dict(self, source_model: ApiModel, **kwargs) -> dict[str, t.Any]:
        target_model_dict = dict()

        iterator = self._get_pydantic_model_attr_conversion_iterator(
            source_model,
            target_model_dict,
            ApiModel,
            self._convert_to_lower_model_dict,
        )

        for key, value, is_default_conditions_met in iterator:
            if is_default_conditions_met:
                continue

            if isinstance(value, Value):
                null_flavor = getattr(value, 'null_flavor', None)
                pure_value = getattr(value, 'value', None)
                target_model_dict[key] = null_flavor if null_flavor else pure_value

        return target_model_dict
    
    def convert_to_higher_model(self, source_model: DomainModel, **kwargs) -> ApiModel:
        target_model_class = self.get_higher_model_class(type(source_model))
        target_model_dict = self._convert_to_higher_model_dict(source_model)
        target_model = target_model_class.model_dict_construct(target_model_dict)
        # If domain model is invalid, validation for api model is not needed
        if not source_model.is_valid:
            target_model.errors = source_model.errors
            return target_model
        else:
            return target_model.model_safe_validate(target_model_dict)

    def _convert_to_higher_model_dict(self, source_model: DomainModel, **kwargs) -> dict[str, t.Any]:
        target_model_dict = dict()

        iterator = self._get_pydantic_model_attr_conversion_iterator(
            source_model,
            target_model_dict,
            DomainModel,
            self._convert_to_higher_model_dict,
        )

        for key, value, is_default_conditions_met in iterator:
            if is_default_conditions_met:
                continue

            if key == 'id':
                result_value = value

            else:
                pure_value = None
                null_flavor = None
                if isinstance(value, NullFlavor):
                    null_flavor = value
                else:
                    pure_value = value
                result_value = {
                    'value': pure_value,
                    'null_flavor': null_flavor
                }

            target_model_dict[key] = result_value

        return target_model_dict
