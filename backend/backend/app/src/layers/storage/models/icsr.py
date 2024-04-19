import typing as t

from django.db import models as m

from app.src import enums as e
from app.src.enums import NullFlavor as NF
from extensions import utils
from extensions.django import constraints as ec
from extensions.django import fields as ef
from extensions.django import models as em


# TODO: decide if max_len constraints are needed for varchars on db level (models prior to "D" have them)

# TODO: resolve comments: file, dt — datetime, st — standard
# TODO: check if ArbitraryDecimalField must be positive


null_flavor_field_utils = ef.PrefixedFieldUtils('nf_')


class StorageModelMeta(em.ModelWithFieldChoicesConstraintMeta):
    """
    Used for implicit call of add_any_null_constraint for null_flavor fields
    and for checking existence of matching choices restriction which is mandatory.
    """

    def __new__(cls, name, bases, attrs, **kwargs):
        for field_name, field in attrs.items():
            if not null_flavor_field_utils.is_special_field_name(field_name):
                continue

            # Check choices restriction existence
            if not field.choices:
                raise ValueError(f'Null flavor field {field_name} must have choices restriction')

        return super().__new__(cls, name, bases, attrs, **kwargs)


class StorageModel(em.ModelWithTempRelationSupport, metaclass=StorageModelMeta):
    class Meta:
        abstract = True

    @classmethod
    def list(cls) -> list[dict[str, t.Any]]:
        return list(cls.objects.values('id'))


class ICSR(StorageModel):
    @classmethod
    def list(cls) -> list[dict[str, t.Any]]:
        # Extracted fields and their constraints are better to be described in domain layer,
        # but they are specified here for better performance control.
        # Django ORM is used instead of raw sql for independency from specific database.

        # All data is extracted with only 4 queries

        icsrs = ICSR.objects\
            .values(
                'id',
                case_number=m.F('c_1_identification_case_safety_report__c_1_1_sender_safety_report_unique_id'),
                creation_date=m.F('c_1_identification_case_safety_report__c_1_2_date_creation'),
                received_date=m.F('c_1_identification_case_safety_report__c_1_4_date_report_first_received_source'),
                # Default value that might be changed later
                serious=m.Value(False)
            )\
            .order_by('-creation_date')
        
        events = E_i_reaction_event.objects\
            .filter(e_i_3_1_term_highlighted_reporter__in=[
                e.E_i_3_1_term_highlighted_reporter.YES_NOT_SERIOUS,
                e.E_i_3_1_term_highlighted_reporter.YES_SERIOUS,
            ])\
            .values(
                'icsr',
                reaction_name=m.F('e_i_2_1b_reaction_meddra_code')
            )
        
        drugs = G_k_drug_information.objects\
            .filter(g_k_1_characterisation_drug_role=e.G_k_1_characterisation_drug_role.SUSPECT)\
            .values(
                'icsr',
                drug_name=m.F('g_k_2_1_2b_phpid')
            )

        seriousness_data = E_i_reaction_event.objects\
            .filter(
                m.Q(e_i_3_2a_results_death=True)
                | m.Q(e_i_3_2b_life_threatening=True)
                | m.Q(e_i_3_2c_caused_prolonged_hospitalisation=True)
                | m.Q(e_i_3_2d_disabling_incapacitating=True)
                | m.Q(e_i_3_2e_congenital_anomaly_birth_defect=True)
                | m.Q(e_i_3_2f_other_medically_important_condition=True)
            )\
            .values(
                'icsr',
                serious=m.Value(True)
            )\
            .distinct()
        
        # Lightweight data merge
        
        result = {}
        for icsr in icsrs:
            result[icsr['id']] = icsr

        for prop_name, data in {'reaction_name': events, 'drug_name': drugs}.items():
            for item in data:
                icsr_id = item['icsr']
                utils.update_or_create_list_in_dict(result[icsr_id], prop_name, item[prop_name])

        for seriousness in seriousness_data:
            icsr_id = seriousness['icsr']
            result[icsr_id]['serious'] = seriousness['serious']

        return list(result.values())


# C_1_identification_case_safety_report


