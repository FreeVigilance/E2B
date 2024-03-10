import typing as t


def raise_settings_attribute_exception(missing_attribute: str) -> t.NoReturn:
    raise AttributeError(f'Attribute "{missing_attribute}" must be specified in settings.py')
