from decimal import Decimal
import typing as t

from pydantic import BaseModel, model_validator
from pydantic_core import PydanticCustomError

from app.src.shared import enums
from app.src.shared.enums import NullFlavor as NF


# TODO: check if whole model layer is needed


class Value[T](BaseModel):
    value: T | None = None


class NullableValue[T, N](Value[T]):
    null_flavor: N | None = None

    @model_validator(mode='after')
    def _check_value_and_null_flavor_are_not_present_together(self) -> 'NullableValue':
        if self.null_flavor is not None and self.value is not None:
            raise PydanticCustomError('data_error', 'Null flavor should not be present if value is present')
        return self


class ApiModel(BaseModel):
    id: int | None = None


class ICSR(ApiModel):
    c_2_r_primary_source_information: list['C_2_r_primary_source_information'] = []
    c_4_r_literature_reference: list['C_4_r_literature_reference'] = []
    c_1_identification_case_safety_report: t.Optional['C_1_identification_case_safety_report'] = None
    c_3_information_sender_case_safety_report: t.Optional['C_3_information_sender_case_safety_report'] = None
    c_5_study_identification: t.Optional['C_5_study_identification'] = None
    d_patient_characteristics: t.Optional['D_patient_characteristics'] = None
    pass


class C_1_identification_case_safety_report(ApiModel):
    c_1_6_1_r_documents_held_sender: list['C_1_6_1_r_documents_held_sender'] = []
    c_1_9_1_r_source_case_id: list['C_1_9_1_r_source_case_id'] = []
    c_1_10_r_identification_number_report_linked: list['C_1_10_r_identification_number_report_linked'] = []
    c_1_1_sender_safety_report_unique_id: Value[str] = Value()
    c_1_2_date_creation: Value[str] = Value()  # dt
    c_1_3_type_report: Value[enums.C_1_3_type_report] = Value()
    c_1_4_date_report_first_received_source: Value[str] = Value()  # dt
    c_1_5_date_most_recent_information: Value[str] = Value()  # dt
    c_1_6_1_additional_documents_available: Value[bool] = Value()
    c_1_7_fulfil_local_criteria_expedited_report: NullableValue[bool, t.Literal[NF.NI]] = NullableValue()
    c_1_8_1_worldwide_unique_case_identification_number: Value[str] = Value()
    c_1_8_2_first_sender: Value[enums.C_1_8_2_first_sender] = Value()
    c_1_9_1_other_case_ids_previous_transmissions: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    c_1_11_1_report_nullification_amendment: Value[enums.C_1_11_1_report_nullification_amendment] = Value()
    c_1_11_2_reason_nullification_amendment: Value[str] = Value()


class C_1_6_1_r_documents_held_sender(ApiModel):
    c_1_6_1_r_1_documents_held_sender: Value[str] = Value()
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(ApiModel):
    c_1_9_1_r_1_source_case_id: Value[str] = Value()
    c_1_9_1_r_2_case_id: Value[str] = Value()


class C_1_10_r_identification_number_report_linked(ApiModel):
    c_1_10_r_identification_number_report_linked: Value[str] = Value()


class C_2_r_primary_source_information(ApiModel):
    c_2_r_1_1_reporter_title: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    c_2_r_1_2_reporter_given_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_1_3_reporter_middle_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_1_4_reporter_family_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_1_reporter_organisation: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_2_reporter_department: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_3_reporter_street: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_4_reporter_city: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_5_reporter_state_province: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_6_reporter_postcode: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_2_7_reporter_telephone: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_3_reporter_country_code: Value[str] = Value()  # st
    c_2_r_4_qualification: NullableValue[enums.C_2_r_4_qualification, t.Literal[NF.UNK]] = NullableValue()
    c_2_r_5_primary_source_regulatory_purposes: Value[enums.C_2_r_5_primary_source_regulatory_purposes] = Value()