class C_1_identification_case_safety_report(StorageModel):
    class Meta: pass

    icsr = m.OneToOneField(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='c_1_identification_case_safety_report'
    )

    c_1_1_sender_safety_report_unique_id = m.CharField(null=True, unique=True)
    c_1_2_date_creation = m.CharField(null=True)  # dt
    c_1_3_type_report = m.IntegerField(null=True, choices=e.C_1_3_type_report)
    c_1_4_date_report_first_received_source = m.CharField(null=True)  # dt
    c_1_5_date_most_recent_information = m.CharField(null=True)  # dt

    # c_1_6_additional_available_documents_held_sender
    c_1_6_1_additional_documents_available = m.BooleanField(null=True)

    c_1_7_fulfil_local_criteria_expedited_report = m.BooleanField(null=True)
    nf_c_1_7_fulfil_local_criteria_expedited_report = m.CharField(null=True, choices=[NF.NI])

    # c_1_8_worldwide_unique_case_identification
    c_1_8_1_worldwide_unique_case_identification_number = m.CharField(null=True, unique=True)
    c_1_8_2_first_sender = m.IntegerField(null=True, choices=e.C_1_8_2_first_sender)

    # c_1_9_other_case_ids
    c_1_9_1_other_case_ids_previous_transmissions = m.BooleanField(null=True, choices=[True])
    nf_c_1_9_1_other_case_ids_previous_transmissions = m.CharField(null=True, choices=[NF.NI])

    # c_1_11_report_nullification_amendment
    c_1_11_1_report_nullification_amendment = m.IntegerField(null=True, choices=e.C_1_11_1_report_nullification_amendment)
    c_1_11_2_reason_nullification_amendment = m.CharField(null=True)


class C_1_6_1_r_documents_held_sender(StorageModel):
    class Meta: pass

    c_1_identification_case_safety_report = m.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=m.CASCADE,
        related_name='c_1_6_1_r_documents_held_sender'
    )

    c_1_6_1_r_1_documents_held_sender = m.CharField(null=True)
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(StorageModel):
    class Meta: pass

    ec.add_unique_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_9_1_r_2_case_id'
    )

    c_1_identification_case_safety_report = m.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=m.CASCADE,
        related_name='c_1_9_1_r_source_case_id'
    )

    c_1_9_1_r_1_source_case_id = m.CharField(null=True)
    c_1_9_1_r_2_case_id = m.CharField(null=True)


class C_1_10_r_identification_number_report_linked(StorageModel):
    class Meta: pass

    ec.add_unique_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_10_r_identification_number_report_linked'
    )

    c_1_identification_case_safety_report = m.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=m.CASCADE,
        related_name='c_1_10_r_identification_number_report_linked'
    )

    c_1_10_r_identification_number_report_linked = m.CharField(null=True)


# C_2_r_primary_source_information


class C_2_r_primary_source_information(StorageModel):
    class Meta: pass

    ec.add_unique_constraint(
        Meta,
        'icsr',
        'c_2_r_5_primary_source_regulatory_purposes'
    )

    icsr = m.ForeignKey(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='c_2_r_primary_source_information'
    )

    # c_2_r_1_reporter_name
    c_2_r_1_1_reporter_title = m.CharField(null=True)
    nf_c_2_r_1_1_reporter_title = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    c_2_r_1_2_reporter_given_name = m.CharField(null=True)
    nf_c_2_r_1_2_reporter_given_name = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_3_reporter_middle_name = m.CharField(null=True)
    nf_c_2_r_1_3_reporter_middle_name = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_4_reporter_family_name = m.CharField(null=True)
    nf_c_2_r_1_4_reporter_family_name = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # c_2_r_2_reporter_address_telephone
    c_2_r_2_1_reporter_organisation = m.CharField(null=True)
    nf_c_2_r_2_1_reporter_organisation = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_2_reporter_department = m.CharField(null=True)
    nf_c_2_r_2_2_reporter_department = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_3_reporter_street = m.CharField(null=True)
    nf_c_2_r_2_3_reporter_street = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_4_reporter_city = m.CharField(null=True)
    nf_c_2_r_2_4_reporter_city = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_5_reporter_state_province = m.CharField(null=True)
    nf_c_2_r_2_5_reporter_state_province = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_6_reporter_postcode = m.CharField(null=True)
    nf_c_2_r_2_6_reporter_postcode = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_7_reporter_telephone = m.CharField(null=True)
    nf_c_2_r_2_7_reporter_telephone = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    c_2_r_3_reporter_country_code = m.CharField(null=True)  # st
    c_2_r_4_qualification = m.IntegerField(null=True, choices=e.C_2_r_4_qualification)
    nf_c_2_r_4_qualification = m.CharField(null=True, choices=[NF.UNK])
    c_2_r_5_primary_source_regulatory_purposes = m.IntegerField(null=True, choices=e.C_2_r_5_primary_source_regulatory_purposes)


