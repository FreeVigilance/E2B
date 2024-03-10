import enum


class StandardEnumStrMixin:
    def __str__(self):
        return enum.Enum.__str__(self)


class BaseIntEnum(StandardEnumStrMixin, enum.IntEnum):
    pass


class BaseStrEnum(StandardEnumStrMixin, enum.StrEnum):
    pass