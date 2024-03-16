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


class ModelWithTempRelationsSupport(models.Model):
    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        temp_keys = list(filter(lambda k: temp_relation_field_utils.is_special_field_name(k), kwargs.keys()))
        popped_kwargs = dict()
        for key in temp_keys:
            popped_kwargs[key] = kwargs.pop(key)
        super().__init__(*args, **kwargs)
        for key, value in popped_kwargs.items():
            setattr(self, key, value)
