import abc
import functools
import inspect
import typing as t


# TODO: consider creating pydantic instances instead of dicts, check speed
class ModelConverter[H, L](abc.ABC):
    @classmethod
    @abc.abstractmethod
    def get_higher_model_base_class(cls) -> type[H]:
        pass

    @classmethod
    @abc.abstractmethod
    def get_lower_model_base_class(cls) -> type[L]:
        pass

    @classmethod
    @functools.cache  # TODO: check performance with logging
    def get_higher_to_lower_model_class_map(cls) -> dict[type[H], type[L]]:
        higher_class = cls.get_higher_model_base_class()
        lower_class = cls.get_lower_model_base_class()
        higher_module = inspect.getmodule(higher_class)
        lower_module = inspect.getmodule(lower_class)
        class_map = dict()

        for higher_attr_name, higher_attr in vars(higher_module).items():
            if inspect.isclass(higher_attr) and issubclass(higher_attr, higher_class) and higher_attr != higher_class:
                lower_attr = getattr(lower_module, higher_attr_name)
                if issubclass(lower_attr, lower_class):
                    class_map[higher_attr] = lower_attr

        return class_map

    @classmethod
    @functools.cache
    def get_lower_to_higher_model_class_map(cls) -> dict[type[L], type[H]]:
        return {v: k for k, v in cls.get_higher_to_lower_model_class_map().items()}

    def get_lower_model_class(self, source_model_class: type[H]) -> type[L]:
        return self.get_higher_to_lower_model_class_map()[source_model_class]

    def get_higher_model_class(self, source_model_class: type[L]) -> type[H]:
        return self.get_lower_to_higher_model_class_map()[source_model_class]

    @abc.abstractmethod
    def convert_to_lower_model(self, source_model: H, **kwargs) -> L:
        raise NotImplementedError()

    @abc.abstractmethod
    def convert_to_higher_model(self, source_model: L, **kwargs) -> H:
        raise NotImplementedError()
    
    # TODO: check if there is a way to make the same annotation for these funcs without overload

    @staticmethod
    @t.overload
    def _get_pydantic_model_attr_conversion_iterator(
            source_model: L,
            target_model_dict: dict[str, t.Any],
            check_model_class: type[L],
            convert_model: t.Callable[[L], t.Any]  # TODO: annotation for kwargs
    ) -> t.Iterator[tuple[str, t.Any, bool]]: ...

    @staticmethod
    @t.overload
    def _get_pydantic_model_attr_conversion_iterator(
            source_model: H,
            target_model_dict: dict[str, t.Any],
            check_model_class: type[H],
            convert_model: t.Callable[[H], t.Any]  # TODO: annotation for kwargs
    ) -> t.Iterator[tuple[str, t.Any, bool]]: ...

    @staticmethod
    def _get_pydantic_model_attr_conversion_iterator(
            source_model: H | L,
            target_model_dict: dict[str, t.Any],
            check_model_class: type[H | L],
            convert_model: t.Callable[[H | L], t.Any]  # TODO: annotation for kwargs
    ) -> t.Iterator[tuple[str, t.Any, bool]]:

        for key in source_model.model_fields:
            value = getattr(source_model, key)
            is_conditions_met = False
            target_model_dict[key] = value

            if isinstance(value, check_model_class):
                is_conditions_met = True
                target_model_dict[key] = convert_model(value)

            elif isinstance(value, list):
                is_conditions_met = True
                result_value = []
                for item in value:
                    if isinstance(item, check_model_class):
                        item_value = convert_model(item)
                    else:
                        item_value = value
                    result_value.append(item_value)
                target_model_dict[key] = result_value

            yield key, value, is_conditions_met
