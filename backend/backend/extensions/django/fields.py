from django.db import models


class PrefixedFieldUtils:
    def __init__(self, field_name_prefix: str):
        self._field_name_prefix = field_name_prefix

    def make_special_field_name(self, field_name):
        return self._field_name_prefix + field_name

    def is_special_field_name(self, field_name: str) -> bool:
        return field_name.startswith(self._field_name_prefix)

    def get_base_field_name(self, temp_relation_field_name: str):
        return temp_relation_field_name.replace(self._field_name_prefix, '', 1)


temp_relation_field_utils = PrefixedFieldUtils('tmp_rel_')


class ArbitraryDecimalField(models.DecimalField):
    def _check_decimal_places(self):
        return []

    def _check_max_digits(self):
        return []

    def _check_decimal_places_and_max_digits(self, **kwargs):
        return []

    def db_type(self, connection):
        assert connection.settings_dict['ENGINE'] == 'django.db.backends.postgresql'
        return 'numeric'
