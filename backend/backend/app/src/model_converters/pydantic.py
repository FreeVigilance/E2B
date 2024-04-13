import abc
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
class ModelData[S: pd.BaseModel, T]:
    source_model: S
    target_class: type[T]
    target_dict_with_models: dict[str, t.Any] = dc.field(default_factory=dict)
    target_dict_with_dicts: dict[str, t.Any] = dc.field(default_factory=dict)
    target_model: T | None = None

    def update(self, field_name: str, value: t.Any) -> None:
        self.target_dict_with_models[field_name] = value
        self.target_dict_with_dicts[field_name] = value


@dc.dataclass
class SharedData:
    context: dict[str, t.Any] = dc.field(default_factory=dict)


class PydanticSourceModelConverter[S: pd.BaseModel, T](abc.ABC):
    @classmethod
    @abc.abstractmethod
    def get_source_model_base_class(cls) -> type[S]:
        raise NotImplementedError()
    
    @classmethod
    @abc.abstractmethod
    def get_target_model_class(cls, source_model_class: type[S]) -> type[T]:
        raise NotImplementedError()
    
    @classmethod
    @abc.abstractmethod
    def construct_target_model(cls, clazz: type[T], dict_: dict[str, t.Any]) -> T:
        raise NotImplementedError()
    
    @staticmethod
    def construct_pydantic_model(clazz: type[T], dict_: dict[str, t.Any]) -> T:
        return clazz.model_construct(**dict_)

    @classmethod
    def convert_to_model_and_dict(
        cls, 
        source_model: S, 
        shared_data: SharedData | None = None
    ) -> tuple[T, dict[str, t.Any]]:
        """
        Converts source pydantic model to any target model.
        Both target model and target dict, which the target model is built from, are returned
        as it is needed for better validation performance if the target model is pydantic.
        """
        if shared_data is None:
            shared_data = SharedData()

        target_model_class = cls.get_target_model_class(type(source_model))
        target_dict_with_models = {}
        target_dict_with_dicts = {}

        model_data = ModelData(
            source_model=source_model,
            target_class=target_model_class,
            target_dict_with_models=target_dict_with_models,
            target_dict_with_dicts=target_dict_with_dicts
        )

        cls._pre_convert_model(model_data, shared_data)

        for field_name in source_model.model_fields:
            value = getattr(source_model, field_name)
            field_data = FieldData(name=field_name, initial_value=value, is_converted=False)

            cls._execute_field_converter(cls._pre_convert_field, field_data, model_data, shared_data)

            if not field_data.is_converted:
                if isinstance(value, cls.get_source_model_base_class()):
                    model, dict_ = cls.convert_to_model_and_dict(value, shared_data)
                    target_dict_with_models[field_name] = model
                    target_dict_with_dicts[field_name] = dict_
                    field_data.is_converted = True

                elif isinstance(value, list):
                    target_list_with_models = []
                    target_list_with_dicts = []

                    for item in value:
                        if isinstance(item, cls.get_source_model_base_class()):
                            model, dict_ = cls.convert_to_model_and_dict(item, shared_data)
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
                cls._execute_field_converter(cls._post_convert_field, field_data, model_data, shared_data)

            if not field_data.is_converted:
                model_data.update(field_name, value)

        target_model = cls.construct_target_model(target_model_class, target_dict_with_models)

        model_data.target_model = target_model
        cls._post_convert_model(model_data, shared_data)

        return target_model, target_dict_with_dicts
    
    @staticmethod
    def _execute_field_converter(
        convert_field: t.Callable[[FieldData, ModelData], bool] | None,
        field_data: FieldData,
        model_data: ModelData,
        shared_data: SharedData
    ) -> None:
        if convert_field:
            field_data.is_converted = convert_field(field_data, model_data, shared_data)

    # Following methods are used for overriding in derived classes

    @classmethod
    def _pre_convert_model(cls, model_data: ModelData, shared_data: SharedData) -> None:
        pass

    @classmethod
    def _pre_convert_field(cls, field_data: FieldData, model_data: ModelData, shared_data: SharedData) -> bool:
        return False
    
    @classmethod
    def _post_convert_field(cls, field_data: FieldData, model_data: ModelData, shared_data: SharedData) -> bool:
        return False
    
    @classmethod
    def _post_convert_model(cls, model_data: ModelData, shared_data: SharedData) -> None:
        pass