# C_3_information_sender_case_safety_report


class C_3_information_sender_case_safety_report(StorageModel):
    class Meta: pass

    icsr = m.OneToOneField(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='c_3_information_sender_case_safety_report'
    )

    c_3_1_sender_type = m.IntegerField(null=True, choices=e.C_3_1_sender_type)
    c_3_2_sender_organisation = m.CharField(null=True)

    # c_3_3_person_responsible_sending_report
    c_3_3_1_sender_department = m.CharField(null=True)
    c_3_3_2_sender_title = m.CharField(null=True)
    c_3_3_3_sender_given_name = m.CharField(null=True)
    c_3_3_4_sender_middle_name = m.CharField(null=True)
    c_3_3_5_sender_family_name = m.CharField(null=True)

    # c_3_4_sender_address_fax_telephone_email
    c_3_4_1_sender_street_address = m.CharField(null=True)
    c_3_4_2_sender_city = m.CharField(null=True)
    c_3_4_3_sender_state_province = m.CharField(null=True)
    c_3_4_4_sender_postcode = m.CharField(null=True)
    c_3_4_5_sender_country_code = m.CharField(null=True)  # st
    c_3_4_6_sender_telephone = m.CharField(null=True)
    c_3_4_7_sender_fax = m.CharField(null=True)
    c_3_4_8_sender_email = m.CharField(null=True)


# C_4_r_literature_reference


class C_4_r_literature_reference(StorageModel):
    class Meta: pass

    icsr = m.ForeignKey(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='c_4_r_literature_reference'
    )

    c_4_r_1_literature_reference = m.CharField(null=True)
    nf_c_4_r_1_literature_reference = m.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    # file: c_4_r_2_included_documents


# C_5_study_identification

class C_5_study_identification(StorageModel):
    class Meta: pass

    icsr = m.OneToOneField(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='c_5_study_identification'
    )

    c_5_2_study_name = m.CharField(null=True)
    nf_c_5_2_study_name = m.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_3_sponsor_study_number = m.CharField(null=True)
    nf_c_5_3_sponsor_study_number = m.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_4_study_type_reaction = m.IntegerField(null=True, choices=e.C_5_4_study_type_reaction)


class C_5_1_r_study_registration(StorageModel):
    class Meta: pass

    c_5_study_identification = m.ForeignKey(
        to=C_5_study_identification,
        on_delete=m.CASCADE,
        related_name='c_5_1_r_study_registration'
    )

    c_5_1_r_1_study_registration_number = m.CharField(null=True)
    nf_c_5_1_r_1_study_registration_number = m.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_1_r_2_study_registration_country = m.CharField(null=True)  # st
    nf_c_5_1_r_2_study_registration_country = m.CharField(null=True, choices=[NF.ASKU, NF.NASK])


# D_patient_characteristics


