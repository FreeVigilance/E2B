from django.db import models


TEMP_RELATION_FIELD_NAME_PREFIX = 'tmp_rel_'


class ModelWithTempRelationsSupport(models.Model):
    class Meta:
        abstract = True

    def __init__(self, *args, **kwargs):
        temp_keys = list(filter(lambda k: k.startswith(TEMP_RELATION_FIELD_NAME_PREFIX), kwargs.keys()))
        popped_kwargs = dict()
        for key in temp_keys:
            popped_kwargs[key] = kwargs.pop(key)
        super().__init__(*args, **kwargs)
        for key, value in popped_kwargs.items():
            setattr(self, key, value)
