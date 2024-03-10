import typing as t

from django.conf import settings
from django.db import models

from extensions.django import exceptions


CONSTRAINT_NAME_PARTS_SEPARATOR = '__'
UNIQUE_TOGETHER_CONSTRAINT_LABEL = 'unqtgr'
CHOICES_CONSTRAINT_LABEL = 'choics'
ANY_NULL_CONSTRAINT_LABEL = 'anynul'


def add_constraint(meta_cls: type[t.Any], constraint: models.BaseConstraint) -> None:
    try:
        meta_cls.constraints
    except AttributeError:
        setattr(meta_cls, 'constraints', [])
    meta_cls.constraints.append(constraint)


def make_constraint_name(*field_names: str, constraint_label: str) -> str:
    try:
        max_len = settings.DB_LABEL_MAX_LENGTH
        max_len -= len(constraint_label) + len(CONSTRAINT_NAME_PARTS_SEPARATOR)
    except AttributeError:
        exceptions.raise_settings_attribute_exception('DB_LABEL_MAX_LENGTH')
    
    field_names_cnt = len(field_names)
    part_len = max_len // field_names_cnt - len(CONSTRAINT_NAME_PARTS_SEPARATOR)
    constraint_name = constraint_label + CONSTRAINT_NAME_PARTS_SEPARATOR
    
    for i in range(field_names_cnt):
        field_name = field_names[i]
        end_idx = min(part_len, len(field_name))
        part = field_name[:end_idx]
        if part[-1] == '_':
            part = part[:-1]
        constraint_name += part
        if i < field_names_cnt - 1:
            constraint_name += CONSTRAINT_NAME_PARTS_SEPARATOR

    return constraint_name


def add_choices_constraint(meta_cls: type[t.Any], field_name: str, choices: t.Iterable[t.Any]) -> None:
    constraint = models.CheckConstraint(
        check=models.Q(**{f'{field_name}__in': choices}),
        name=make_constraint_name(field_name, constraint_label=CHOICES_CONSTRAINT_LABEL)
    )
    add_constraint(meta_cls, constraint)


def add_unique_together_constraint(meta_cls: type[t.Any], *field_names: str):
    constraint = models.UniqueConstraint(
        fields=field_names,
        name=make_constraint_name(*field_names, constraint_label=UNIQUE_TOGETHER_CONSTRAINT_LABEL)
    )
    add_constraint(meta_cls, constraint)


def add_any_null_constraint(meta_cls: type, *field_names: str) -> None:
    checks = [models.Q(**{f'{f}__isnull': True}) for f in field_names]
    result_check = checks[0]
    for check in checks[1:]:
        result_check |= check

    constraint = models.CheckConstraint(
        check=result_check,
        name=make_constraint_name(*field_names, constraint_label=ANY_NULL_CONSTRAINT_LABEL)
    )
    add_constraint(meta_cls, constraint)