class D_patient_characteristics(StorageModel):
    class Meta: pass

    icsr = m.OneToOneField(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='d_patient_characteristics'
    )

    d_1_patient = m.CharField(null=True)
    nf_d_1_patient = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])

    # d_1_1_medical_record_number_source
    d_1_1_1_medical_record_number_source_gp = m.CharField(null=True)
    nf_d_1_1_1_medical_record_number_source_gp = m.CharField(null=True, choices=[NF.MSK])
    d_1_1_2_medical_record_number_source_specialist = m.CharField(null=True)
    nf_d_1_1_2_medical_record_number_source_specialist = m.CharField(null=True, choices=[NF.MSK])
    d_1_1_3_medical_record_number_source_hospital = m.CharField(null=True)
    nf_d_1_1_3_medical_record_number_source_hospital = m.CharField(null=True, choices=[NF.MSK])
    d_1_1_4_medical_record_number_source_investigation = m.CharField(null=True)
    nf_d_1_1_4_medical_record_number_source_investigation = m.CharField(null=True, choices=[NF.MSK])

    # d_2_age_information

    d_2_1_date_birth = m.CharField(null=True)  # dt
    nf_d_2_1_date_birth = m.CharField(null=True, choices=[NF.MSK])

    # d_2_2_age_onset_reaction

    d_2_2a_age_onset_reaction_num = m.PositiveIntegerField(null=True)
    d_2_2b_age_onset_reaction_unit = m.CharField(null=True)  # st

    # d_2_2_1_gestation_period_reaction_foetus
    d_2_2_1a_gestation_period_reaction_foetus_num = m.PositiveIntegerField(null=True)
    d_2_2_1b_gestation_period_reaction_foetus_unit = m.CharField(null=True)  # st

    d_2_3_patient_age_group = m.CharField(null=True, choices=e.D_2_3_patient_age_group)

    d_3_body_weight = ef.ArbitraryDecimalField(null=True)
    d_4_height = m.PositiveIntegerField(null=True)
    d_5_sex = m.IntegerField(null=True, choices=e.D_5_sex)
    nf_d_5_sex = m.CharField(null=True, choices=[NF.MSK, NF.UNK, NF.ASKU, NF.NASK])
    d_6_last_menstrual_period_date = m.CharField(null=True)  # dt

    # d_7_medical_history
    d_7_2_text_medical_history = m.CharField(null=True)
    nf_d_7_2_text_medical_history = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_7_3_concomitant_therapies = m.BooleanField(null=True, choices=[True])

    # d_9_case_death
    d_9_1_date_death = m.CharField(null=True)  # dt
    nf_d_9_1_date_death = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_9_3_autopsy = m.BooleanField(null=True)
    nf_d_9_3_autopsy = m.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])

    # d_10_information_concerning_parent

    d_10_1_parent_identification = m.CharField(null=True)
    nf_d_10_1_parent_identification = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])

    # d_10_2_parent_age_information

    d_10_2_1_date_birth_parent = m.CharField(null=True)  # dt
    nf_d_10_2_1_date_birth_parent = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_10_2_2_age_parent
    d_10_2_2a_age_parent_num = m.PositiveIntegerField(null=True)
    d_10_2_2b_age_parent_unit = m.CharField(null=True)  # st

    d_10_3_last_menstrual_period_date_parent = m.CharField(null=True)  # dt
    nf_d_10_3_last_menstrual_period_date_parent = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_4_body_weight_parent = ef.ArbitraryDecimalField(null=True)
    d_10_5_height_parent = m.PositiveIntegerField(null=True)
    d_10_6_sex_parent = m.IntegerField(null=True, choices=e.D_10_6_sex_parent)
    nf_d_10_6_sex_parent = m.CharField(null=True, choices=[NF.UNK, NF.MSK, NF.ASKU, NF.NASK])

    # d_10_7_medical_history_parent
    d_10_7_2_text_medical_history_parent = m.CharField(null=True)


class D_7_1_r_structured_information_medical_history(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_7_1_r_structured_information_medical_history'
    )

    d_7_1_r_1a_meddra_version_medical_history = m.CharField(null=True)  # st
    d_7_1_r_1b_medical_history_meddra_code = m.PositiveIntegerField(null=True)
    d_7_1_r_2_start_date = m.CharField(null=True)  # dt
    nf_d_7_1_r_2_start_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])  # dt
    d_7_1_r_3_continuing = m.BooleanField(null=True)
    nf_d_7_1_r_3_continuing = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_7_1_r_4_end_date = m.CharField(null=True)  # dt
    nf_d_7_1_r_4_end_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])  # dt
    d_7_1_r_5_comments = m.CharField(null=True)
    d_7_1_r_6_family_history = m.BooleanField(null=True, choices=[True])


