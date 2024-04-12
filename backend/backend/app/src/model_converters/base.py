import abc
import functools
import inspect


class ModelConverter[H, L](abc.ABC):
    @classmethod
    @abc.abstractmethod
    def get_lower_model_base_class(cls) -> type[L]:
        raise NotImplementedError()
    
    @classmethod
    @abc.abstractmethod
    def get_higher_model_base_class(cls) -> type[H]:
        raise NotImplementedError()
    
    @abc.abstractmethod
    def convert_to_lower_model(self, source_model: H, **kwargs) -> L:
        raise NotImplementedError()
    
    @abc.abstractmethod
    def convert_to_higher_model(self, source_model: L, **kwargs) -> H:
        raise NotImplementedError()

    def get_lower_model_class(self, source_model_class: type[H]) -> type[L]:
        return self._get_higher_to_lower_model_class_map()[source_model_class]
    
    def get_higher_model_class(self, source_model_class: type[L]) -> type[H]:
        return self._get_lower_to_higher_model_class_map()[source_model_class]
    
    @classmethod
    @functools.cache
    def _get_lower_to_higher_model_class_map(cls) -> dict[type[L], type[H]]:
        return {v: k for k, v in cls._get_higher_to_lower_model_class_map().items()}
    
    @classmethod
    @functools.cache
    def _get_higher_to_lower_model_class_map(cls) -> dict[type[H], type[L]]:
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
