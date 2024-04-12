import abc
import functools
import inspect


class ModelConverter[U, L](abc.ABC):
    @classmethod
    @abc.abstractmethod
    def get_lower_model_base_class(cls) -> type[L]:
        raise NotImplementedError()
    
    @classmethod
    @abc.abstractmethod
    def get_upper_model_base_class(cls) -> type[U]:
        raise NotImplementedError()
    
    @abc.abstractmethod
    def convert_to_lower_model(self, source_model: U, **kwargs) -> L:
        raise NotImplementedError()
    
    @abc.abstractmethod
    def convert_to_upper_model(self, source_model: L, **kwargs) -> U:
        raise NotImplementedError()

    def get_lower_model_class(self, source_model_class: type[U]) -> type[L]:
        return self._get_upper_to_lower_model_class_map()[source_model_class]
    
    def get_upper_model_class(self, source_model_class: type[L]) -> type[U]:
        return self._get_lower_to_upper_model_class_map()[source_model_class]
    
    @classmethod
    @functools.cache
    def _get_lower_to_upper_model_class_map(cls) -> dict[type[L], type[U]]:
        return {v: k for k, v in cls._get_upper_to_lower_model_class_map().items()}
    
    @classmethod
    @functools.cache
    def _get_upper_to_lower_model_class_map(cls) -> dict[type[U], type[L]]:
        upper_class = cls.get_upper_model_base_class()
        lower_class = cls.get_lower_model_base_class()
        upper_module = inspect.getmodule(upper_class)
        lower_module = inspect.getmodule(lower_class)
        class_map = dict()

        for upper_attr_name, upper_attr in vars(upper_module).items():
            if inspect.isclass(upper_attr) and issubclass(upper_attr, upper_class) and upper_attr != upper_class:
                lower_attr = getattr(lower_module, upper_attr_name)
                if issubclass(lower_attr, lower_class):
                    class_map[upper_attr] = lower_attr

        return class_map