class D_8_r_past_drug_history(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_8_r_past_drug_history'
    )

    d_8_r_1_name_drug = m.CharField(null=True)
    nf_d_8_r_1_name_drug = m.CharField(null=True, choices=[NF.UNK, NF.NA])

    # d_8_r_2_mpid
    d_8_r_2a_mpid_version = m.CharField(null=True)  # st
    d_8_r_2b_mpid = m.CharField(null=True)  # st

    # d_8_r_3_phpid
    d_8_r_3a_phpid_version = m.CharField(null=True)  # st
    d_8_r_3b_phpid = m.CharField(null=True)  # st

    d_8_r_4_start_date = m.CharField(null=True)  # dt
    nf_d_8_r_4_start_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_8_r_5_end_date = m.CharField(null=True)  # dt
    nf_d_8_r_5_end_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_8_r_6_indication_meddra_code
    d_8_r_6a_meddra_version_indication = m.CharField(null=True)  # st
    d_8_r_6b_indication_meddra_code = m.PositiveIntegerField(null=True)

    # d_8_r_7_reaction_meddra_code
    d_8_r_7a_meddra_version_reaction = m.CharField(null=True)  # st
    d_8_r_7b_reaction_meddra_code = m.PositiveIntegerField(null=True)


class D_9_2_r_cause_death(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_9_2_r_cause_death'
    )

    d_9_2_r_1a_meddra_version_cause_death = m.CharField(null=True)  # st
    d_9_2_r_1b_cause_death_meddra_code = m.PositiveIntegerField(null=True)
    d_9_2_r_2_cause_death = m.CharField(null=True)


class D_9_4_r_autopsy_determined_cause_death(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_9_4_r_autopsy_determined_cause_death'
    )

    d_9_4_r_1a_meddra_version_autopsy_determined_cause_death = m.CharField(null=True)  # st
    d_9_4_r_1b_autopsy_determined_cause_death_meddra_code = m.PositiveIntegerField(null=True)
    d_9_4_r_2_autopsy_determined_cause_death = m.CharField(null=True)


class D_10_7_1_r_structured_information_parent_meddra_code(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_10_7_1_r_structured_information_parent_meddra_code'
    )

    d_10_7_1_r_1a_meddra_version_medical_history = m.CharField(null=True)  # st
    d_10_7_1_r_1b_medical_history_meddra_code = m.PositiveIntegerField(null=True)
    d_10_7_1_r_2_start_date = m.CharField(null=True)  # dt
    nf_d_10_7_1_r_2_start_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_7_1_r_3_continuing = m.BooleanField(null=True)
    nf_d_10_7_1_r_3_continuing = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_10_7_1_r_4_end_date = m.CharField(null=True)  # dt
    nf_d_10_7_1_r_4_end_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_7_1_r_5_comments = m.CharField(null=True)


class D_10_8_r_past_drug_history_parent(StorageModel):
    class Meta: pass

    d_patient_characteristics = m.ForeignKey(
        to=D_patient_characteristics,
        on_delete=m.CASCADE,
        related_name='d_10_8_r_past_drug_history_parent'
    )

    d_10_8_r_1_name_drug = m.CharField(null=True)

    # d_10_8_r_2_mpid
    d_10_8_r_2a_mpid_version = m.CharField(null=True)  # st
    d_10_8_r_2b_mpid = m.CharField(null=True)  # st

    # d_10_8_r_3_phpid
    d_10_8_r_3a_phpid_version = m.CharField(null=True)  # st
    d_10_8_r_3b_phpid = m.CharField(null=True)  # st

    d_10_8_r_4_start_date = m.CharField(null=True)  # dt
    nf_d_10_8_r_4_start_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_8_r_5_end_date = m.CharField(null=True)  # dt
    nf_d_10_8_r_5_end_date = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_10_8_r_6_indication_meddra_code
    d_10_8_r_6a_meddra_version_indication = m.CharField(null=True)  # st
    d_10_8_r_6b_indication_meddra_code = m.PositiveIntegerField(null=True)

    # d_10_8_r_7_reactions_meddra_code
    d_10_8_r_7a_meddra_version_reaction = m.CharField(null=True)  # st
    d_10_8_r_7b_reactions_meddra_code = m.PositiveIntegerField(null=True)


# E_i_reaction_event


