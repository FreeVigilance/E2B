from decimal import Decimal
import typing as t

from pydantic import BaseModel

from app.src.shared import enums
from app.src.shared.enums import NullFlavor as NF


class DomainModel(BaseModel):
    id: int | None = None


class ICSR(DomainModel):
    c_2_r_primary_source_information: list['C_2_r_primary_source_information'] = []
    c_4_r_literature_reference: list['C_4_r_literature_reference'] = []
    c_1_identification_case_safety_report: t.Optional['C_1_identification_case_safety_report'] = None
    c_3_information_sender_case_safety_report: t.Optional['C_3_information_sender_case_safety_report'] = None
    c_5_study_identification: t.Optional['C_5_study_identification'] = None
    d_patient_characteristics: t.Optional['D_patient_characteristics'] = None
    pass


class C_1_identification_case_safety_report(DomainModel):
    c_1_6_1_r_documents_held_sender: list['C_1_6_1_r_documents_held_sender'] = []
    c_1_9_1_r_source_case_id: list['C_1_9_1_r_source_case_id'] = []
    c_1_10_r_identification_number_report_linked: list['C_1_10_r_identification_number_report_linked'] = []
    c_1_1_sender_safety_report_unique_id: str | None = None
    c_1_2_date_creation: str | None = None  # dt
    c_1_3_type_report: enums.C_1_3_type_report | None = None
    c_1_4_date_report_first_received_source: str | None = None  # dt
    c_1_5_date_most_recent_information: str | None = None  # dt
    c_1_6_1_additional_documents_available: bool | None = None
    c_1_7_fulfil_local_criteria_expedited_report: bool | t.Literal[NF.NI] | None = None
    c_1_8_1_worldwide_unique_case_identification_number: str | None = None
    c_1_8_2_first_sender: enums.C_1_8_2_first_sender | None = None
    c_1_9_1_other_case_ids_previous_transmissions: t.Literal[True] | t.Literal[NF.NI] | None = None
    c_1_11_1_report_nullification_amendment: enums.C_1_11_1_report_nullification_amendment | None = None
    c_1_11_2_reason_nullification_amendment: str | None = None


class C_1_6_1_r_documents_held_sender(DomainModel):
    c_1_6_1_r_1_documents_held_sender: str | None = None
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(DomainModel):
    c_1_9_1_r_1_source_case_id: str | None = None
    c_1_9_1_r_2_case_id: str | None = None


class C_1_10_r_identification_number_report_linked(DomainModel):
    c_1_10_r_identification_number_report_linked: str | None = None


class C_2_r_primary_source_information(DomainModel):
    c_2_r_1_1_reporter_title: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    c_2_r_1_2_reporter_given_name: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_1_3_reporter_middle_name: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_1_4_reporter_family_name: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_1_reporter_organisation: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_2_reporter_department: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_3_reporter_street: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_4_reporter_city: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_5_reporter_state_province: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_6_reporter_postcode: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_7_reporter_telephone: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_3_reporter_country_code: str | None = None  # st
    c_2_r_4_qualification: enums.C_2_r_4_qualification | t.Literal[NF.UNK] | None = None
    c_2_r_5_primary_source_regulatory_purposes: enums.C_2_r_5_primary_source_regulatory_purposes | None = None


class C_3_information_sender_case_safety_report(DomainModel):
    c_3_1_sender_type: enums.C_3_1_sender_type | None = None
    c_3_2_sender_organisation: str | None = None
    c_3_3_1_sender_department: str | None = None
    c_3_3_2_sender_title: str | None = None
    c_3_3_3_sender_given_name: str | None = None
    c_3_3_4_sender_middle_name: str | None = None
    c_3_3_5_sender_family_name: str | None = None
    c_3_4_1_sender_street_address: str | None = None
    c_3_4_2_sender_city: str | None = None
    c_3_4_3_sender_state_province: str | None = None
    c_3_4_4_sender_postcode: str | None = None
    c_3_4_5_sender_country_code: str | None = None  # st
    c_3_4_6_sender_telephone: str | None = None
    c_3_4_7_sender_fax: str | None = None
    c_3_4_8_sender_email: str | None = None


class C_4_r_literature_reference(DomainModel):
    c_4_r_1_literature_reference: str | t.Literal[NF.ASKU, NF.NASK] | None = None
    # file: c_4_r_2_included_documents


class C_5_study_identification(DomainModel):
    c_5_1_r_study_registration: list['C_5_1_r_study_registration'] = []
    c_5_2_study_name: str | t.Literal[NF.ASKU, NF.NASK] | None = None
    c_5_3_sponsor_study_number: str | t.Literal[NF.ASKU, NF.NASK] | None = None
    c_5_4_study_type_reaction: enums.C_5_4_study_type_reaction | None = None


class C_5_1_r_study_registration(DomainModel):
    c_5_1_r_1_study_registration_number: str | t.Literal[NF.ASKU, NF.NASK] | None = None
    c_5_1_r_2_study_registration_country: str | t.Literal[NF.ASKU, NF.NASK] | None = None  # st


