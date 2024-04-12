from app.src.layers.api.models import ApiModel, Value
from app.src.layers.domain.models import DomainModel
from app.src.model_converters import pydantic as pmc
from app.src.model_converters.base import ModelConverter
from app.src.shared.enums import NullFlavor


class ApiToDomainModelConverter(ModelConverter[ApiModel, DomainModel]):
    @classmethod
    def get_lower_model_base_class(cls):
        return DomainModel
    
    @classmethod
    def get_higher_model_base_class(cls):
        return ApiModel
    
    def convert_to_lower_model(self, source_model: ApiModel, **kwargs) -> DomainModel:
        converter = pmc.PydanticModelConverter(
            source_model_base_class=ApiModel,
            get_target_model_class=self.get_lower_model_class,  
            post_convert_field=self.post_convert_to_lower_field          
        )
        target_model, target_dict = converter.convert_to_model_and_dict(source_model)
        return target_model.model_safe_validate(target_dict)
    
    @staticmethod
    def post_convert_to_lower_field(
        field_data: pmc.FieldData,
        model_data: pmc.TargetModelData
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
    
    def convert_to_higher_model(self, source_model: DomainModel, **kwargs) -> ApiModel:
        converter = pmc.PydanticModelConverter(
            source_model_base_class=DomainModel,
            get_target_model_class=self.get_higher_model_class,  
            post_convert_field=self.post_convert_to_higher_field          
        )
        target_model, target_dict = converter.convert_to_model_and_dict(source_model)

        # If domain model is invalid, validation for api model is not needed
        if not source_model.is_valid:
            target_model.errors = source_model.errors
            return target_model
        else:
            return target_model.model_safe_validate(target_dict)

    @staticmethod
    def post_convert_to_higher_field(
        field_data: pmc.FieldData,
        model_data: pmc.TargetModelData
    ) -> bool:
        if field_data.is_converted:
            return True
        
        value = field_data.initial_value
        field_name = field_data.name

        if field_name == 'id':
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
