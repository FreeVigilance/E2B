from typing import Any

from pydantic import BaseModel

from app.src.enums import C_2_r_4_qualification, C_1_3_type_report, G_k_1_characterisation_drug_role, \
    G_k_8_action_taken_drug, E_i_7_outcome_reaction_last_observation, D_2_2b_age_onset_reaction_unit, D_5_sex, \
    G_k_4_r_6b_duration_drug_administration_unit, G_k_9_i_4_reaction_recur_readministration
import enum


class YesNoNA(enum.StrEnum):
    YES = "Y"
    NO = "N"
    NA = "NA"


def parse_date(date_str: str | None):
    if not date_str:
        return None, None, None

    year = date_str[:4] if len(date_str) >= 4 else None
    month = date_str[4:6] if len(date_str) >= 6 else None
    day = date_str[6:8] if len(date_str) >= 8 else None

    return day, month, year


def get_age(num: int | None, unit: str | None):
    if num and unit:
        return f"{num} {D_2_2b_age_onset_reaction_unit(unit).name.lower()}s"


def get_outcome(outcome: E_i_7_outcome_reaction_last_observation | None):
    if outcome:
        return E_i_7_outcome_reaction_last_observation(outcome).name.replace('_OR_', '/').replace("_", " ").title()


def get_action_taken_drug(action_taken: G_k_8_action_taken_drug | None):
    if action_taken:
        return G_k_8_action_taken_drug(action_taken).name.replace("_", " ").title()


def get_sex(sex: D_5_sex | None):
    if sex:
        return D_5_sex(sex).name[0]


def get_reaction_abate_after_stopping_drug(action_taken: G_k_8_action_taken_drug | None,
                                           outcome: E_i_7_outcome_reaction_last_observation | None):
    if action_taken in {G_k_8_action_taken_drug.DRUG_WITHDRAWN, G_k_8_action_taken_drug.DOSE_REDUCED}:
        if outcome in {E_i_7_outcome_reaction_last_observation.RECOVERED_OR_RESOLVED,
                       E_i_7_outcome_reaction_last_observation.RECOVERING_OR_RESOLVING,
                       E_i_7_outcome_reaction_last_observation.RECOVERED_OR_RESOLVED_WITH_SEQUELAE}:
            return YesNoNA.YES
        elif outcome in {E_i_7_outcome_reaction_last_observation.NOT_RECOVERED_OR_NOT_RESOLVED_OR_ONGOING,
                         E_i_7_outcome_reaction_last_observation.FATAL}:
            return YesNoNA.NO
        else:
            return None
    elif action_taken in {G_k_8_action_taken_drug.DOSE_INCREASED,
                          G_k_8_action_taken_drug.DOSE_NOT_CHANGED,
                          G_k_8_action_taken_drug.NOT_APPLICABLE}:
        return YesNoNA.NA
    else:
        return None


def get_reaction_reappear_after_reintroduction(reaction_matrix, primary_reaction):
    for reaction in reaction_matrix:
        if reaction != primary_reaction:
            continue
        if reaction.g_k_9_i_4_reaction_recur_readministration == G_k_9_i_4_reaction_recur_readministration.YES_YES:
            return YesNoNA.YES
        if reaction.g_k_9_i_4_reaction_recur_readministration == G_k_9_i_4_reaction_recur_readministration.YES_NO:
            return YesNoNA.NO
    return YesNoNA.NA


def get_date(day: str | None, month: str | None, year: str | None):
    if day is not None:
        return f"{day}.{month}.{year}"
    if month is not None:
        return f"{month}.{year}"
    if year is not None:
        return f"{year}"