class E_i_reaction_event(StorageModel):
    class Meta: pass

    icsr = m.ForeignKey(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='e_i_reaction_event'
    )

    # e_i_1_reaction_primary_source

    # e_i_1_1_reaction_primary_source_native_language
    e_i_1_1a_reaction_primary_source_native_language = m.CharField(null=True)
    e_i_1_1b_reaction_primary_source_language = m.CharField(null=True)  # st

    e_i_1_2_reaction_primary_source_translation = m.CharField(null=True)

    # e_i_2_1_reaction_meddra_code
    e_i_2_1a_meddra_version_reaction = m.CharField(null=True)  # st
    e_i_2_1b_reaction_meddra_code = m.PositiveIntegerField(null=True)

    e_i_3_1_term_highlighted_reporter = m.IntegerField(null=True, choices=e.E_i_3_1_term_highlighted_reporter)

    # e_i_3_2_seriousness_criteria_event_level
    e_i_3_2a_results_death = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2a_results_death = m.CharField(null=True, choices=[NF.NI])
    e_i_3_2b_life_threatening = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2b_life_threatening = m.CharField(null=True, choices=[NF.NI])
    e_i_3_2c_caused_prolonged_hospitalisation = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2c_caused_prolonged_hospitalisation = m.CharField(null=True, choices=[NF.NI])
    e_i_3_2d_disabling_incapacitating = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2d_disabling_incapacitating = m.CharField(null=True, choices=[NF.NI])
    e_i_3_2e_congenital_anomaly_birth_defect = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2e_congenital_anomaly_birth_defect = m.CharField(null=True, choices=[NF.NI])
    e_i_3_2f_other_medically_important_condition = m.BooleanField(null=True, choices=[True])
    nf_e_i_3_2f_other_medically_important_condition = m.CharField(null=True, choices=[NF.NI])

    e_i_4_date_start_reaction = m.CharField(null=True)  # dt
    nf_e_i_4_date_start_reaction = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    e_i_5_date_end_reaction = m.CharField(null=True)  # dt
    nf_e_i_5_date_end_reaction = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # e_i_6_duration_reaction
    e_i_6a_duration_reaction_num = m.PositiveIntegerField(null=True)
    e_i_6b_duration_reaction_unit = m.CharField(null=True)  # st

    e_i_7_outcome_reaction_last_observation = m.IntegerField(null=True, choices=e.E_i_7_outcome_reaction_last_observation)
    e_i_8_medical_confirmation_healthcare_professional = m.BooleanField(null=True)
    e_i_9_identification_country_reaction = m.CharField(null=True)  # st


# F_r_results_tests_procedures_investigation_patient


class F_r_results_tests_procedures_investigation_patient(StorageModel):
    class Meta: pass

    icsr = m.ForeignKey(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='f_r_results_tests_procedures_investigation_patient'
    )

    f_r_1_test_date = m.CharField(null=True)  # dt
    nf_f_r_1_test_date = m.CharField(null=True, choices=[NF.UNK])  # dt

    # f_r_2_test_name

    f_r_2_1_test_name = m.CharField(null=True)

    # f_r_2_2_test_name_meddra_code
    f_r_2_2a_meddra_version_test_name = m.CharField(null=True)  # st
    f_r_2_2b_test_name_meddra_code = m.PositiveIntegerField(null=True)

    # f_r_3_test_result
    f_r_3_1_test_result_code = m.IntegerField(null=True, choices=e.F_r_3_1_test_result_code)
    f_r_3_2_test_result_val_qual = ef.ArbitraryDecimalField(null=True)  # TODO: check how qualifiers are used
    nf_f_r_3_2_test_result_val_qual = m.CharField(null=True, choices=[NF.NINF, NF.PINF])
    f_r_3_3_test_result_unit = m.CharField(null=True)  # st
    f_r_3_4_result_unstructured_data = m.CharField(null=True)

    f_r_4_normal_low_value = m.CharField(null=True)
    f_r_5_normal_high_value = m.CharField(null=True)
    f_r_6_comments = m.CharField(null=True)
    f_r_7_more_information_available = m.BooleanField(null=True)


# G_k_drug_information


