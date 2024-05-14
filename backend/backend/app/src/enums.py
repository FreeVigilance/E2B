import enum
from enum import StrEnum


class NullFlavor(enum.StrEnum):
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


class C_1_3_type_report(enum.IntEnum):
    SPONTANEOUS_REPORT = 1
    REPORT_FROM_STUDY = 2
    OTHER = 3
    NOT_AVAILABLE_TO_SENDER = 4


class C_1_8_2_first_sender(enum.IntEnum):
    REGULATOR = 1
    OTHER = 2


class C_1_11_1_report_nullification_amendment(enum.IntEnum):
    NULLIFICATION = 1
    AMENDMENT = 2


class C_2_r_4_qualification(enum.IntEnum):
    PHYSICIAN = 1
    PHARMACIST = 2
    OTHER_HEALTH_PROFESSIONAL = 3
    LAWYER = 4
    CONSUMER_OR_OTHER_NON_HEALTH_PROFESSIONAL = 5


class C_2_r_5_primary_source_regulatory_purposes(enum.IntEnum):
    PRIMARY = 1


class C_3_1_sender_type(enum.IntEnum):
    PHARMACEUTICAL_COMPANY = 1
    REGULATORY_AUTHORITY = 2
    HEALTH_PROFESSIONAL = 3
    REGIONAL_PHARMACOVIGILANCE_CENTRE = 4
    WHO_COLLABORATING_CENTRES_FOR_INTERNATIONAL_DRUG_MONITORING = 5
    OTHER = 6
    PATIENT_OR_CONSUMER = 7


class C_5_4_study_type_reaction(enum.IntEnum):
    CLINICAL_TRIALS = 1
    INDIVIDUAL_PATIENT_USE = 2
    OTHER_STUDIES = 3


class D_2_3_patient_age_group(enum.IntEnum):
    FOETUS = 0
    NEONATE = 1
    INFANT = 2
    CHILD = 3
    ADOLESCENT = 4
    ADULT = 5
    ELDERLY = 6


class D_5_sex(enum.IntEnum):
    MALE = 1
    FEMALE = 2


class D_10_6_sex_parent(enum.IntEnum):
    MALE = 1
    FEMALE = 2


class E_i_3_1_term_highlighted_reporter(enum.IntEnum):
    YES_NOT_SERIOUS = 1
    NO_NOT_SERIOUS = 2
    YES_SERIOUS = 3
    NO_SERIOUS = 4


class E_i_7_outcome_reaction_last_observation(enum.IntEnum):
    UNKNOWN = 0
    RECOVERED_OR_RESOLVED = 1
    RECOVERING_OR_RESOLVING = 2
    NOT_RECOVERED_OR_NOT_RESOLVED_OR_ONGOING = 3
    RECOVERED_OR_RESOLVED_WITH_SEQUELAE = 4
    FATAL = 5


class F_r_3_1_test_result_code(enum.IntEnum):
    POSITIVE = 1
    NEGATIVE = 2
    BORDERLINE = 3
    INCONCLUSIVE = 4


class G_k_1_characterisation_drug_role(enum.IntEnum):
    SUSPECT = 1
    CONCOMITANT = 2
    INTERACTING = 3
    DRUG_NOT_ADMINISTERED = 4


class G_k_8_action_taken_drug(enum.IntEnum):
    UNKNOWN = 0
    DRUG_WITHDRAWN = 1
    DOSE_REDUCED = 2
    DOSE_INCREASED = 3
    DOSE_NOT_CHANGED = 4
    NOT_APPLICABLE = 9


class G_k_9_i_4_reaction_recur_readministration(enum.IntEnum):
    YES_YES = 1
    YES_NO = 2
    YES_UNK = 3
    NO_NA = 4


class G_k_10_r_additional_information_drug(enum.IntEnum):
    COUNTERFEIT = 1
    OVERDOSE = 2
    DRUG_TAKEN_BY_THE_FATHER = 3
    DRUG_TAKEN_BEYOND_EXPIRY_DATE = 4
    BATCH_AND_LOT_TESTED_AND_FOUND_WITHIN_SPECIFICATIONS = 5
    BATCH_AND_LOT_TESTED_AND_FOUND_NOT_WITHIN_SPECIFICATIONS = 6
    MEDICATION_ERROR = 7
    MISUSE = 8
    ABUSE = 9
    OCCUPATIONAL_EXPOSURE = 10
    OFF_LABEL_USE = 11


class D_2_2b_age_onset_reaction_unit(enum.StrEnum):
    DECADE = "10.a"
    YEAR = "a"
    MONTH = "mo"
    WEEK = "wk"
    DAY = "d"
    HOUR = "h"


class G_k_4_r_6b_duration_drug_administration_unit(enum.StrEnum):
    YEAR = "a"
    MONTH = "mo"
    WEEK = "wk"
    DAY = "d"
    HOUR = "h"
    MINUTE = "min"
    SECOND = "s"


class MedDRALevelEnum(StrEnum):
    SOC = "SOC"
    HLGT = "HLGT"
    HLT = "HLT"
    PT = "PT"
    LLT = "LLT"
