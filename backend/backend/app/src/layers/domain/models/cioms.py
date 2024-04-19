from pydantic import BaseModel

from app.src.enums import C_2_r_4_qualification, C_1_3_type_report, G_k_1_characterisation_drug_role


def parse_date_from_str(date_str):
    year = date_str[:4] if len(date_str) >= 4 else None
    month = date_str[4:6] if len(date_str) >= 6 else None
    day = date_str[6:8] if len(date_str) >= 8 else None

    return day, month, year


class CIOMS(BaseModel):
    f1_patient_initials: str | None

    f1a_country: str | None

    f2_date_of_birth_day: str | None
    f2_date_of_birth_month: str | None
    f2_date_of_birth_year: str | None

    f2a_age: str | None

    f3_sex: str | None

    f4_reaction_onset_day: str | None
    f5_reaction_onset_month: str | None
    f6_reaction_onset_year: str | None

    f7_describe_reactions: list[str] = []

    f8_patient_died: bool = False
    f9_prolonged_hospitalization: bool = False
    f10_disability_or_incapacity: bool = False
    f11_life_threatening: bool = False
    f12_other: bool = False

    f13_describe_reactions_test_lab_data: list[str] = []

    f14_suspect_drugs: list[str] = []
    f15_daily_doses: list[str] = []
    f16_routes_of_administration: list[str] = []
    f17_indications_for_use: list[str] = []

    f18_therapy_dates_from: str | None
    f18_therapy_dates_to: str | None
    f19_therapy_duration: str | None

    f20_did_reaction_abate_after_stopping_drug: bool | None
    f21_did_reaction_reappear_after_reintroduction: bool | None

    f22_concomitant_drugs_and_dates_of_administration: list[str] = []
    f23_other_relevant_history: str

    f24a_name_and_address_of_manufacturer: str
    f24b_MFR_control_no: str

    f24c_date_received_by_manufacturer: str

    f24d_report_source_study: bool = False
    f24d_report_source_literature: bool = False
    f24d_report_source_health_professional: bool = False

    f25a_report_type: bool

    date_of_this_report: str

    @classmethod
    def from_icsr(cls, icsr):
        primary_reaction_event = icsr.get_primary_reaction_event()

        date_of_birth_day, date_of_birth_month, date_of_birth_year \
            = parse_date_from_str(icsr.d_patient_characteristics.d_2_1_date_birth)

        reaction_onset_day, reaction_onset_month, reaction_onset_year \
            = parse_date_from_str(primary_reaction_event.e_i_4_date_start_reaction)

        patient_died = False
        prolonged_hospitalization = False
        disability_or_incapacity = False
        life_threatening = False
        other = False

        describe_reactions = []

        for reaction_event in icsr.e_i_reaction_event:
            patient_died |= reaction_event.e_i_3_2a_results_death
            prolonged_hospitalization |= reaction_event.e_i_3_2c_caused_prolonged_hospitalisation
            disability_or_incapacity |= reaction_event.e_i_3_2d_disabling_incapacitating
            life_threatening |= reaction_event.e_i_3_2b_life_threatening
            other |= (reaction_event.e_i_3_2e_congenital_anomaly_birth_defect |
                      reaction_event.e_i_3_2f_other_medically_important_condition)
            describe_reactions.append(
                f"{reaction_event.e_i_1_1a_reaction_primary_source_native_language} "
                f"({reaction_event.e_i_1_1b_reaction_primary_source_language})\n"
                f"{reaction_event.e_i_7_outcome_reaction_last_observation.name}"
            )

        suspect_drugs = []
        for drug_information in icsr.g_k_drug_information:
            drug_id = drug_information.get_id()

            if drug_information.g_k_1_characterisation_drug_role == G_k_1_characterisation_drug_role.SUSPECT:
                describe_reactions.append(
                    f"{drug_id} - {drug_information.g_k_8_action_taken_drug.name}")

                for dosage_information in drug_information.g_k_4_r_dosage_information:
                    suspect_drugs.append(f"{drug_id} - {dosage_information.g_k_4_r_7_batch_lot_number}")

        describe_reactions.append(f"Case Narrative: {icsr.h_narrative_case_summary.h_1_case_narrative}")

        date_received_by_manufacturer_day, date_received_by_manufacturer_month, date_received_by_manufacturer_year = \
            parse_date_from_str(icsr.c_1_identification_case_safety_report.c_1_5_date_most_recent_information)
        date_received_by_manufacturer = f"{date_received_by_manufacturer_year}-{date_received_by_manufacturer_month}-{date_received_by_manufacturer_day}"

        date_of_this_report_day, date_of_this_report_month, date_of_this_report_year = \
            parse_date_from_str(icsr.c_1_identification_case_safety_report.c_1_2_date_creation)
        date_of_this_report = f"{date_of_this_report_year}-{date_of_this_report_month}-{date_of_this_report_day}"

        return cls(
            f1_patient_initials=icsr.d_patient_characteristics.d_1_patient,
            f1a_country=primary_reaction_event.e_i_9_identification_country_reaction,

            f2_date_of_birth_day=date_of_birth_day,
            f2_date_of_birth_month=date_of_birth_month,
            f2_date_of_birth_year=date_of_birth_year,
            f2a_age=f"{icsr.d_patient_characteristics.d_2_2a_age_onset_reaction_num} "
                    f"{icsr.d_patient_characteristics.d_2_2b_age_onset_reaction_unit}",

            f3_sex=icsr.d_patient_characteristics.d_5_sex.name,

            f4_reaction_onset_day=reaction_onset_day,
            f5_reaction_onset_month=reaction_onset_month,
            f6_reaction_onset_year=reaction_onset_year,

            f7_describe_reactions=describe_reactions,

            f8_patient_died=patient_died,
            f9_prolonged_hospitalization=prolonged_hospitalization,
            f10_disability_or_incapacity=disability_or_incapacity,
            f11_life_threatening=life_threatening,
            f12_other=other,

            f13_describe_reactions_test_lab_data=[result.f_r_3_4_result_unstructured_data for result in
                                                  icsr.f_r_results_tests_procedures_investigation_patient],
            f14_suspect_drugs=suspect_drugs,

            f23_other_relevant_history=icsr.d_patient_characteristics.d_7_2_text_medical_history,

            f24b_MFR_control_no=icsr.c_1_identification_case_safety_report.c_1_8_1_worldwide_unique_case_identification_number,

            f24c_date_received_by_manufacturer=date_received_by_manufacturer,

            f24d_report_source_study=icsr.c_1_identification_case_safety_report.c_1_3_type_report == C_1_3_type_report.REPORT_FROM_STUDY,
            f24d_report_source_literature=bool(icsr.c_4_r_literature_reference),
            f24d_report_source_health_professional=any(
                source.c_2_r_4_qualification == C_2_r_4_qualification.PHYSICIAN |
                source.c_2_r_4_qualification == C_2_r_4_qualification.PHARMACIST |
                source.c_2_r_4_qualification == C_2_r_4_qualification.OTHER_HEALTH_PROFESSIONAL
                for source in icsr.c_2_r_primary_source_information
            ),

            f25a_report_type=icsr.is_initial(),

            date_of_this_report=date_of_this_report
        )