class C_3_information_sender_case_safety_report(ApiModel):
    c_3_1_sender_type: Value[enums.C_3_1_sender_type] = Value()
    c_3_2_sender_organisation: Value[str] = Value()
    c_3_3_1_sender_department: Value[str] = Value()
    c_3_3_2_sender_title: Value[str] = Value()
    c_3_3_3_sender_given_name: Value[str] = Value()
    c_3_3_4_sender_middle_name: Value[str] = Value()
    c_3_3_5_sender_family_name: Value[str] = Value()
    c_3_4_1_sender_street_address: Value[str] = Value()
    c_3_4_2_sender_city: Value[str] = Value()
    c_3_4_3_sender_state_province: Value[str] = Value()
    c_3_4_4_sender_postcode: Value[str] = Value()
    c_3_4_5_sender_country_code: Value[str] = Value()  # st
    c_3_4_6_sender_telephone: Value[str] = Value()
    c_3_4_7_sender_fax: Value[str] = Value()
    c_3_4_8_sender_email: Value[str] = Value()


class C_4_r_literature_reference(ApiModel):
    c_4_r_1_literature_reference: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    # file: c_4_r_2_included_documents


class C_5_study_identification(ApiModel):
    c_5_1_r_study_registration: list['C_5_1_r_study_registration'] = []
    c_5_2_study_name: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_3_sponsor_study_number: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_4_study_type_reaction: Value[enums.C_5_4_study_type_reaction] = Value()


class C_5_1_r_study_registration(ApiModel):
    c_5_1_r_1_study_registration_number: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_1_r_2_study_registration_country: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()  # st


