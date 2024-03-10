from django.db import models


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