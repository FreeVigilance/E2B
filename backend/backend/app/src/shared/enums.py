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


class C_1_3_type_report(BaseIntEnum):
    SPONTANEOUS_REPORT = 1
    REPORT_FROM_STUDY = 2
    OTHER = 3
    NOT_AVAILABLE_TO_SENDER = 4


class C_1_8_2_first_sender(BaseIntEnum):
    REGULATOR = 1
    OTHER = 2


class C_1_11_1_report_nullification_amendment(BaseIntEnum):
    NULLIFICATION = 1
    AMENDMENT = 2


class C_2_r_4_qualification(BaseIntEnum):
    PHYSICIAN = 1
    PHARMACIST = 2
    OTHER_HEALTH_PROFESSIONAL = 3
    LAWYER = 4
    CONSUMER_OR_OTHER_NON_HEALTH_PROFESSIONAL = 5


class C_2_r_5_primary_source_regulatory_purposes(BaseIntEnum):
    PRIMARY = 1


class C_3_1_sender_type(BaseIntEnum):
    PHARMACEUTICAL_COMPANY = 1
    REGULATORY_AUTHORITY = 2
    HEALTH_PROFESSIONAL = 3
    REGIONAL_PHARMACOVIGILANCE_CENTRE = 4
    WHO_COLLABORATING_CENTRES_FOR_INTERNATIONAL_DRUG_MONITORING = 5
    OTHER = 6
    PATIENT_OR_CONSUMER = 7


class C_5_4_study_type_reaction(BaseIntEnum):
    CLINICAL_TRIALS = 1
    INDIVIDUAL_PATIENT_USE = 2
    OTHER_STUDIES = 3


class D_2_3_patient_age_group(BaseIntEnum):
    FOETUS = 0
    NEONATE = 1
    INFANT = 2
    CHILD = 3
    ADOLESCENT = 4
    ADULT = 5
    ELDERLY = 6


class D_5_sex(BaseIntEnum):
    MALE = 1
    FEMALE = 2


class D_10_6_sex_parent(BaseIntEnum):
    MALE = 1
    FEMALE = 2
