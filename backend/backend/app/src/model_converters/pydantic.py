import dataclasses as dc
import typing as t

import pydantic as pd


@dc.dataclass
class FieldData:
    name: str
    initial_value: t.Any
    # If true, the converted value is present in ConversionResult of current model
    is_converted: bool
    is_skip_post_convert: bool = False


@dc.dataclass
class TargetModelData:
    clazz: type[t.Any]
    dict_with_models: dict[str, t.Any] = dc.field(default_factory={})
    dict_with_dicts: dict[str, t.Any] = dc.field(default_factory={})

    def update(self, field_name: str, value: t.Any) -> None:
        self.dict_with_models[field_name] = value
        self.dict_with_dicts[field_name] = value


@dc.dataclass
class PydanticModelConverter[S: pd.BaseModel, T]:
    source_model_base_class: type[S]
    get_target_model_class: t.Callable[[type[S]], type[T]]

    pre_convert_field: t.Callable[[FieldData, TargetModelData], bool] | None = None
    post_convert_field: t.Callable[[FieldData, TargetModelData], bool] | None = None

    @staticmethod
    def construct_pydantic_model(clazz: type[T], dict_: dict[str, t.Any]) -> T:
        return clazz.model_construct(**dict_)

    # Should be set explicitly if the target model class is not derived from pydantic.BaseModel
    construct_target_model: t.Callable[[type[T], dict[str, t.Any]], T] = construct_pydantic_model

    def convert_to_model_and_dict(self, source_model: S) -> tuple[T, dict[str, t.Any]]:
        """
        Converts source pydantic model to any target model.
        Both target model and target dict, which the target model is built from, are returned
        as it is needed for better validation performance if the target model is pydantic.
        """
        target_model_class = self.get_target_model_class(type(source_model))
        target_dict_with_models = {}
        target_dict_with_dicts = {}

        target_model_data = TargetModelData(
            clazz=target_model_class,
            dict_with_models=target_dict_with_models,
            dict_with_dicts=target_dict_with_dicts
        )

        for field_name in source_model.model_fields:
            value = getattr(source_model, field_name)
            field_data = FieldData(name=field_name, initial_value=value, is_converted=False)

            self._execute_field_converter(self.pre_convert_field, field_data, target_model_data)

            if not field_data.is_converted:
                if isinstance(value, self.source_model_base_class):
                    model, dict_ = self.convert_to_model_and_dict(value)
                    target_dict_with_models[field_name] = model
                    target_dict_with_dicts[field_name] = dict_
                    field_data.is_converted = True

                elif isinstance(value, list):
                    target_list_with_models = []
                    target_list_with_dicts = []

                    for item in value:
                        if isinstance(item, self.source_model_base_class):
                            model, dict_ = self.convert_to_model_and_dict(item)
                            target_list_with_models.append(model)
                            target_list_with_dicts.append(dict_)
                        else:
                            target_list_with_models.append(item)
                            target_list_with_dicts.append(item)

                    target_dict_with_models[field_name] = target_list_with_models
                    target_dict_with_dicts[field_name] = target_list_with_dicts
                    field_data.is_converted = True

            # Post convert isn't called only if special flag is set
            if not field_data.is_skip_post_convert:
                self._execute_field_converter(self.post_convert_field, field_data, target_model_data)

            if not field_data.is_converted:
                target_model_data.update(field_name, value)

        target_model = self.construct_target_model(target_model_class, target_dict_with_models)
        return target_model, target_dict_with_dicts
    
    @staticmethod
    def _execute_field_converter(
        convert_field: t.Callable[[FieldData, TargetModelData], bool] | None,
        field_data: FieldData,
        model_data: TargetModelData
    ) -> None:
        if convert_field:
            field_data.is_converted = convert_field(field_data, model_data)
