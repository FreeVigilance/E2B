from decimal import Decimal
import typing as t

from app.src.shared import enums
from app.src.shared.enums import NullFlavor as NF
from extensions import pydantic as pde


class Value[T](pde.PostValidatableModel, pde.SafeValidatableModel):
    value: T | None = None


class NullableValue[T, N](Value[T]):
    null_flavor: N | None = None

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor):
        processor.try_validate(
            ('value', 'null_flavor'),
            'Null flavor should not be specified if value is specified',
            lambda value, null_flavor:
                value is None or null_flavor is None
        )


class ApiModel(pde.PostValidatableModel, pde.SafeValidatableModel):
    id: int | None = None


class ICSR(ApiModel):
    c_1_identification_case_safety_report: t.Optional['C_1_identification_case_safety_report'] = None
    c_2_r_primary_source_information: list['C_2_r_primary_source_information'] = []
    c_3_information_sender_case_safety_report: t.Optional['C_3_information_sender_case_safety_report'] = None
    c_4_r_literature_reference: list['C_4_r_literature_reference'] = []
    c_5_study_identification: t.Optional['C_5_study_identification'] = None
    d_patient_characteristics: t.Optional['D_patient_characteristics'] = None
    e_i_reaction_event: list['E_i_reaction_event'] = []
    f_r_results_tests_procedures_investigation_patient: list['F_r_results_tests_procedures_investigation_patient'] = []
    g_k_drug_information: list['G_k_drug_information'] = []
    h_narrative_case_summary: t.Optional['H_narrative_case_summary'] = None


# C_1_identification_case_safety_report


class C_1_identification_case_safety_report(ApiModel):
    c_1_6_1_r_documents_held_sender: list['C_1_6_1_r_documents_held_sender'] = []
    c_1_9_1_r_source_case_id: list['C_1_9_1_r_source_case_id'] = []
    c_1_10_r_identification_number_report_linked: list['C_1_10_r_identification_number_report_linked'] = []

    c_1_1_sender_safety_report_unique_id: Value[str] = Value()
    c_1_2_date_creation: Value[str] = Value()  # dt
    c_1_3_type_report: Value[enums.C_1_3_type_report] = Value()
    c_1_4_date_report_first_received_source: Value[str] = Value()  # dt
    c_1_5_date_most_recent_information: Value[str] = Value()  # dt

    # c_1_6_additional_available_documents_held_sender
    c_1_6_1_additional_documents_available: Value[bool] = Value()

    c_1_7_fulfil_local_criteria_expedited_report: NullableValue[bool, t.Literal[NF.NI]] = NullableValue()

    # c_1_8_worldwide_unique_case_identification
    c_1_8_1_worldwide_unique_case_identification_number: Value[str] = Value()
    c_1_8_2_first_sender: Value[enums.C_1_8_2_first_sender] = Value()

    # c_1_9_other_case_ids
    c_1_9_1_other_case_ids_previous_transmissions: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()

    # c_1_11_report_nullification_amendment
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


# C_2_r_primary_source_information


class C_2_r_primary_source_information(ApiModel):
    # c_2_r_1_reporter_name
    c_2_r_1_1_reporter_title: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    c_2_r_1_2_reporter_given_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_1_3_reporter_middle_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()
    c_2_r_1_4_reporter_family_name: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()

    # c_2_r_2_reporter_address_telephone
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


# C_3_information_sender_case_safety_report


class C_3_information_sender_case_safety_report(ApiModel):
    c_3_1_sender_type: Value[enums.C_3_1_sender_type] = Value()
    c_3_2_sender_organisation: Value[str] = Value()

    # c_3_3_person_responsible_sending_report
    c_3_3_1_sender_department: Value[str] = Value()
    c_3_3_2_sender_title: Value[str] = Value()
    c_3_3_3_sender_given_name: Value[str] = Value()
    c_3_3_4_sender_middle_name: Value[str] = Value()
    c_3_3_5_sender_family_name: Value[str] = Value()

    # c_3_4_sender_address_fax_telephone_email
    c_3_4_1_sender_street_address: Value[str] = Value()
    c_3_4_2_sender_city: Value[str] = Value()
    c_3_4_3_sender_state_province: Value[str] = Value()
    c_3_4_4_sender_postcode: Value[str] = Value()
    c_3_4_5_sender_country_code: Value[str] = Value()  # st
    c_3_4_6_sender_telephone: Value[str] = Value()
    c_3_4_7_sender_fax: Value[str] = Value()
    c_3_4_8_sender_email: Value[str] = Value()


# C_4_r_literature_reference


class C_4_r_literature_reference(ApiModel):
    c_4_r_1_literature_reference: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    # file: c_4_r_2_included_documents


