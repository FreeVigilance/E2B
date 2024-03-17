from django.db import models

from extensions.django.fields import temp_relation_field_utils


class ModelWithTempRelationSupport(models.Model):
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
