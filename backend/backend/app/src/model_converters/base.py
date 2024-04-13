import abc
import functools
import inspect
import typing as t


class BaseModelConverter[S, T](abc.ABC):
    @classmethod
    @abc.abstractmethod
    def convert(cls, source_model: S, **kwargs) -> T:
        raise NotImplementedError()
    
    @classmethod
    def get_source_model_base_class(cls) -> type[S]:
        """Returns bound of S declared in the derived class."""
        return cls._get_type_param_bound(0)
    
    @classmethod
    def get_target_model_base_class(cls) -> type[T]:
        """Returns bound of T declared in the derived class."""
        return cls._get_type_param_bound(1)
    
    @classmethod
    def get_target_model_class(cls, source_model_class: type[S]) -> type[T]:
        return cls._get_source_to_target_model_class_map()[source_model_class]
    
    @classmethod
    @functools.cache
    def _get_source_to_target_model_class_map(cls) -> dict[type[T], type[S]]:
        source_class = cls.get_source_model_base_class()
        target_class = cls.get_target_model_base_class()
        source_module = inspect.getmodule(source_class)
        target_module = inspect.getmodule(target_class)
        class_map = dict()

        for source_attr_name, source_attr in vars(source_module).items():
            if inspect.isclass(source_attr) and issubclass(source_attr, source_class) and source_attr != source_class:
                target_attr = getattr(target_module, source_attr_name)
                if issubclass(target_attr, target_class):
                    class_map[source_attr] = target_attr

        return class_map
    
    @classmethod
    def _get_type_param_bound(cls, pos: t.Literal[0, 1]):
        bound = cls.__type_params__[pos].__bound__
        if bound is None:
            raise TypeError('Derived class must declare type var bound')
        return bound