# C_5_study_identification

class C_5_study_identification(ApiModel):
    c_5_1_r_study_registration: list['C_5_1_r_study_registration'] = []

    c_5_2_study_name: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_3_sponsor_study_number: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_4_study_type_reaction: Value[enums.C_5_4_study_type_reaction] = Value()


class C_5_1_r_study_registration(ApiModel):
    c_5_1_r_1_study_registration_number: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()
    c_5_1_r_2_study_registration_country: NullableValue[str, t.Literal[NF.ASKU, NF.NASK]] = NullableValue()  # st


# D_patient_characteristics


class D_patient_characteristics(ApiModel):
    d_7_1_r_structured_information_medical_history: list['D_7_1_r_structured_information_medical_history'] = []
    d_8_r_past_drug_history: list['D_8_r_past_drug_history'] = []
    d_9_2_r_cause_death: list['D_9_2_r_cause_death'] = []
    d_9_4_r_autopsy_determined_cause_death: list['D_9_4_r_autopsy_determined_cause_death'] = []
    d_10_7_1_r_structured_information_parent_meddra_code: list['D_10_7_1_r_structured_information_parent_meddra_code'] = []
    d_10_8_r_past_drug_history_parent: list['D_10_8_r_past_drug_history_parent'] = []

    d_1_patient: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()

    # d_1_1_medical_record_number_source
    d_1_1_1_medical_record_number_source_gp: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_2_medical_record_number_source_specialist: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_3_medical_record_number_source_hospital: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()
    d_1_1_4_medical_record_number_source_investigation: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()

    # d_2_age_information

    d_2_1_date_birth: NullableValue[str, t.Literal[NF.MSK]] = NullableValue()  # dt

    # d_2_2_age_onset_reaction

    d_2_2a_age_onset_reaction_num: Value[int] = Value()
    d_2_2b_age_onset_reaction_unit: Value[str] = Value()  # st

    # d_2_2_1_gestation_period_reaction_foetus
    d_2_2_1a_gestation_period_reaction_foetus_num: Value[int] = Value()
    d_2_2_1b_gestation_period_reaction_foetus_unit: Value[str] = Value()  # st

    d_2_3_patient_age_group: Value[enums.D_2_3_patient_age_group] = Value()

    d_3_body_weight: Value[Decimal] = Value()
    d_4_height: Value[int] = Value()
    d_5_sex: NullableValue[enums.D_5_sex, t.Literal[NF.MSK, NF.UNK, NF.ASKU, NF.NASK]] = NullableValue()
    d_6_last_menstrual_period_date: Value[str] = Value()  # dt

    # d_7_medical_history
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

    # d_8_r_2_mpid
    d_8_r_2a_mpid_version: Value[str] = Value()  # st
    d_8_r_2b_mpid: Value[str] = Value()  # st

    # d_8_r_3_phpid
    d_8_r_3a_phpid_version: Value[str] = Value()  # st
    d_8_r_3b_phpid: Value[str] = Value()  # st

    d_8_r_4_start_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    d_8_r_5_end_date: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt

    # d_8_r_6_indication_meddra_code
    d_8_r_6a_meddra_version_indication: Value[str] = Value()  # st
    d_8_r_6b_indication_meddra_code: Value[int] = Value()

    # d_8_r_7_reaction_meddra_code
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


# E_i_reaction_event


class E_i_reaction_event(ApiModel):
    # e_i_1_reaction_primary_source

    # e_i_1_1_reaction_primary_source_native_language
    e_i_1_1a_reaction_primary_source_native_language: Value[str] = Value()
    e_i_1_1b_reaction_primary_source_language: Value[str] = Value()  # st

    e_i_1_2_reaction_primary_source_translation: Value[str] = Value()

    # e_i_2_1_reaction_meddra_code
    e_i_2_1a_meddra_version_reaction: Value[str] = Value()  # st
    e_i_2_1b_reaction_meddra_code: Value[int] = Value()

    e_i_3_1_term_highlighted_reporter: Value[enums.E_i_3_1_term_highlighted_reporter] = Value()

    # e_i_3_2_seriousness_criteria_event_level
    e_i_3_2a_results_death: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    e_i_3_2b_life_threatening: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    e_i_3_2c_caused_prolonged_hospitalisation: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    e_i_3_2d_disabling_incapacitating: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    e_i_3_2e_congenital_anomaly_birth_defect: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()
    e_i_3_2f_other_medically_important_condition: NullableValue[t.Literal[True], t.Literal[NF.NI]] = NullableValue()

    e_i_4_date_start_reaction: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    e_i_5_date_end_reaction: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt

    # e_i_6_duration_reaction
    e_i_6a_duration_reaction_num: Value[int] = Value()
    e_i_6b_duration_reaction_unit: Value[str] = Value()  # st

    e_i_7_outcome_reaction_last_observation: Value[enums.E_i_7_outcome_reaction_last_observation] = Value()
    e_i_8_medical_confirmation_healthcare_professional: Value[bool] = Value()
    e_i_9_identification_country_reaction: Value[str] = Value()  # st


