import typing as t


def raise_settings_attribute_error(missing_attribute: str) -> t.NoReturn:
    raise AttributeError(f'Attribute "{missing_attribute}" must be specified in settings.py')