class G_k_drug_information(StorageModel):
    class Meta: pass

    icsr = m.ForeignKey(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='g_k_drug_information'
    )

    g_k_1_characterisation_drug_role = m.IntegerField(null=True, choices=e.G_k_1_characterisation_drug_role)

    # g_k_2_drug_identification

    # g_k_2_1_mpid_phpid
    g_k_2_1_1a_mpid_version = m.CharField(null=True)  # st
    g_k_2_1_1b_mpid = m.CharField(null=True)  # st
    g_k_2_1_2a_phpid_version = m.CharField(null=True)  # st
    g_k_2_1_2b_phpid = m.CharField(null=True)  # st

    g_k_2_2_medicinal_product_name_primary_source = m.CharField(null=True)
    g_k_2_4_identification_country_drug_obtained = m.CharField(null=True)  # st
    g_k_2_5_investigational_product_blinded = m.BooleanField(null=True, choices=[True])

    # g_k_3_holder_authorisation_application_number_drug
    g_k_3_1_authorisation_application_number = m.CharField(null=True)  # st
    g_k_3_2_country_authorisation_application = m.CharField(null=True)  # st
    g_k_3_3_name_holder_applicant = m.CharField(null=True)

    # g_k_5_cumulative_dose_first_reaction
    g_k_5a_cumulative_dose_first_reaction_num = ef.ArbitraryDecimalField(null=True)
    g_k_5b_cumulative_dose_first_reaction_unit = m.CharField(null=True)  # st

    # g_k_6_gestation_period_exposure
    g_k_6a_gestation_period_exposure_num = ef.ArbitraryDecimalField(null=True)
    g_k_6b_gestation_period_exposure_unit = m.CharField(null=True)  # st

    g_k_8_action_taken_drug = m.IntegerField(null=True, choices=e.G_k_8_action_taken_drug)

    g_k_11_additional_information_drug = m.CharField(null=True)


class G_k_2_3_r_substance_id_strength(StorageModel):
    class Meta: pass

    g_k_drug_information = m.ForeignKey(
        to=G_k_drug_information,
        on_delete=m.CASCADE,
        related_name='g_k_2_3_r_substance_id_strength'
    )

    g_k_2_3_r_1_substance_name = m.CharField(null=True)
    g_k_2_3_r_2a_substance_termid_version = m.CharField(null=True)  # st
    g_k_2_3_r_2b_substance_termid = m.CharField(null=True)  # st
    g_k_2_3_r_3a_strength_num = ef.ArbitraryDecimalField(null=True)  # TODO: int or decimal?
    g_k_2_3_r_3b_strength_unit = m.CharField(null=True)  # st


class G_k_4_r_dosage_information(StorageModel):
    class Meta: pass

    g_k_drug_information = m.ForeignKey(
        to=G_k_drug_information,
        on_delete=m.CASCADE,
        related_name='g_k_4_r_dosage_information'
    )

    g_k_4_r_1a_dose_num = ef.ArbitraryDecimalField(null=True)
    g_k_4_r_1b_dose_unit = m.CharField(null=True)  # st
    g_k_4_r_2_number_units_interval = ef.ArbitraryDecimalField(null=True)
    g_k_4_r_3_definition_interval_unit = m.CharField(null=True)  # st
    g_k_4_r_4_date_time_drug = m.CharField(null=True)  # dt
    nf_g_k_4_r_4_date_time_drug = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    g_k_4_r_5_date_time_last_administration = m.CharField(null=True)  # dt
    nf_g_k_4_r_5_date_time_last_administration = m.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # g_k_4_r_6_duration_drug_administration
    g_k_4_r_6a_duration_drug_administration_num = ef.ArbitraryDecimalField(null=True)
    g_k_4_r_6b_duration_drug_administration_unit = m.CharField(null=True)  # st

    g_k_4_r_7_batch_lot_number = m.CharField(null=True)
    g_k_4_r_8_dosage_text = m.CharField(null=True)

    # g_k_4_r_9_pharmaceutical_dose_form

    g_k_4_r_9_1_pharmaceutical_dose_form = m.CharField(null=True)
    nf_g_k_4_r_9_1_pharmaceutical_dose_form = m.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_9_2a_pharmaceutical_dose_form_termid_version = m.CharField(null=True)  # st
    g_k_4_r_9_2b_pharmaceutical_dose_form_termid = m.CharField(null=True)  # st

    # g_k_4_r_10_route_administration
    g_k_4_r_10_1_route_administration = m.CharField(null=True)
    nf_g_k_4_r_10_1_route_administration = m.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_10_2a_route_administration_termid_version = m.CharField(null=True)  # st
    g_k_4_r_10_2b_route_administration_termid = m.CharField(null=True)  # st

    # g_k_4_r_11_parent_route_administration
    g_k_4_r_11_1_parent_route_administration = m.CharField(null=True)
    nf_g_k_4_r_11_1_parent_route_administration = m.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_11_2a_parent_route_administration_termid_version = m.CharField(null=True)  # st
    g_k_4_r_11_2b_parent_route_administration_termid = m.CharField(null=True)  # st


