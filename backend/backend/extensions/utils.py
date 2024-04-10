import typing as t
import warnings


def update_or_create_list_in_dict[K, V](dict_: dict[K, list[V]], key: K, val: V) -> None:
    list_ = dict_.get(key)
    if list_ is None:
        list_ = []
    list_.append(val)
    dict_[key] = list_


def get_or_create_dict_in_dict[K1, K2, V](dict_: dict[K1, dict[K2, V]], key: K1) -> dict[K2, V]:
    try:
        val = dict_[key]
    except KeyError:
        dict_[key] = {}
        return dict_[key]
    if not isinstance(val, dict):
        raise TypeError(f'Expected retrieved value to be a dict, got: {type(val)}')
    return val


def exec_without_warnings[T, **P](exec: t.Callable[[], T]) -> T:
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return exec()