def get_therapy_duration(num: int | None, unit: str | None):
    if num and unit:
        return f"{num} {G_k_4_r_6b_duration_drug_administration_unit(unit).name.lower()}s"


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

    f7_13_describe_reactions: str | None

    f8_patient_died: bool | None
    f9_prolonged_hospitalization: bool | None
    f10_disability_or_incapacity: bool | None
    f11_life_threatening: bool | None
    f12_other: bool | None

    f14_21_suspect_drugs: list[dict[str, Any | None]]

    f22_concomitant_drugs_and_dates_of_administration: str | None
    f23_other_relevant_history: str | None

    f24a_name_and_address_of_manufacturer: str | None
    f24b_MFR_control_no: str

    f24c_date_received_by_manufacturer: str

    f24d_report_source_study: bool
    f24d_report_source_literature: bool
    f24d_report_source_health_professional: bool

    f25a_report_type: bool

    date_of_this_report: str

    @classmethod
    def from_icsr(cls, icsr):
        primary_reaction_event = icsr.get_primary_reaction_event()

        outcome = primary_reaction_event.e_i_7_outcome_reaction_last_observation

        date_of_birth_day, date_of_birth_month, date_of_birth_year = parse_date(
            icsr.d_patient_characteristics.d_2_1_date_birth)

        reaction_onset_day, reaction_onset_month, reaction_onset_year = parse_date(
            primary_reaction_event.e_i_4_date_start_reaction)

        patient_died = False
        prolonged_hospitalization = False
        disability_or_incapacity = False
        life_threatening = False
        other = False

        describe_reactions = []

        for reaction_event in icsr.e_i_reaction_event:
            patient_died |= bool(reaction_event.e_i_3_2a_results_death)
            prolonged_hospitalization |= bool(reaction_event.e_i_3_2c_caused_prolonged_hospitalisation)
            disability_or_incapacity |= bool(reaction_event.e_i_3_2d_disabling_incapacitating)
            life_threatening |= bool(reaction_event.e_i_3_2b_life_threatening)
            other |= (bool(reaction_event.e_i_3_2e_congenital_anomaly_birth_defect) |
                      bool(reaction_event.e_i_3_2f_other_medically_important_condition))

            if reaction_event.e_i_1_2_reaction_primary_source_translation:
                describe_reactions.append(
                    f"[ENG] {reaction_event.e_i_1_2_reaction_primary_source_translation}"
                )
            if reaction_event.e_i_1_1a_reaction_primary_source_native_language:
                describe_reactions.append(
                    f"[{reaction_event.e_i_1_1b_reaction_primary_source_language}] "
                    f"{reaction_event.e_i_1_1a_reaction_primary_source_native_language}"
                )
            if reaction_event.e_i_7_outcome_reaction_last_observation:
                describe_reactions.append(
                    f"*{get_outcome(reaction_event.e_i_7_outcome_reaction_last_observation)}*"
                )
            describe_reactions.append("")

        suspect_drugs = []
        concomitant_drugs = []

        describe_reactions.append("\nActions Taken with Drugs:")
        for drug_information in icsr.g_k_drug_information:
            drug_id = drug_information.g_k_2_2_medicinal_product_name_primary_source

            if drug_information.g_k_1_characterisation_drug_role == G_k_1_characterisation_drug_role.SUSPECT:
                suspect_drugs.append({
                    "name": drug_id,
                    "dosages_information": [{
                        "batch_number": dosage_information.g_k_4_r_7_batch_lot_number,
                        "daily_dose": dosage_information.g_k_4_r_8_dosage_text,
                        "route_of_administration": dosage_information.g_k_4_r_10_2b_route_administration_termid or \
                                                   dosage_information.g_k_4_r_10_1_route_administration,
                        "therapy_dates_from": get_date(*parse_date(dosage_information.g_k_4_r_4_date_time_drug)),
                        "therapy_dates_to": get_date(
                            *parse_date(dosage_information.g_k_4_r_5_date_time_last_administration)),
                        "therapy_duration": get_therapy_duration(
                            dosage_information.g_k_4_r_6a_duration_drug_administration_num,
                            dosage_information.g_k_4_r_6b_duration_drug_administration_unit),
                    } for dosage_information in drug_information.g_k_4_r_dosage_information],
                    "indications_for_use": [{
                        "primary_source": indication_for_use.g_k_7_r_1_indication_primary_source,
                        "meddra_code": indication_for_use.g_k_7_r_2b_indication_meddra_code,
                        "meddra_version": indication_for_use.g_k_7_r_2a_meddra_version_indication
                    } for indication_for_use in drug_information.g_k_7_r_indication_use_case],
                    "abate": get_reaction_abate_after_stopping_drug(drug_information.g_k_8_action_taken_drug, outcome),
                    "reappear": get_reaction_reappear_after_reintroduction(
                        drug_information.g_k_9_i_drug_reaction_matrix, primary_reaction_event)
                })

                if drug_information.g_k_8_action_taken_drug != G_k_8_action_taken_drug.UNKNOWN:
                    describe_reactions.append(
                        f"{drug_id} {get_action_taken_drug(drug_information.g_k_8_action_taken_drug)}")

            elif drug_information.g_k_1_characterisation_drug_role == G_k_1_characterisation_drug_role.CONCOMITANT:
                concomitant_drugs.append(
                    f'{drug_id}: {",".join([
                        f"{get_date(*parse_date(dosage_information.g_k_4_r_4_date_time_drug))}—{get_date(*parse_date(dosage_information.g_k_4_r_5_date_time_last_administration))}"
                        for dosage_information in drug_information.g_k_4_r_dosage_information
                    ])}'
                )
        describe_reactions.append(f"\nCase Narrative: {icsr.h_narrative_case_summary.h_1_case_narrative}")
        describe_reactions.append(f"\nRelevant tests/lab data:")
        describe_reactions += [result.f_r_3_4_result_unstructured_data for result in
                               icsr.f_r_results_tests_procedures_investigation_patient]
        return cls(
            f1_patient_initials=icsr.d_patient_characteristics.d_1_patient,
            f1a_country=primary_reaction_event.e_i_9_identification_country_reaction,

            f2_date_of_birth_day=date_of_birth_day,
            f2_date_of_birth_month=date_of_birth_month,
            f2_date_of_birth_year=date_of_birth_year,
            f2a_age=get_age(icsr.d_patient_characteristics.d_2_2a_age_onset_reaction_num,
                            icsr.d_patient_characteristics.d_2_2b_age_onset_reaction_unit),

            f3_sex=get_sex(icsr.d_patient_characteristics.d_5_sex),

            f4_reaction_onset_day=reaction_onset_day,
            f5_reaction_onset_month=reaction_onset_month,
            f6_reaction_onset_year=reaction_onset_year,

            f7_13_describe_reactions='\n'.join(describe_reactions),

            f8_patient_died=patient_died,
            f9_prolonged_hospitalization=prolonged_hospitalization,
            f10_disability_or_incapacity=disability_or_incapacity,
            f11_life_threatening=life_threatening,
            f12_other=other,

            f14_21_suspect_drugs=suspect_drugs,

            f22_concomitant_drugs_and_dates_of_administration='\n'.join(concomitant_drugs),

            f23_other_relevant_history=icsr.d_patient_characteristics.d_7_2_text_medical_history,

            f24a_name_and_address_of_manufacturer='\n'.join(source.c_1_9_1_r_1_source_case_id for source in
                                                           icsr.c_1_identification_case_safety_report.c_1_9_1_r_source_case_id),

            f24b_MFR_control_no=icsr.c_1_identification_case_safety_report.c_1_8_1_worldwide_unique_case_identification_number,

            f24c_date_received_by_manufacturer=get_date(
                *parse_date(icsr.c_1_identification_case_safety_report.c_1_5_date_most_recent_information)),

            f24d_report_source_study=icsr.c_1_identification_case_safety_report.c_1_3_type_report == C_1_3_type_report.REPORT_FROM_STUDY,
            f24d_report_source_literature=bool(icsr.c_4_r_literature_reference),
            f24d_report_source_health_professional=any(
                source.c_2_r_4_qualification in {C_2_r_4_qualification.PHYSICIAN,
                                                 C_2_r_4_qualification.PHARMACIST,
                                                 C_2_r_4_qualification.OTHER_HEALTH_PROFESSIONAL}
                for source in icsr.c_2_r_primary_source_information
            ),

            f25a_report_type=icsr.is_initial(),

            date_of_this_report=get_date(*parse_date(icsr.c_1_identification_case_safety_report.c_1_2_date_creation))
        )