class G_k_7_r_indication_use_case(StorageModel):
    class Meta: pass

    g_k_drug_information = m.ForeignKey(
        to=G_k_drug_information,
        on_delete=m.CASCADE,
        related_name='g_k_7_r_indication_use_case'
    )

    g_k_7_r_1_indication_primary_source = m.CharField(null=True)
    nf_g_k_7_r_1_indication_primary_source = m.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])

    # g_k_7_r_2_indication_meddra_code
    g_k_7_r_2a_meddra_version_indication = m.CharField(null=True)  # st
    g_k_7_r_2b_indication_meddra_code = m.PositiveIntegerField(null=True)


class G_k_9_i_drug_reaction_matrix(StorageModel):
    class Meta: pass

    g_k_drug_information = m.ForeignKey(
        to=G_k_drug_information,
        on_delete=m.CASCADE,
        related_name='g_k_9_i_drug_reaction_matrix'
    )

    g_k_9_i_1_reaction_assessed = m.ForeignKey(
        to=E_i_reaction_event,
        on_delete=m.CASCADE,
        related_name='+'
    )

    # g_k_9_i_3_interval_drug_administration_reaction
    g_k_9_i_3_1a_interval_drug_administration_reaction_num = ef.ArbitraryDecimalField(null=True)
    g_k_9_i_3_1b_interval_drug_administration_reaction_unit = m.CharField(null=True)  # st
    g_k_9_i_3_2a_interval_last_dose_drug_reaction_num = ef.ArbitraryDecimalField(null=True)
    g_k_9_i_3_2b_interval_last_dose_drug_reaction_unit = m.CharField(null=True)  # st

    g_k_9_i_4_reaction_recur_readministration = m.IntegerField(null=True, choices=e.G_k_9_i_4_reaction_recur_readministration)


class G_k_9_i_2_r_assessment_relatedness_drug_reaction(StorageModel):
    class Meta: pass

    g_k_9_i_drug_reaction_matrix = m.ForeignKey(
        to=G_k_9_i_drug_reaction_matrix,
        on_delete=m.CASCADE,
        related_name='g_k_9_i_2_r_assessment_relatedness_drug_reaction'
    )

    g_k_9_i_2_r_1_source_assessment = m.CharField(null=True)
    g_k_9_i_2_r_2_method_assessment = m.CharField(null=True)
    g_k_9_i_2_r_3_result_assessment = m.CharField(null=True)


class G_k_10_r_additional_information_drug(StorageModel):
    class Meta: pass

    g_k_drug_information = m.ForeignKey(
        to=G_k_drug_information,
        on_delete=m.CASCADE,
        related_name='g_k_10_r_additional_information_drug'
    )

    g_k_10_r_additional_information_drug = m.IntegerField(null=True, choices=e.G_k_10_r_additional_information_drug)


# H_narrative_case_summary


class H_narrative_case_summary(StorageModel):
    class Meta: pass

    icsr = m.OneToOneField(
        to=ICSR,
        on_delete=m.CASCADE,
        related_name='h_narrative_case_summary'
    )

    h_1_case_narrative = m.CharField(null=True)
    h_2_reporter_comments = m.CharField(null=True)

    h_4_sender_comments = m.CharField(null=True)


class H_3_r_sender_diagnosis_meddra_code(StorageModel):
    class Meta: pass

    h_narrative_case_summary = m.ForeignKey(
        to=H_narrative_case_summary,
        on_delete=m.CASCADE,
        related_name='h_3_r_sender_diagnosis_meddra_code'
    )

    h_3_r_1a_meddra_version_sender_diagnosis = m.CharField(null=True)  # st
    h_3_r_1b_sender_diagnosis_meddra_code = m.PositiveIntegerField(null=True)


class H_5_r_case_summary_reporter_comments_native_language(StorageModel):
    class Meta: pass

    h_narrative_case_summary = m.ForeignKey(
        to=H_narrative_case_summary,
        on_delete=m.CASCADE,
        related_name='h_5_r_case_summary_reporter_comments_native_language'
    )

    h_5_r_1a_case_summary_reporter_comments_text = m.CharField(null=True)
    h_5_r_1b_case_summary_reporter_comments_language = m.CharField(null=True)  # st
