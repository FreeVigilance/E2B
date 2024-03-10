import enum

from extensions.enums import BaseIntEnum, BaseStrEnum


class NullFlavor(BaseStrEnum):
    @staticmethod
    def _generate_next_value_(member_name: str, *_) -> str:
        return member_name

    NI = enum.auto()    # No Information
    MSK = enum.auto()   # Masked
    UNK = enum.auto()   # Unknown
    NA = enum.auto()    # Not Applicable
    ASKU = enum.auto()  # Asked But Unknown
    NASK = enum.auto()  # Not Asked
    NINF = enum.auto()  # Negative Infinity
    PINF = enum.auto()  # Positive Infinity


class C_1_3_type_of_report(BaseIntEnum):
    SPONTANEOUS_REPORT = 1
    REPORT_FROM_STUDY = 2
    OTHER = 3
    NOT_AVAILABLE_TO_SENDER = 4


class C_1_8_2_first_sender_of_this_case(BaseIntEnum):
    REGULATOR = 1
    OTHER = 2


class C_1_11_1_report_nullification_or_amendment(BaseIntEnum):
    NULLIFICATION = 1
    AMENDMENT = 2