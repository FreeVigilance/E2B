import abc
import typing as t


# TODO: consider creating pydantic instances instead of dicts, check speed
class ModelConverter[H, L](abc.ABC):
    def __init__(self, higher_to_lower_model_class_map: dict[type[H], type[L]]) -> None:
        self.higher_to_lower_model_class_map = higher_to_lower_model_class_map
        self.lower_to_higher_model_class_map = {v: k for k, v in higher_to_lower_model_class_map.items()}

    def get_lower_model_class(self, higher_model_class: type[H]) -> type[L]:
        return self.higher_to_lower_model_class_map[higher_model_class]

    def get_higher_model_class(self, lower_model_class: type[L]) -> type[H]:
        return self.lower_to_higher_model_class_map[lower_model_class]

    def convert_to_lower_model(self, higher_model: H, **kwargs) -> L:
        return self._convert_from_target_model_dict(
            higher_model,
            self._convert_to_lower_model_dict(higher_model),
            self.get_lower_model_class
        )

    def convert_to_higher_model(self, lower_model: L, **kwargs) -> H:
        return self._convert_from_target_model_dict(
            lower_model,
            self._convert_to_higher_model_dict(lower_model, **kwargs),
            self.get_higher_model_class
        )

    @staticmethod
    def _convert_from_target_model_dict(
            source_model: [H | L],
            target_model_dict: dict[str, t.Any],
            target_model_class_getter: t.Callable[[type[H] | type[L]], type[H] | type[L]]
    ) -> H | L:
        target_model_class = target_model_class_getter(type(source_model))
        return target_model_class(**target_model_dict)

    def _convert_to_lower_model_dict(self, higher_model: H, **kwargs) -> dict[str, t.Any]:
        raise NotImplementedError

    def _convert_to_higher_model_dict(self, lower_model: L, **kwargs) -> dict[str, t.Any]:
        raise NotImplementedError

    @staticmethod
    def _get_pydantic_model_attr_conversion_iterator(
            source_model: H | L,
            target_model_dict: dict[str, t.Any],
            check_model_class: type[H | L],
            convert_func: t.Callable[[H | L], t.Any]  # TODO: annotation for kwargs
    ) -> t.Iterator[tuple[str, t.Any, bool]]:

        for key in source_model.model_fields:
            value = getattr(source_model, key)
            is_conditions_met = False
            target_model_dict[key] = value

            if isinstance(value, check_model_class):
                is_conditions_met = True
                target_model_dict[key] = convert_func(value)

            elif isinstance(value, list):
                is_conditions_met = True
                result_value = []
                for item in value:
                    if isinstance(item, check_model_class):
                        item_value = convert_func(item)
                    else:
                        item_value = value
                    result_value.append(item_value)
                target_model_dict[key] = result_value

            yield key, value, is_conditions_met