class D_patient_characteristics(DomainModel):
    d_7_1_r_structured_information_medical_history: list['D_7_1_r_structured_information_medical_history'] = []
    d_8_r_past_drug_history: list['D_8_r_past_drug_history'] = []
    d_9_2_r_cause_death: list['D_9_2_r_cause_death'] = []
    d_9_4_r_autopsy_determined_cause_death: list['D_9_4_r_autopsy_determined_cause_death'] = []
    d_10_7_1_r_structured_information_parent_meddra_code: list['D_10_7_1_r_structured_information_parent_meddra_code'] = []
    d_10_8_r_past_drug_history_parent: list['D_10_8_r_past_drug_history_parent'] = []
    d_1_patient: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_1_1_1_medical_record_number_source_gp: str | t.Literal[NF.MSK] | None = None
    d_1_1_2_medical_record_number_source_specialist: str | t.Literal[NF.MSK] | None = None
    d_1_1_3_medical_record_number_source_hospital: str | t.Literal[NF.MSK] | None = None
    d_1_1_4_medical_record_number_source_investigation: str | t.Literal[NF.MSK] | None = None
    d_2_1_date_birth: str | t.Literal[NF.MSK] | None = None  # dt
    d_2_2a_age_onset_reaction_num: int | None = None
    d_2_2b_age_onset_reaction_unit: str | None = None  # st
    d_2_2_1a_gestation_period_reaction_foetus_num: int | None = None
    d_2_2_1b_gestation_period_reaction_foetus_unit: str | None = None  # st
    d_2_3_patient_age_group: enums.D_2_3_patient_age_group | None = None
    d_3_body_weight: Decimal | None = None
    d_4_height: int | None = None
    d_5_sex: enums.D_5_sex | t.Literal[NF.MSK, NF.UNK, NF.ASKU, NF.NASK] | None = None
    d_6_last_menstrual_period_date: str | None = None  # dt
    d_7_2_text_medical_history: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_7_3_concomitant_therapies: t.Literal[True] | None = None

    # d_9_case_death
    d_9_1_date_death: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_9_3_autopsy: bool | t.Literal[NF.ASKU, NF.NASK, NF.UNK] | None = None

    # d_10_information_concerning_parent
    d_10_1_parent_identification: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None

    # d_10_2_parent_age_information
    d_10_2_1_date_birth_parent: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt

    # d_10_2_2_age_parent
    d_10_2_2a_age_parent_num: int | None = None
    d_10_2_2b_age_parent_unit: str | None = None  # st

    d_10_3_last_menstrual_period_date_parent: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_10_4_body_weight_parent: Decimal | None = None
    d_10_5_height_parent: int | None = None
    d_10_6_sex_parent: enums.D_10_6_sex_parent | t.Literal[NF.UNK, NF.MSK, NF.ASKU, NF.NASK] | None = None

    # d_10_7_medical_history_parent
    d_10_7_2_text_medical_history_parent: str | None = None


class D_7_1_r_structured_information_medical_history(DomainModel):
    d_7_1_r_1a_meddra_version_medical_history: str | None = None  # st
    d_7_1_r_1b_medical_history_meddra_code: int | None = None
    d_7_1_r_2_start_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt  # dt
    d_7_1_r_3_continuing: bool | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_7_1_r_4_end_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt  # dt
    d_7_1_r_5_comments: str | None = None
    d_7_1_r_6_family_history: t.Literal[True] | None = None


class D_8_r_past_drug_history(DomainModel):
    d_8_r_1_name_drug: str | t.Literal[NF.UNK, NF.NA] | None = None
    d_8_r_2a_mpid_version: str | None = None  # st
    d_8_r_2b_mpid: str | None = None  # st
    d_8_r_3a_phpid_version: str | None = None  # st
    d_8_r_3b_phpid: str | None = None  # st
    d_8_r_4_start_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_8_r_5_end_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_8_r_6a_meddra_version_indication: str | None = None  # st
    d_8_r_6b_indication_meddra_code: int | None = None
    d_8_r_7a_meddra_version_reaction: str | None = None  # st
    d_8_r_7b_reaction_meddra_code: int | None = None


class D_9_2_r_cause_death(DomainModel):
    d_9_2_r_1a_meddra_version_cause_death: str | None = None  # st
    d_9_2_r_1b_cause_death_meddra_code: int | None = None
    d_9_2_r_2_cause_death: str | None = None


class D_9_4_r_autopsy_determined_cause_death(DomainModel):
    d_9_4_r_1a_meddra_version_autopsy_determined_cause_death: str | None = None  # st
    d_9_4_r_1b_autopsy_determined_cause_death_meddra_code: int | None = None
    d_9_4_r_2_autopsy_determined_cause_death: str | None = None


class D_10_7_1_r_structured_information_parent_meddra_code(DomainModel):
    d_10_7_1_r_1a_meddra_version_medical_history: str | None = None  # st
    d_10_7_1_r_1b_medical_history_meddra_code: int | None = None
    d_10_7_1_r_2_start_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_10_7_1_r_3_continuing: bool | t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_10_7_1_r_4_end_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_10_7_1_r_5_comments: str | None = None


class D_10_8_r_past_drug_history_parent(DomainModel):
    d_10_8_r_1_name_drug: str | None = None

    # d_10_8_r_2_mpid
    d_10_8_r_2a_mpid_version: str | None = None  # st
    d_10_8_r_2b_mpid: str | None = None  # st

    # d_10_8_r_3_phpid
    d_10_8_r_3a_phpid_version: str | None = None  # st
    d_10_8_r_3b_phpid: str | None = None  # st

    d_10_8_r_4_start_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt
    d_10_8_r_5_end_date: str | t.Literal[NF.MSK, NF.ASKU, NF.NASK] | None = None  # dt

    # d_10_8_r_6_indication_meddra_code
    d_10_8_r_6a_meddra_version_indication: str | None = None  # st
    d_10_8_r_6b_indication_meddra_code: int | None = None

    # d_10_8_r_7_reactions_meddra_code
    d_10_8_r_7a_meddra_version_reaction: str | None = None  # st
    d_10_8_r_7b_reactions_meddra_code: int | None = None
