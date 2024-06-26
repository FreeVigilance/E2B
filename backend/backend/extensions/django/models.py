import typing as t

from django.db import models

from extensions.django.constraints import add_choices_constraint
from extensions.django.fields import temp_relation_field_utils


def get_meta_attr_or_raise_exc(attrs: t.Dict[str, t.Any], class_name: str, meta_attr_usage: str) -> type[t.Any]:
    if 'Meta' not in attrs:
        raise RuntimeError(f'Model class {class_name} must contain explicit inner class Meta for {meta_attr_usage} usage')
    return attrs['Meta']


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


class ModelWithFieldChoicesConstraintMeta(models.base.ModelBase):
    """
    Used for a db constraint creation for the choices param in every model field.
    Also allows to set choices param in any model field as any iterable.
    """

    def __new__(cls, name, bases, attrs, **kwargs):
        for field_name, field in attrs.items():
            if not isinstance(field, models.Field):
                continue

            choices = field.choices
            if choices:
                meta = get_meta_attr_or_raise_exc(attrs, name, 'choices field param')
                add_choices_constraint(meta, field_name, choices)

                # Format choices if current iterable is invalid for django
                if field._check_choices():
                    field.choices = {c: c for c in choices}

        return super().__new__(cls, name, bases, attrs, **kwargs)