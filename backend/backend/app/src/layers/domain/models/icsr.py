from decimal import Decimal
import typing as t
from typing import Literal as L
from uuid import UUID

from app.src import enums as e
from app.src.enums import NullFlavor as NF
from app.src.hl7date import DatePrecision as P
from app.src.layers.domain.models.field_types import (
    Datetime as DT,
    AlphaNumeric as AN,
    Alpha as A
)
from extensions import pydantic as pde


class DomainModel(pde.PostValidatableModel, pde.SafeValidatableModel):
    BUSINESS_VALIDATION_FLAG_KEY: t.ClassVar = '_is_business_validation'

    id: int | None = None

    def model_business_validate(self, initial_data: dict[str, t.Any] | None = None) -> t.Self:
        return self.model_safe_validate(initial_data, context={self.BUSINESS_VALIDATION_FLAG_KEY: True})


class ICSR(DomainModel):
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

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor) -> None:
        processor.try_validate_fields(
            validate=cls._validate_uuids,
            is_add_error_manually=True
        )

    @staticmethod
    def _validate_uuids(
            processor: pde.PostValidationProcessor,
            e_i_reaction_event: list['E_i_reaction_event'],
            g_k_drug_information: list['G_k_drug_information']
    ) -> bool:
        is_valid = True

        reaction_ids = set()
        for reaction in e_i_reaction_event:
            if reaction.id:
                reaction_ids.add(reaction.id)
            if reaction.uuid:
                reaction_ids.add(reaction.uuid)

        for k, drug in enumerate(g_k_drug_information):
            for i, link in enumerate(drug.g_k_9_i_drug_reaction_matrix):
                reaction_id = link.g_k_9_i_1_reaction_assessed

                if reaction_id in reaction_ids:
                    continue

                processor.add_error(
                    type=pde.CustomErrorType.PARSING,
                    message='Technical id was not found among possible related entities',
                    loc=('g_k_drug_information', k, 'g_k_9_i_drug_reaction_matrix', i, 'g_k_9_i_1_reaction_assessed'),
                    input=reaction_id
                )
                is_valid = False

        return is_valid

    def get_primary_reaction_event(self) -> 'E_i_reaction_event':
        return self.e_i_reaction_event[0]

    def is_initial(self) -> bool:
        return (self.c_1_identification_case_safety_report.c_1_8_1_worldwide_unique_case_identification_number ==
                self.c_1_identification_case_safety_report.c_1_1_sender_safety_report_unique_id)


# C_1_identification_case_safety_report


class C_1_identification_case_safety_report(DomainModel):
    c_1_6_1_r_documents_held_sender: list['C_1_6_1_r_documents_held_sender'] = []
    c_1_9_1_r_source_case_id: list['C_1_9_1_r_source_case_id'] = []
    c_1_10_r_identification_number_report_linked: list['C_1_10_r_identification_number_report_linked'] = []

    c_1_1_sender_safety_report_unique_id: AN[L[100]] | None = None
    c_1_2_date_creation: DT[L[P.SECOND]] | None = None
    c_1_3_type_report: e.C_1_3_type_report | None = None
    c_1_4_date_report_first_received_source: DT[L[P.DAY]] | None = None
    c_1_5_date_most_recent_information: DT[L[P.DAY]] | None = None

    # c_1_6_additional_available_documents_held_sender
    c_1_6_1_additional_documents_available: bool | None = None

    c_1_7_fulfil_local_criteria_expedited_report: bool | L[NF.NI] | None = None

    # c_1_8_worldwide_unique_case_identification
    c_1_8_1_worldwide_unique_case_identification_number: AN[L[100]] | None = None
    c_1_8_2_first_sender: e.C_1_8_2_first_sender | None = None

    # c_1_9_other_case_ids
    c_1_9_1_other_case_ids_previous_transmissions: L[True] | L[NF.NI] | None = None

    # c_1_11_report_nullification_amendment
    c_1_11_1_report_nullification_amendment: e.C_1_11_1_report_nullification_amendment | None = None
    c_1_11_2_reason_nullification_amendment: AN[L[2000]] | None = None


class C_1_6_1_r_documents_held_sender(DomainModel):
    c_1_6_1_r_1_documents_held_sender: AN[L[2000]] | None = None
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(DomainModel):
    c_1_9_1_r_1_source_case_id: AN[L[100]] | None = None
    c_1_9_1_r_2_case_id: AN[L[100]] | None = None


