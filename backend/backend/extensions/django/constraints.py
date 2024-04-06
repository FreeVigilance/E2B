import typing as t

from django.db import models, connection


CONSTRAINT_NAME_PARTS_SEPARATOR = '__'
UNIQUE_TOGETHER_CONSTRAINT_LABEL = 'unqtgr'
CHOICES_CONSTRAINT_LABEL = 'choics'
ANY_NULL_CONSTRAINT_LABEL = 'anynul'


def add_constraint(meta_cls: type[t.Any], constraint: models.BaseConstraint) -> None:
    constraints = getattr(meta_cls, 'constraints', [])
    constraints.append(constraint)
    setattr(meta_cls, 'constraints', constraints)


def make_constraint_name(meta_cls: type[t.Any], constraint_label: str, *field_names: str) -> str:
    # Add db_table or model class name to constraint name parts for better uniqueness
    db_table = getattr(meta_cls, 'db_table', meta_cls.__qualname__.split('.')[0])
    parts = (db_table,) + field_names

    db_names_max_len = connection.ops.max_name_length()
    sep_len = len(CONSTRAINT_NAME_PARTS_SEPARATOR)
    max_len = db_names_max_len - len(constraint_label) - sep_len
    parts_cnt = len(parts)
    part_len = max_len // parts_cnt - sep_len
    constraint_name = constraint_label + CONSTRAINT_NAME_PARTS_SEPARATOR

    for i in range(parts_cnt):
        part = parts[i]
        end_idx = min(part_len, len(part))
        part = part[:end_idx]
        if part[-1] == '_':
            part = part[:-1]
        constraint_name += part
        if i < parts_cnt - 1:
            constraint_name += CONSTRAINT_NAME_PARTS_SEPARATOR

    return constraint_name


def add_choices_constraint(meta_cls: type[t.Any], field_name: str, choices: t.Iterable[t.Any]) -> None:
    constraint = models.CheckConstraint(
        check=models.Q(**{f'{field_name}__in': choices}),
        name=make_constraint_name(meta_cls, CHOICES_CONSTRAINT_LABEL, field_name)
    )
    add_constraint(meta_cls, constraint)


def add_unique_constraint(meta_cls: type[t.Any], *field_names: str) -> None:
    constraint = models.UniqueConstraint(
        fields=field_names,
        name=make_constraint_name(meta_cls, UNIQUE_TOGETHER_CONSTRAINT_LABEL, *field_names)
    )
    add_constraint(meta_cls, constraint)


def add_any_null_constraint(meta_cls: type, *field_names: str) -> None:
    checks = [models.Q(**{f'{f}__isnull': True}) for f in field_names]
    result_check = checks[0]
    for check in checks[1:]:
        result_check |= check

    constraint = models.CheckConstraint(
        check=result_check,
        name=make_constraint_name(meta_cls, ANY_NULL_CONSTRAINT_LABEL, *field_names)
    )
    add_constraint(meta_cls, constraint)
