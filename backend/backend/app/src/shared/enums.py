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


class E_i_3_1_term_highlighted_reporter(BaseIntEnum):
    YES_NOT_SERIOUS = 1
    NO_NOT_SERIOUS = 2
    YES_SERIOUS = 3
    NO_SERIOUS = 4


class E_i_7_outcome_reaction_last_observation(BaseIntEnum):
    UNKNOWN = 0
    RECOVERED_OR_RESOLVED = 1
    RECOVERING_OR_RESOLVING = 2
    NOT_RECOVERED_OR_NOT_RESOLVED_OR_ONGOING = 3
    RECOVERED_OR_RESOLVED_WITH_SEQUELAE = 4
    FATAL = 5


class F_r_3_1_test_result_code(BaseIntEnum):
    POSITIVE = 1
    NEGATIVE = 2
    BORDERLINE = 3
    INCONCLUSIVE = 4


class G_k_1_characterisation_drug_role(BaseIntEnum):
    SUSPECT = 1
    CONCOMITANT = 2
    INTERACTING = 3
    DRUG_NOT_ADMINISTERED = 4


class G_k_8_action_taken_drug(BaseIntEnum):
    UNKNOWN = 0
    DRUG_WITHDRAWN = 1
    DOSE_REDUCED = 2
    DOSE_INCREASED = 3
    DOSE_NOT_CHANGED = 4
    NOT_APPLICABLE = 9


class G_k_9_i_4_reaction_recur_readministration(BaseIntEnum):
    YES_YES = 1
    YES_NO = 2
    YES_UNK = 3
    NO_NA = 4


class G_k_10_r_additional_information_drug(BaseIntEnum):
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