# F_r_results_tests_procedures_investigation_patient


class F_r_results_tests_procedures_investigation_patient(ApiModel):
    f_r_1_test_date: NullableValue[str, t.Literal[NF.UNK]] = NullableValue()  # dt  # dt

    # f_r_2_test_name

    f_r_2_1_test_name: Value[str] = Value()

    # f_r_2_2_test_name_meddra_code
    f_r_2_2a_meddra_version_test_name: Value[str] = Value()  # st
    f_r_2_2b_test_name_meddra_code: Value[int] = Value()

    # f_r_3_test_result
    f_r_3_1_test_result_code: Value[enums.F_r_3_1_test_result_code] = Value()
    f_r_3_2_test_result_val_qual: NullableValue[Decimal, t.Literal[NF.NINF, NF.PINF]] = NullableValue()  # TODO: check how qualifiers are used
    f_r_3_3_test_result_unit: Value[str] = Value()  # st
    f_r_3_4_result_unstructured_data: Value[str] = Value()

    f_r_4_normal_low_value: Value[str] = Value()
    f_r_5_normal_high_value: Value[str] = Value()
    f_r_6_comments: Value[str] = Value()
    f_r_7_more_information_available: Value[bool] = Value()


# G_k_drug_information


class G_k_drug_information(ApiModel):
    g_k_2_3_r_substance_id_strength: list['G_k_2_3_r_substance_id_strength'] = []
    g_k_4_r_dosage_information: list['G_k_4_r_dosage_information'] = []
    g_k_7_r_indication_use_case: list['G_k_7_r_indication_use_case'] = []
    g_k_9_i_drug_reaction_matrix: list['G_k_9_i_drug_reaction_matrix'] = []
    g_k_10_r_additional_information_drug: list['G_k_10_r_additional_information_drug'] = []

    g_k_1_characterisation_drug_role: Value[enums.G_k_1_characterisation_drug_role] = Value()

    # g_k_2_drug_identification

    # g_k_2_1_mpid_phpid
    g_k_2_1_1a_mpid_version: Value[str] = Value()  # st
    g_k_2_1_1b_mpid: Value[str] = Value()  # st
    g_k_2_1_2a_phpid_version: Value[str] = Value()  # st
    g_k_2_1_2b_phpid: Value[str] = Value()  # st

    g_k_2_2_medicinal_product_name_primary_source: Value[str] = Value()
    g_k_2_4_identification_country_drug_obtained: Value[str] = Value()  # st
    g_k_2_5_investigational_product_blinded: Value[t.Literal[True]] = Value()

    # g_k_3_holder_authorisation_application_number_drug
    g_k_3_1_authorisation_application_number: Value[str] = Value()  # st
    g_k_3_2_country_authorisation_application: Value[str] = Value()  # st
    g_k_3_3_name_holder_applicant: Value[str] = Value()

    # g_k_5_cumulative_dose_first_reaction
    g_k_5a_cumulative_dose_first_reaction_num: Value[Decimal] = Value()
    g_k_5b_cumulative_dose_first_reaction_unit: Value[str] = Value()  # st

    # g_k_6_gestation_period_exposure
    g_k_6a_gestation_period_exposure_num: Value[Decimal] = Value()
    g_k_6b_gestation_period_exposure_unit: Value[str] = Value()  # st

    g_k_8_action_taken_drug: Value[enums.G_k_8_action_taken_drug] = Value()

    g_k_11_additional_information_drug: Value[str] = Value()


class G_k_2_3_r_substance_id_strength(ApiModel):
    g_k_2_3_r_1_substance_name: Value[str] = Value()
    g_k_2_3_r_2a_substance_termid_version: Value[str] = Value()  # st
    g_k_2_3_r_2b_substance_termid: Value[str] = Value()  # st
    g_k_2_3_r_3a_strength_num: Value[Decimal] = Value()  # TODO: int or decimal?
    g_k_2_3_r_3b_strength_unit: Value[str] = Value()  # st


