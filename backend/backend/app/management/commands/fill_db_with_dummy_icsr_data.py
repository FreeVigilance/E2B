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
            d_7_2_text_medical_history="bla-bla"
        )

        E_i_reaction_event.objects.update_or_create(
            icsr=icsr,
            e_i_4_date_start_reaction='20200101',
            # e_i_3_2a_results_death=False,
            # e_i_3_2c_caused_prolonged_hospitalisation=False,
            # e_i_3_2d_disabling_incapacitating=False,
            e_i_3_2b_life_threatening=True,
            # e_i_3_2e_congenital_anomaly_birth_defect=False,
            # e_i_3_2f_other_medically_important_condition=False,
            e_i_1_1a_reaction_primary_source_native_language="бла-бла",
            e_i_1_1b_reaction_primary_source_language='RUS',
            e_i_1_2_reaction_primary_source_translation=
            '''Concomitant medications and past medical/drug history have not been provided.\n'''
            '''On an unspecified date, the patient started taking unspecified caffeine for pain.\n'''
            '''On unspecified dates, the patient also received amitriptyline (Tablet), Botulinum toxin type A as total, Celebrex [celecoxib] (Capsule), Cesamet [nabilone] (Capsule), codeine, fentanyl, Xeomin [Botulinum toxin type A] as total, Toradol [ketorolac tromethamine], Tegretol [carbamazepine], Oxycontin [oxycodone hydrochloride] (Extended release tablet), hydromorphone and fentanyl citrate (Lipid epidural, transdermal) all for pain and mepolizumab for asthma, which were all asessed as co-suspects.\n'''
            '''As per SmPC of caffeine, it is indicated for primary apnoea and as the patient received unspecified caffeine for pain, it was considered as an event of off label use. On an unspecified date, the patient developed a significant medical event of drug dependence. The patient’s outcome was unknown.The reporter did not assess the causal relationship between the events and unspecified caffeine.No further information is expected (case received from health authority).\n\n'''
            '''Case comments:\n'''
            '''This patient of an unknown age and gender experienced drug dependence and off label use while being treated with unspecified Caffeine for pain.   The event drug dependence was assessed as serious (seriousness criterion: important medical event).The event off label use was considered non-serious by convention.The drug dependence is not a listed adverse reaction for Caffeine according to the reference safety information. The off label use was considered as unlisted by convention. With reference to the event of drug dependence, causality could be related to the multiple co-suspect medications.However, taking into consideration the drug to event temporal relationship the causal role of the suspect drug cannot be denied.The company has assessed causal relationship between Caffeine and drug dependence as possible according to the WHO-UMC causality assessment method.As per the SmPC provided, suspect drug is indicated for the treatment of primary apnoea of premature newborns. This constitutes the off label use as the suspect drug was used for pain in this case.Causality was assessed as not applicable for off label use as it was not an event per se.The single individual case report does not modify the benefit/risk balance of this product. Therefore, no changes in the label or other measures is recommended at this point. However, the company will continue to monitor all respective reports received and, based on cumulative experience, will re-evaluate the available evidence on an ongoing basis.''',
            e_i_7_outcome_reaction_last_observation=E_i_7_outcome_reaction_last_observation.RECOVERED_OR_RESOLVED,
            e_i_9_identification_country_reaction='RU'
        )

        F_r_results_tests_procedures_investigation_patient.objects.update_or_create(
            icsr=icsr,
            f_r_3_4_result_unstructured_data="blaaaaa"
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
            g_k_4_r_8_dosage_text="dosage1",
            g_k_4_r_10_1_route_administration="route1"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="123",
            g_k_4_r_8_dosage_text="dosage11",
            g_k_4_r_10_1_route_administration="route11"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="456",
            g_k_4_r_8_dosage_text="dosage11_11",
            g_k_4_r_10_1_route_administration="route11_11"
        )

        G_k_4_r_dosage_information.objects.update_or_create(
            g_k_drug_information=drug_information2,
            g_k_4_r_4_date_time_drug='20200101',
            g_k_4_r_5_date_time_last_administration='20200102',
            g_k_4_r_7_batch_lot_number="123",
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="indication"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="indication2"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information1,
            g_k_7_r_1_indication_primary_source="indication3"
        )

        G_k_7_r_indication_use_case.objects.update_or_create(
            g_k_drug_information=drug_information11,
            g_k_7_r_1_indication_primary_source="indication"
        )

        H_narrative_case_summary.objects.update_or_create(
            icsr=icsr,
            h_1_case_narrative="Bla bla. Bla bla. Bla."
        )