class C_1_10_r_identification_number_report_linked(DomainModel):
    c_1_10_r_identification_number_report_linked: AN[L[100]] | None = None


# C_2_r_primary_source_information


class C_2_r_primary_source_information(DomainModel):
    # c_2_r_1_reporter_name
    c_2_r_1_1_reporter_title: AN[L[50]] | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    c_2_r_1_2_reporter_given_name: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_1_3_reporter_middle_name: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_1_4_reporter_family_name: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # c_2_r_2_reporter_address_telephone
    c_2_r_2_1_reporter_organisation: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_2_reporter_department: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_3_reporter_street: AN[L[100]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_4_reporter_city: AN[L[35]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_5_reporter_state_province: AN[L[40]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_6_reporter_postcode: AN[L[15]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    c_2_r_2_7_reporter_telephone: AN[L[33]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    c_2_r_3_reporter_country_code: A[L[2]] | None = None  # st
    c_2_r_4_qualification: e.C_2_r_4_qualification | L[NF.UNK] | None = None
    c_2_r_5_primary_source_regulatory_purposes: e.C_2_r_5_primary_source_regulatory_purposes | None = None


# C_3_information_sender_case_safety_report


class C_3_information_sender_case_safety_report(DomainModel):
    c_3_1_sender_type: e.C_3_1_sender_type | None = None
    c_3_2_sender_organisation: AN[L[100]] | None = None

    # c_3_3_person_responsible_sending_report
    c_3_3_1_sender_department: AN[L[60]] | None = None
    c_3_3_2_sender_title: AN[L[50]] | None = None
    c_3_3_3_sender_given_name: AN[L[60]] | None = None
    c_3_3_4_sender_middle_name: AN[L[60]] | None = None
    c_3_3_5_sender_family_name: AN[L[60]] | None = None

    # c_3_4_sender_address_fax_telephone_email
    c_3_4_1_sender_street_address: AN[L[100]] | None = None
    c_3_4_2_sender_city: AN[L[35]] | None = None
    c_3_4_3_sender_state_province: AN[L[40]] | None = None
    c_3_4_4_sender_postcode: AN[L[15]] | None = None
    c_3_4_5_sender_country_code: AN[L[2]] | None = None  # st
    c_3_4_6_sender_telephone: AN[L[33]] | None = None
    c_3_4_7_sender_fax: AN[L[33]] | None = None
    c_3_4_8_sender_email: AN[L[100]] | None = None


# C_4_r_literature_reference


class C_4_r_literature_reference(DomainModel):
    c_4_r_1_literature_reference: AN[L[500]] | L[NF.ASKU, NF.NASK] | None = None
    # file: c_4_r_2_included_documents


# C_5_study_identification

class C_5_study_identification(DomainModel):
    c_5_1_r_study_registration: list['C_5_1_r_study_registration'] = []

    c_5_2_study_name: AN[L[2000]] | L[NF.ASKU, NF.NASK] | None = None
    c_5_3_sponsor_study_number: AN[L[50]] | L[NF.ASKU, NF.NASK] | None = None
    c_5_4_study_type_reaction: e.C_5_4_study_type_reaction | None = None


class C_5_1_r_study_registration(DomainModel):
    c_5_1_r_1_study_registration_number: AN[L[50]] | L[NF.ASKU, NF.NASK] | None = None
    c_5_1_r_2_study_registration_country: A[L[2]] | L[NF.ASKU, NF.NASK] | None = None  # st


# D_patient_characteristics


class D_patient_characteristics(DomainModel):
    d_7_1_r_structured_information_medical_history: list['D_7_1_r_structured_information_medical_history'] = []
    d_8_r_past_drug_history: list['D_8_r_past_drug_history'] = []
    d_9_2_r_cause_death: list['D_9_2_r_cause_death'] = []
    d_9_4_r_autopsy_determined_cause_death: list['D_9_4_r_autopsy_determined_cause_death'] = []
    d_10_7_1_r_structured_information_parent_meddra_code: list['D_10_7_1_r_structured_information_parent_meddra_code'] = []
    d_10_8_r_past_drug_history_parent: list['D_10_8_r_past_drug_history_parent'] = []

    d_1_patient: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None

    # d_1_1_medical_record_number_source
    d_1_1_1_medical_record_number_source_gp: AN[L[20]] | L[NF.MSK] | None = None
    d_1_1_2_medical_record_number_source_specialist: AN[L[20]] | L[NF.MSK] | None = None
    d_1_1_3_medical_record_number_source_hospital: AN[L[20]] | L[NF.MSK] | None = None
    d_1_1_4_medical_record_number_source_investigation: AN[L[20]] | L[NF.MSK] | None = None

    # d_2_age_information

    d_2_1_date_birth: DT[L[P.DAY]] | L[NF.MSK] | None = None

    # d_2_2_age_onset_reaction

    d_2_2a_age_onset_reaction_num: int | None = None
    d_2_2b_age_onset_reaction_unit: AN[L[50]] | None = None  # st

    # d_2_2_1_gestation_period_reaction_foetus
    d_2_2_1a_gestation_period_reaction_foetus_num: int | None = None
    d_2_2_1b_gestation_period_reaction_foetus_unit: AN[L[50]] | None = None  # st

    d_2_3_patient_age_group: e.D_2_3_patient_age_group | None = None

    d_3_body_weight: Decimal | None = None
    d_4_height: int | None = None
    d_5_sex: e.D_5_sex | L[NF.MSK, NF.UNK, NF.ASKU, NF.NASK] | None = None
    d_6_last_menstrual_period_date: DT[L[P.YEAR]] | None = None

    # d_7_medical_history
    d_7_2_text_medical_history: AN[L[10000]] | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_7_3_concomitant_therapies: L[True] | None = None

    # d_9_case_death
    d_9_1_date_death: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_9_3_autopsy: bool | L[NF.ASKU, NF.NASK, NF.UNK] | None = None

    # d_10_information_concerning_parent

    d_10_1_parent_identification: AN[L[60]] | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None

    # d_10_2_parent_age_information

    d_10_2_1_date_birth_parent: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # d_10_2_2_age_parent
    d_10_2_2a_age_parent_num: int | None = None
    d_10_2_2b_age_parent_unit: AN[L[50]] | None = None  # st

    d_10_3_last_menstrual_period_date_parent: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_10_4_body_weight_parent: Decimal | None = None
    d_10_5_height_parent: int | None = None
    d_10_6_sex_parent: e.D_10_6_sex_parent | L[NF.UNK, NF.MSK, NF.ASKU, NF.NASK] | None = None

    # d_10_7_medical_history_parent
    d_10_7_2_text_medical_history_parent: AN[L[10000]] | None = None


class D_7_1_r_structured_information_medical_history(DomainModel):
    d_7_1_r_1a_meddra_version_medical_history: AN[L[4]] | None = None  # st
    d_7_1_r_1b_medical_history_meddra_code: int | None = None
    d_7_1_r_2_start_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_7_1_r_3_continuing: bool | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_7_1_r_4_end_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_7_1_r_5_comments: AN[L[2000]] | None = None
    d_7_1_r_6_family_history: L[True] | None = None


class D_8_r_past_drug_history(DomainModel):
    d_8_r_1_name_drug: AN[L[250]] | L[NF.UNK, NF.NA] | None = None

    # d_8_r_2_mpid
    d_8_r_2a_mpid_version: AN[L[10]] | None = None  # st
    d_8_r_2b_mpid: AN[L[1000]] | None = None  # st

    # d_8_r_3_phpid
    d_8_r_3a_phpid_version: AN[L[10]] | None = None  # st
    d_8_r_3b_phpid: AN[L[250]] | None = None  # st

    d_8_r_4_start_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_8_r_5_end_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # d_8_r_6_indication_meddra_code
    d_8_r_6a_meddra_version_indication: AN[L[4]] | None = None  # st
    d_8_r_6b_indication_meddra_code: int | None = None

    # d_8_r_7_reaction_meddra_code
    d_8_r_7a_meddra_version_reaction: AN[L[4]] | None = None  # st
    d_8_r_7b_reaction_meddra_code: int | None = None


class D_9_2_r_cause_death(DomainModel):
    d_9_2_r_1a_meddra_version_cause_death: AN[L[4]] | None = None  # st
    d_9_2_r_1b_cause_death_meddra_code: int | None = None
    d_9_2_r_2_cause_death: AN[L[250]] | None = None


class D_9_4_r_autopsy_determined_cause_death(DomainModel):
    d_9_4_r_1a_meddra_version_autopsy_determined_cause_death: AN[L[4]] | None = None  # st
    d_9_4_r_1b_autopsy_determined_cause_death_meddra_code: int | None = None
    d_9_4_r_2_autopsy_determined_cause_death: AN[L[250]] | None = None


class D_10_7_1_r_structured_information_parent_meddra_code(DomainModel):
    d_10_7_1_r_1a_meddra_version_medical_history: AN[L[4]] | None = None  # st
    d_10_7_1_r_1b_medical_history_meddra_code: int | None = None
    d_10_7_1_r_2_start_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_10_7_1_r_3_continuing: bool | L[NF.MSK, NF.ASKU, NF.NASK, NF.UNK] | None = None
    d_10_7_1_r_4_end_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_10_7_1_r_5_comments: AN[L[2000]] | None = None


class D_10_8_r_past_drug_history_parent(DomainModel):
    d_10_8_r_1_name_drug: AN[L[250]] | None = None

    # d_10_8_r_2_mpid
    d_10_8_r_2a_mpid_version: AN[L[10]] | None = None  # st
    d_10_8_r_2b_mpid: AN[L[1000]] | None = None  # st

    # d_10_8_r_3_phpid
    d_10_8_r_3a_phpid_version: AN[L[10]] | None = None  # st
    d_10_8_r_3b_phpid: AN[L[250]] | None = None  # st

    d_10_8_r_4_start_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    d_10_8_r_5_end_date: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # d_10_8_r_6_indication_meddra_code
    d_10_8_r_6a_meddra_version_indication: AN[L[4]] | None = None  # st
    d_10_8_r_6b_indication_meddra_code: int | None = None

    # d_10_8_r_7_reactions_meddra_code
    d_10_8_r_7a_meddra_version_reaction: AN[L[4]] | None = None  # st
    d_10_8_r_7b_reactions_meddra_code: int | None = None


# E_i_reaction_event


class E_i_reaction_event(DomainModel):
    uuid: UUID | None = None

    # e_i_1_reaction_primary_source

    # e_i_1_1_reaction_primary_source_native_language
    e_i_1_1a_reaction_primary_source_native_language: AN[L[250]] | None = None
    e_i_1_1b_reaction_primary_source_language: A[L[3]] | None = None  # st

    e_i_1_2_reaction_primary_source_translation: AN[L[250]] | None = None

    # e_i_2_1_reaction_meddra_code
    e_i_2_1a_meddra_version_reaction: AN[L[4]] | None = None  # st
    e_i_2_1b_reaction_meddra_code: int | None = None

    e_i_3_1_term_highlighted_reporter: e.E_i_3_1_term_highlighted_reporter | None = None

    # e_i_3_2_seriousness_criteria_event_level
    e_i_3_2a_results_death: L[True] | L[NF.NI] | None = None
    e_i_3_2b_life_threatening: L[True] | L[NF.NI] | None = None
    e_i_3_2c_caused_prolonged_hospitalisation: L[True] | L[NF.NI] | None = None
    e_i_3_2d_disabling_incapacitating: L[True] | L[NF.NI] | None = None
    e_i_3_2e_congenital_anomaly_birth_defect: L[True] | L[NF.NI] | None = None
    e_i_3_2f_other_medically_important_condition: L[True] | L[NF.NI] | None = None

    e_i_4_date_start_reaction: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    e_i_5_date_end_reaction: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # e_i_6_duration_reaction
    e_i_6a_duration_reaction_num: int | None = None
    e_i_6b_duration_reaction_unit: AN[L[50]] | None = None  # st

    e_i_7_outcome_reaction_last_observation: e.E_i_7_outcome_reaction_last_observation | None = None
    e_i_8_medical_confirmation_healthcare_professional: bool | None = None
    e_i_9_identification_country_reaction: A[L[2]] | None = None  # st

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor) -> None:
        processor.try_validate_fields(
            error_message='Both id and uuid cannot be specified',
            is_add_single_error=True,
            validate=lambda id, uuid:
            id is None or uuid is None
        )


# F_r_results_tests_procedures_investigation_patient


class F_r_results_tests_procedures_investigation_patient(DomainModel):
    f_r_1_test_date: DT[L[P.YEAR]] | L[NF.UNK] | None = None

    # f_r_2_test_name

    f_r_2_1_test_name: AN[L[250]] | None = None

    # f_r_2_2_test_name_meddra_code
    f_r_2_2a_meddra_version_test_name: AN[L[4]] | None = None  # st
    f_r_2_2b_test_name_meddra_code: int | None = None

    # f_r_3_test_result
    f_r_3_1_test_result_code: e.F_r_3_1_test_result_code | None = None
    f_r_3_2_test_result_val_qual: Decimal | L[NF.NINF, NF.PINF] | None = None  # TODO: check how qualifiers are used
    f_r_3_3_test_result_unit: AN[L[50]] | None = None  # st
    f_r_3_4_result_unstructured_data: AN[L[2000]] | None = None

    f_r_4_normal_low_value: AN[L[50]] | None = None
    f_r_5_normal_high_value: AN[L[50]] | None = None
    f_r_6_comments: AN[L[2000]] | None = None
    f_r_7_more_information_available: bool | None = None


# G_k_drug_information


class G_k_drug_information(DomainModel):
    g_k_2_3_r_substance_id_strength: list['G_k_2_3_r_substance_id_strength'] = []
    g_k_4_r_dosage_information: list['G_k_4_r_dosage_information'] = []
    g_k_7_r_indication_use_case: list['G_k_7_r_indication_use_case'] = []
    g_k_9_i_drug_reaction_matrix: list['G_k_9_i_drug_reaction_matrix'] = []
    g_k_10_r_additional_information_drug: list['G_k_10_r_additional_information_drug'] = []

    g_k_1_characterisation_drug_role: e.G_k_1_characterisation_drug_role | None = None

    # g_k_2_drug_identification

    # g_k_2_1_mpid_phpid
    g_k_2_1_1a_mpid_version: AN[L[10]] | None = None  # st
    g_k_2_1_1b_mpid: AN[L[1000]] | None = None  # st
    g_k_2_1_2a_phpid_version: AN[L[10]] | None = None  # st
    g_k_2_1_2b_phpid: AN[L[250]] | None = None  # st

    g_k_2_2_medicinal_product_name_primary_source: AN[L[250]] | None = None
    g_k_2_4_identification_country_drug_obtained: A[L[2]] | None = None  # st
    g_k_2_5_investigational_product_blinded: L[True] | None = None

    # g_k_3_holder_authorisation_application_number_drug
    g_k_3_1_authorisation_application_number: AN[L[35]] | None = None  # st
    g_k_3_2_country_authorisation_application: A[L[2]] | None = None  # st
    g_k_3_3_name_holder_applicant: AN[L[60]] | None = None

    # g_k_5_cumulative_dose_first_reaction
    g_k_5a_cumulative_dose_first_reaction_num: Decimal | None = None
    g_k_5b_cumulative_dose_first_reaction_unit: AN[L[50]] | None = None  # st

    # g_k_6_gestation_period_exposure
    g_k_6a_gestation_period_exposure_num: Decimal | None = None
    g_k_6b_gestation_period_exposure_unit: AN[L[50]] | None = None  # st

    g_k_8_action_taken_drug: e.G_k_8_action_taken_drug | None = None

    g_k_11_additional_information_drug: AN[L[2000]] | None = None

    @classmethod
    def _post_validate(cls, processor: pde.PostValidationProcessor):
        processor.try_validate_fields(
            error_message='Cannot have duplicate drug to reaction relations',
            validate=lambda g_k_9_i_drug_reaction_matrix:
            len(g_k_9_i_drug_reaction_matrix) ==
            len(set(x.g_k_9_i_1_reaction_assessed for x in g_k_9_i_drug_reaction_matrix))
        )

    def get_id(self) -> str:
        return self.g_k_2_1_1b_mpid or self.g_k_2_1_2b_phpid


class G_k_2_3_r_substance_id_strength(DomainModel):
    g_k_2_3_r_1_substance_name: AN[L[250]] | None = None
    g_k_2_3_r_2a_substance_termid_version: AN[L[10]] | None = None  # st
    g_k_2_3_r_2b_substance_termid: AN[L[100]] | None = None  # st
    g_k_2_3_r_3a_strength_num: Decimal | None = None  # TODO: int or decimal?
    g_k_2_3_r_3b_strength_unit: AN[L[50]] | None = None  # st


class G_k_4_r_dosage_information(DomainModel):
    g_k_4_r_1a_dose_num: Decimal | None = None
    g_k_4_r_1b_dose_unit: AN[L[50]] | None = None  # st
    g_k_4_r_2_number_units_interval: Decimal | None = None
    g_k_4_r_3_definition_interval_unit: AN[L[50]] | None = None  # st
    g_k_4_r_4_date_time_drug: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None
    g_k_4_r_5_date_time_last_administration: DT[L[P.YEAR]] | L[NF.MSK, NF.ASKU, NF.NASK] | None = None

    # g_k_4_r_6_duration_drug_administration
    g_k_4_r_6a_duration_drug_administration_num: Decimal | None = None
    g_k_4_r_6b_duration_drug_administration_unit: AN[L[50]] | None = None  # st

    g_k_4_r_7_batch_lot_number: AN[L[35]] | None = None
    g_k_4_r_8_dosage_text: AN[L[2000]] | None = None

    # g_k_4_r_9_pharmaceutical_dose_form

    g_k_4_r_9_1_pharmaceutical_dose_form: AN[L[60]] | L[NF.ASKU, NF.NASK, NF.UNK] | None = None
    g_k_4_r_9_2a_pharmaceutical_dose_form_termid_version: AN[L[10]] | None = None  # st
    g_k_4_r_9_2b_pharmaceutical_dose_form_termid: AN[L[100]] | None = None  # st

    # g_k_4_r_10_route_administration
    g_k_4_r_10_1_route_administration: AN[L[60]] | L[NF.ASKU, NF.NASK, NF.UNK] | None = None
    g_k_4_r_10_2a_route_administration_termid_version: AN[L[10]] | None = None  # st
    g_k_4_r_10_2b_route_administration_termid: AN[L[100]] | None = None  # st

    # g_k_4_r_11_parent_route_administration
    g_k_4_r_11_1_parent_route_administration: AN[L[60]] | L[NF.ASKU, NF.NASK, NF.UNK] | None = None
    g_k_4_r_11_2a_parent_route_administration_termid_version: AN[L[10]] | None = None  # st
    g_k_4_r_11_2b_parent_route_administration_termid: AN[L[100]] | None = None  # st


class G_k_7_r_indication_use_case(DomainModel):
    g_k_7_r_1_indication_primary_source: AN[L[250]] | L[NF.ASKU, NF.NASK, NF.UNK] | None = None

    # g_k_7_r_2_indication_meddra_code
    g_k_7_r_2a_meddra_version_indication: AN[L[4]] | None = None  # st
    g_k_7_r_2b_indication_meddra_code: int | None = None


class G_k_9_i_drug_reaction_matrix(DomainModel):
    g_k_9_i_2_r_assessment_relatedness_drug_reaction: list['G_k_9_i_2_r_assessment_relatedness_drug_reaction'] = []

    # This field stores id of related reaction
    g_k_9_i_1_reaction_assessed: int | UUID

    # g_k_9_i_3_interval_drug_administration_reaction
    g_k_9_i_3_1a_interval_drug_administration_reaction_num: Decimal | None = None
    g_k_9_i_3_1b_interval_drug_administration_reaction_unit: AN[L[50]] | None = None  # st
    g_k_9_i_3_2a_interval_last_dose_drug_reaction_num: Decimal | None = None
    g_k_9_i_3_2b_interval_last_dose_drug_reaction_unit: AN[L[50]] | None = None  # st

    g_k_9_i_4_reaction_recur_readministration: e.G_k_9_i_4_reaction_recur_readministration | None = None


class G_k_9_i_2_r_assessment_relatedness_drug_reaction(DomainModel):
    g_k_9_i_2_r_1_source_assessment: AN[L[60]] | None = None
    g_k_9_i_2_r_2_method_assessment: AN[L[60]] | None = None
    g_k_9_i_2_r_3_result_assessment: AN[L[60]] | None = None


class G_k_10_r_additional_information_drug(DomainModel):
    g_k_10_r_additional_information_drug: e.G_k_10_r_additional_information_drug | None = None


# H_narrative_case_summary


class H_narrative_case_summary(DomainModel):
    h_3_r_sender_diagnosis_meddra_code: list['H_3_r_sender_diagnosis_meddra_code'] = []
    h_5_r_case_summary_reporter_comments_native_language: list['H_5_r_case_summary_reporter_comments_native_language'] = []

    h_1_case_narrative: AN[L[100000]] | None = None
    h_2_reporter_comments: AN[L[20000]] | None = None

    h_4_sender_comments: AN[L[20000]] | None = None


class H_3_r_sender_diagnosis_meddra_code(DomainModel):
    h_3_r_1a_meddra_version_sender_diagnosis: AN[L[4]] | None = None  # st
    h_3_r_1b_sender_diagnosis_meddra_code: int | None = None


class H_5_r_case_summary_reporter_comments_native_language(DomainModel):
    h_5_r_1a_case_summary_reporter_comments_text: AN[L[100000]] | None = None
    h_5_r_1b_case_summary_reporter_comments_language: A[L[3]] | None = None  # st
