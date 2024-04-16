import typing as t

from app.src.connectors.base.model_converters import pydantic as pmc
from app.src.enums import NullFlavor
from app.src.layers.api.models import ApiModel, Value
from app.src.layers.domain.models import DomainModel


class ApiToDomainModelConverter[S: ApiModel, T: DomainModel](pmc.PydanticSourceModelConverter[S, T]):    
    @classmethod
    def convert(cls, source_model: S) -> T:
        target_model, target_dict = cls.convert_to_model_and_dict(source_model)
        return target_model.model_safe_validate(target_dict)
    
    @classmethod
    def construct_target_model(cls, clazz: type[T], dict_: dict[str, t.Any]) -> T:
        return cls.construct_pydantic_model(clazz, dict_)
    
    @classmethod
    def _post_convert_field(
        cls, 
        field_data: pmc.FieldData, 
        model_data: pmc.ModelData, 
        shared_data: pmc.SharedData
    ) -> bool:
        
        if field_data.is_converted:
            return True
        
        value = field_data.initial_value

        if isinstance(value, Value):
            null_flavor = getattr(value, 'null_flavor', None)
            pure_value = getattr(value, 'value', None)
            result_value = null_flavor if null_flavor else pure_value

            model_data.update(field_data.name, result_value)
            return True
        
        return False
    

class DomainToApiModelConverter[S: DomainModel, T: ApiModel](pmc.PydanticSourceModelConverter[S, T]):
    @classmethod
    def convert(cls, source_model: S) -> T:
        target_model, target_dict = cls.convert_to_model_and_dict(source_model)
        # If domain model is invalid, validation for api model is not needed
        if not source_model.is_valid:
            target_model.errors = source_model.errors
            return target_model
        else:
            return target_model.model_safe_validate(target_dict)
        
    @classmethod
    def construct_target_model(cls, clazz: type[T], dict_: dict[str, t.Any]) -> T:
        return cls.construct_pydantic_model(clazz, dict_)

    @classmethod
    def _post_convert_field(
        cls, 
        field_data: pmc.FieldData, 
        model_data: pmc.ModelData, 
        shared_data: pmc.SharedData
    ) -> bool:
        
        if field_data.is_converted:
            return True
        
        value = field_data.initial_value
        field_name = field_data.name

        if field_name in ['id', 'uuid', 'g_k_9_i_1_reaction_assessed']:
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

        model_data.update(field_name, result_value)
        return True