class G_k_4_r_dosage_information(ApiModel):
    g_k_4_r_1a_dose_num: Value[Decimal] = Value()
    g_k_4_r_1b_dose_unit: Value[str] = Value()  # st
    g_k_4_r_2_number_units_interval: Value[Decimal] = Value()
    g_k_4_r_3_definition_interval_unit: Value[str] = Value()  # st
    g_k_4_r_4_date_time_drug: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt
    g_k_4_r_5_date_time_last_administration: NullableValue[str, t.Literal[NF.MSK, NF.ASKU, NF.NASK]] = NullableValue()  # dt

    # g_k_4_r_6_duration_drug_administration
    g_k_4_r_6a_duration_drug_administration_num: Value[Decimal] = Value()
    g_k_4_r_6b_duration_drug_administration_unit: Value[str] = Value()  # st

    g_k_4_r_7_batch_lot_number: Value[str] = Value()
    g_k_4_r_8_dosage_text: Value[str] = Value()

    # g_k_4_r_9_pharmaceutical_dose_form

    g_k_4_r_9_1_pharmaceutical_dose_form: NullableValue[str, t.Literal[NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    g_k_4_r_9_2a_pharmaceutical_dose_form_termid_version: Value[str] = Value()  # st
    g_k_4_r_9_2b_pharmaceutical_dose_form_termid: Value[str] = Value()  # st

    # g_k_4_r_10_route_administration
    g_k_4_r_10_1_route_administration: NullableValue[str, t.Literal[NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    g_k_4_r_10_2a_route_administration_termid_version: Value[str] = Value()  # st
    g_k_4_r_10_2b_route_administration_termid: Value[str] = Value()  # st

    # g_k_4_r_11_parent_route_administration
    g_k_4_r_11_1_parent_route_administration: NullableValue[str, t.Literal[NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()
    g_k_4_r_11_2a_parent_route_administration_termid_version: Value[str] = Value()  # st
    g_k_4_r_11_2b_parent_route_administration_termid: Value[str] = Value()  # st


class G_k_7_r_indication_use_case(ApiModel):
    g_k_7_r_1_indication_primary_source: NullableValue[str, t.Literal[NF.ASKU, NF.NASK, NF.UNK]] = NullableValue()

    # g_k_7_r_2_indication_meddra_code
    g_k_7_r_2a_meddra_version_indication: Value[str] = Value()  # st
    g_k_7_r_2b_indication_meddra_code: Value[int] = Value()


class G_k_9_i_drug_reaction_matrix(ApiModel):
    g_k_9_i_2_r_assessment_relatedness_drug_reaction: list['G_k_9_i_2_r_assessment_relatedness_drug_reaction'] = []

    # This field stores id of related reaction
    # TODO: workaround is needed as new entities do not have ids yet
    g_k_9_i_1_reaction_assessed: int | None = None

    # g_k_9_i_3_interval_drug_administration_reaction
    g_k_9_i_3_1a_interval_drug_administration_reaction_num: Value[Decimal] = Value()
    g_k_9_i_3_1b_interval_drug_administration_reaction_unit: Value[str] = Value()  # st
    g_k_9_i_3_2a_interval_last_dose_drug_reaction_num: Value[Decimal] = Value()
    g_k_9_i_3_2b_interval_last_dose_drug_reaction_unit: Value[str] = Value()  # st

    g_k_9_i_4_reaction_recur_readministration: Value[enums.G_k_9_i_4_reaction_recur_readministration] = Value()


class G_k_9_i_2_r_assessment_relatedness_drug_reaction(ApiModel):
    g_k_9_i_2_r_1_source_assessment: Value[str] = Value()
    g_k_9_i_2_r_2_method_assessment: Value[str] = Value()
    g_k_9_i_2_r_3_result_assessment: Value[str] = Value()


class G_k_10_r_additional_information_drug(ApiModel):
    g_k_10_r_additional_information_drug: Value[enums.G_k_10_r_additional_information_drug] = Value()


# H_narrative_case_summary


class H_narrative_case_summary(ApiModel):
    h_3_r_sender_diagnosis_meddra_code: list['H_3_r_sender_diagnosis_meddra_code'] = []
    h_5_r_case_summary_reporter_comments_native_language: list['H_5_r_case_summary_reporter_comments_native_language'] = []

    h_1_case_narrative: Value[str] = Value()
    h_2_reporter_comments: Value[str] = Value()

    h_4_sender_comments: Value[str] = Value()


class H_3_r_sender_diagnosis_meddra_code(ApiModel):
    h_3_r_1a_meddra_version_sender_diagnosis: Value[str] = Value()  # st
    h_3_r_1b_sender_diagnosis_meddra_code: Value[int] = Value()


class H_5_r_case_summary_reporter_comments_native_language(ApiModel):
    h_5_r_1a_case_summary_reporter_comments_text: Value[str] = Value()
    h_5_r_1b_case_summary_reporter_comments_language: Value[str] = Value()  # st
