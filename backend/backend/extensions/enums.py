import enum


class BaseEnumStrMixin:
    """Declares base Enum str representation."""

    def __str__(self):
        return enum.Enum.__str__(self)


class BaseIntEnum(BaseEnumStrMixin, enum.IntEnum):
    pass


class BaseStrEnum(BaseEnumStrMixin, enum.StrEnum):
    pass