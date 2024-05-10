import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.enums import C_1_3_type_report, D_5_sex, E_i_7_outcome_reaction_last_observation, \
    G_k_1_characterisation_drug_role, G_k_8_action_taken_drug, C_2_r_4_qualification
from app.src.layers.storage.models import ICSR, C_1_identification_case_safety_report, D_patient_characteristics, \
    E_i_reaction_event, F_r_results_tests_procedures_investigation_patient, G_k_drug_information, \
    G_k_4_r_dosage_information, C_2_r_primary_source_information, H_narrative_case_summary, G_k_7_r_indication_use_case

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Fill database with dummy icsr data'

    def add_arguments(self, parser):
        pass

    @transaction.atomic
    def handle(self, *args, **options):
        icsr, created = ICSR.objects.update_or_create(id=0)
        C_1_identification_case_safety_report.objects.update_or_create(
            icsr=icsr,
            c_1_1_sender_safety_report_unique_id='111111',
            c_1_3_type_report=C_1_3_type_report.REPORT_FROM_STUDY,
            c_1_2_date_creation='20200110',
            c_1_5_date_most_recent_information='20201010',
            c_1_8_1_worldwide_unique_case_identification_number='111111'
        )

        C_2_r_primary_source_information.objects.update_or_create(
            icsr=icsr,
            c_2_r_4_qualification=C_2_r_4_qualification.PHYSICIAN
        )

        D_patient_characteristics.objects.update_or_create(
            icsr=icsr,
            d_1_patient='SZ',
            d_2_1_date_birth='20010928',
            d_2_2a_age_onset_reaction_num=22,
            d_2_2b_age_onset_reaction_unit='a',
            d_5_sex=D_5_sex.FEMALE,
            d_7_2_text_medical_history="Hypertension, controlled with medication; No current conditions; "
                                       "Type 2 diabetes mellitus, diet controlled; "
                                       "Anemia; Upper respiratory tract infection"
        )

        E_i_reaction_event.objects.update_or_create(
            icsr=icsr,
            e_i_4_date_start_reaction='20200101',
            e_i_3_2b_life_threatening=True,
            e_i_1_1a_reaction_primary_source_native_language=
            '''Пациент сообщил(а) о том, что после приема лекарства почувствовал(а) головокружение и слабость '''
            '''(легкость в голове). Он(а) заявил(а), что покрылся(лась) потом, и сердце сильно билось. '''
            '''Пациент(ка) сказал(а), что ему(ей) могло стать плохо, и были трудности с дыханием.\n'''
            '''Он(а) смог(ла) сесть, и симптомы прошли через несколько минут.''',
            e_i_1_1b_reaction_primary_source_language='RUS',
            e_i_1_2_reaction_primary_source_translation=
            '''The patient reported feeling dizzy and lightheaded after taking the medication. '''
            '''They stated that they broke out in a sweat and their heart was racing. '''
            '''The patient said they felt like they might faint and had difficulty breathing. '''
            '''They were able to sit down and the symptoms subsided after a few minutes.''',
            e_i_7_outcome_reaction_last_observation=E_i_7_outcome_reaction_last_observation.RECOVERED_OR_RESOLVED,
            e_i_9_identification_country_reaction='RU'
        )

        F_r_results_tests_procedures_investigation_patient.objects.update_or_create(
            icsr=icsr,
            f_r_3_4_result_unstructured_data="blood glucose 550 mg/dL"
        )

        drug_information1, _ = G_k_drug_information.objects.update_or_create(
            icsr=icsr,
            g_k_1_characterisation_drug_role=G_k_1_characterisation_drug_role.SUSPECT,
            g_k_2_2_medicinal_product_name_primary_source="Vaseline",
            g_k_8_action_taken_drug=G_k_8_action_taken_drug.DOSE_REDUCED
        )

        drug_information11, _ = G_k_drug_information.objects.update_or_create(
            icsr=icsr,
            g_k_1_characterisation_drug_role=G_k_1_characterisation_drug_role.SUSPECT,
            g_k_2_2_medicinal_product_name_primary_source="Antidepressants",
            g_k_8_action_taken_drug=G_k_8_action_taken_drug.DOSE_REDUCED
        )

        drug_information2, _ = G_k_drug_information.objects.update_or_create(
            icsr=icsr,
            g_k_1_characterisation_drug_role=G_k_1_characterisation_drug_role.CONCOMITANT,
            g_k_2_2_medicinal_product_name_primary_source="Aspirin",
            g_k_8_action_taken_drug=G_k_8_action_taken_drug.DRUG_WITHDRAWN
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="123",
            g_k_4_r_8_dosage_text="as needed",
            g_k_4_r_10_1_route_administration="Intramuscular"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="123",
            g_k_4_r_8_dosage_text="500 mg twice a day for 7 days",
            g_k_4_r_10_1_route_administration="Oral"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="456",
            g_k_4_r_8_dosage_text="2 teaspoons",
            g_k_4_r_10_1_route_administration="Intravenous"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information2,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="123",
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="chronic pain"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="help sleep"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="prevent infection"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_7_r_1_indication_primary_source="for migraine headaches"
        )

        H_narrative_case_summary.objects.update_or_create(
            icsr=icsr,
            h_1_case_narrative=
            '''The patient, a 75-year-old male with a history of hypertension and diabetes, presented to the '''
            '''emergency department complaining of sudden onset chest pain radiating to the left arm. The pain started '''
            '''30 minutes prior to arrival and was described as crushing and severe. He also reported shortness of breath '''
            '''and diaphoresis. Past medical history was significant for hypertension and diabetes, both controlled '''
            '''with medications. No prior history of chest pain or cardiac events. Social history revealed a 50-pack-year '''
            '''smoking history and occasional alcohol use. Physical examination showed normal vital signs except for '''
            '''mild tachycardia. Electrocardiogram (ECG) demonstrated ST-segment elevation in leads I, aVL, and V5-V6 '''
            '''suggestive of acute myocardial infarction. The patient was emergently transferred to the cardiac '''
            '''catheterization lab where he underwent coronary angioplasty with stent placement.\n'''
            '''He tolerated the procedure well and reported significant improvement in his symptoms. '''
            '''The patient remained stable throughout his hospitalization and was discharged home on a cardiac '''
            '''rehabilitation program.'''
        )