class D_patient_characteristics(ApiModel):
    d_7_1_r_structured_information_medical_history: list['D_7_1_r_structured_information_medical_history'] = []
    d_8_r_past_drug_history: list['D_8_r_past_drug_history'] = []
    d_9_2_r_cause_death: list['D_9_2_r_cause_death'] = []
    d_9_4_r_autopsy_determined_cause_death: list['D_9_4_r_autopsy_determined_cause_death'] = []
    d_10_7_1_r_structured_information_parent_meddra_code: list['D_10_7_1_r_structured_information_parent_meddra_code'] = []
    d_10_8_r_past_drug_history_parent: list['D_10_8_r_past_drug_history_parent'] = []
    d_1_patient: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    d_1_1_1_medical_record_number_source_gp: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_2_medical_record_number_source_specialist: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_3_medical_record_number_source_hospital: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_4_medical_record_number_source_investigation: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_2_1_date_birth: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()  # dt
    d_2_2a_age_onset_reaction_num: Value[int] = Value()
    d_2_2b_age_onset_reaction_unit: Value[str] = Value()  # st
    d_2_2_1a_gestation_period_reaction_foetus_num: Value[int] = Value()
    d_2_2_1b_gestation_period_reaction_foetus_unit: Value[str] = Value()  # st
    d_2_3_patient_age_group: Value[enums.D_2_3_patient_age_group] = Value()
    d_3_body_weight: Value[Decimal] = Value()
    d_4_height: Value[int] = Value()
    d_5_sex: NullableValue[enums.D_5_sex, t.Literal[NF.MSK, NF.UNK, NF.ASKU, NF.NASK]] = NullableValue()
    d_6_last_menstrual_period_date: Value[str] = Value()  # dt
    d_7_2_text_medical_history: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    d_7_3_concomitant_therapies: Value[t.Literal[True]] = Value()

    # d_9_case_death
    d_9_1_date_death: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_9_3_autopsy: NullableValue[bool, t.Literal[NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()

    # d_10_information_concerning_parent
    d_10_1_parent_identification: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()

    # d_10_2_parent_age_information
    d_10_2_1_date_birth_parent: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt

    # d_10_2_2_age_parent
    d_10_2_2a_age_parent_num: Value[int] = Value()
    d_10_2_2b_age_parent_unit: Value[str] = Value()  # st

    d_10_3_last_menstrual_period_date_parent: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_10_4_body_weight_parent: Value[Decimal] = Value()
    d_10_5_height_parent: Value[int] = Value()
    d_10_6_sex_parent: NullableValue[enums.D_10_6_sex_parent, t.Literal[NF.UNK, NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()

    # d_10_7_medical_history_parent
    d_10_7_2_text_medical_history_parent: Value[str] = Value()


class D_7_1_r_structured_information_medical_history(ApiModel):
    d_7_1_r_1a_meddra_version_medical_history: Value[str] = Value()  # st
    d_7_1_r_1b_medical_history_meddra_code: Value[int] = Value()
    d_7_1_r_2_start_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt  # dt
    d_7_1_r_3_continuing: NullableValue[bool, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    d_7_1_r_4_end_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt  # dt
    d_7_1_r_5_comments: Value[str] = Value()
    d_7_1_r_6_family_history: Value[t.Literal[True]] = Value()


class D_8_r_past_drug_history(ApiModel):
    d_8_r_1_name_drug: NullableValue[str, t.Literal[NF.UNK, NF.NA]] = NullableValue()
    d_8_r_2a_mpid_version: Value[str] = Value()  # st
    d_8_r_2b_mpid: Value[str] = Value()  # st
    d_8_r_3a_phpid_version: Value[str] = Value()  # st
    d_8_r_3b_phpid: Value[str] = Value()  # st
    d_8_r_4_start_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_8_r_5_end_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_8_r_6a_meddra_version_indication: Value[str] = Value()  # st
    d_8_r_6b_indication_meddra_code: Value[int] = Value()
    d_8_r_7a_meddra_version_reaction: Value[str] = Value()  # st
    d_8_r_7b_reaction_meddra_code: Value[int] = Value()


class D_9_2_r_cause_death(ApiModel):
    d_9_2_r_1a_meddra_version_cause_death: Value[str] = Value()  # st
    d_9_2_r_1b_cause_death_meddra_code: Value[int] = Value()
    d_9_2_r_2_cause_death: Value[str] = Value()


class D_9_4_r_autopsy_determined_cause_death(ApiModel):
    d_9_4_r_1a_meddra_version_autopsy_determined_cause_death: Value[str] = Value()  # st
    d_9_4_r_1b_autopsy_determined_cause_death_meddra_code: Value[int] = Value()
    d_9_4_r_2_autopsy_determined_cause_death: Value[str] = Value()


class D_10_7_1_r_structured_information_parent_meddra_code(ApiModel):
    d_10_7_1_r_1a_meddra_version_medical_history: Value[str] = Value()  # st
    d_10_7_1_r_1b_medical_history_meddra_code: Value[int] = Value()
    d_10_7_1_r_2_start_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_10_7_1_r_3_continuing: NullableValue[bool, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    d_10_7_1_r_4_end_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_10_7_1_r_5_comments: Value[str] = Value()


class D_10_8_r_past_drug_history_parent(ApiModel):
    d_10_8_r_1_name_drug: Value[str] = Value()

    # d_10_8_r_2_mpid
    d_10_8_r_2a_mpid_version: Value[str] = Value()  # st
    d_10_8_r_2b_mpid: Value[str] = Value()  # st

    # d_10_8_r_3_phpid
    d_10_8_r_3a_phpid_version: Value[str] = Value()  # st
    d_10_8_r_3b_phpid: Value[str] = Value()  # st

    d_10_8_r_4_start_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_10_8_r_5_end_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt

    # d_10_8_r_6_indication_meddra_code
    d_10_8_r_6a_meddra_version_indication: Value[str] = Value()  # st
    d_10_8_r_6b_indication_meddra_code: Value[int] = Value()

    # d_10_8_r_7_reactions_meddra_code
    d_10_8_r_7a_meddra_version_reaction: Value[str] = Value()  # st
    d_10_8_r_7b_reactions_meddra_code: Value[int] = Value()
