from django.db import models

from app.src.shared import enums
from app.src.shared.enums import NullFlavor as NF
from extensions.django import constraints as ext_cons
from extensions.django import fields as ext_fields
from extensions.django import models as ext_models


# TODO: decide if max_len constraints are needed for varchars on db level (models prior to "D" have them)

# TODO: resolve comments: file, dt — datetime, st — standard
# TODO: check if ArbitraryDecimalField must be positive


null_flavor_field_utils = ext_fields.PrefixedFieldUtils('nf_')


class StorageModelMeta(ext_models.ModelWithFieldChoicesConstraintMeta):
    """
    Used for implicit call of add_any_null_constraint for null_flavor fields
    and for checking existence of matching choices restriction which is mandatory.
    """

    def __new__(cls, name, bases, attrs, **kwargs):
        for field_name, field in attrs.items():
            if not null_flavor_field_utils.is_special_field_name(field_name):
                continue

            # Check choices restriction existence
            assert field.choices, f'Null flavor field {field_name} must have choices restriction'

            # Call add_any_null_constraint
            meta = ext_models.get_meta_attr_or_raise_exc(attrs, name, 'null flavor field')
            base_field_name = null_flavor_field_utils.get_base_field_name(field_name)
            ext_cons.add_any_null_constraint(meta, base_field_name, field_name)

        return super().__new__(cls, name, bases, attrs, **kwargs)


class StorageModel(ext_models.ModelWithTempRelationSupport, metaclass=StorageModelMeta):
    class Meta:
        abstract = True


class ICSR(StorageModel):
    pass


class C_1_identification_case_safety_report(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_1_identification_case_safety_report'
    )
    c_1_1_sender_safety_report_unique_id = models.CharField(null=True, unique=True, max_length=100)
    c_1_2_date_creation = models.CharField(null=True)  # dt
    c_1_3_type_report = models.IntegerField(null=True, choices=enums.C_1_3_type_report)
    c_1_4_date_report_first_received_source = models.CharField(null=True)  # dt
    c_1_5_date_most_recent_information = models.CharField(null=True)  # dt
    c_1_6_1_additional_documents_available = models.BooleanField(null=True)
    c_1_7_fulfil_local_criteria_expedited_report = models.BooleanField(null=True)
    nf_c_1_7_fulfil_local_criteria_expedited_report = models.CharField(null=True, choices=[NF.NI])
    c_1_8_1_worldwide_unique_case_identification_number = models.CharField(null=True, unique=True, max_length=100)
    c_1_8_2_first_sender = models.IntegerField(null=True, choices=enums.C_1_8_2_first_sender)
    c_1_9_1_other_case_ids_previous_transmissions = models.BooleanField(null=True, choices=[True])
    nf_c_1_9_1_other_case_ids_previous_transmissions = models.CharField(null=True, choices=[NF.NI])
    c_1_11_1_report_nullification_amendment = models.IntegerField(null=True, choices=enums.C_1_11_1_report_nullification_amendment)
    c_1_11_2_reason_nullification_amendment = models.CharField(null=True, max_length=2000)


class C_1_6_1_r_documents_held_sender(StorageModel):
    class Meta: pass

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_6_1_r_documents_held_sender'
    )
    c_1_6_1_r_1_documents_held_sender = models.CharField(null=True, max_length=2000)
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(StorageModel):
    class Meta: pass

    ext_cons.add_unique_together_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_9_1_r_2_case_id'
    )

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_9_1_r_source_case_id'
    )
    c_1_9_1_r_1_source_case_id = models.CharField(null=True, max_length=100)
    c_1_9_1_r_2_case_id = models.CharField(null=True, max_length=100)


class C_1_10_r_identification_number_report_linked(StorageModel):
    class Meta: pass

    ext_cons.add_unique_together_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_10_r_identification_number_report_linked'
    )

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_10_r_identification_number_report_linked'
    )
    c_1_10_r_identification_number_report_linked = models.CharField(null=True, max_length=100)


class C_2_r_primary_source_information(StorageModel):
    class Meta: pass

    ext_cons.add_unique_together_constraint(
        Meta,
        'icsr',
        'c_2_r_5_primary_source_regulatory_purposes'
    )

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_2_r_primary_source_information'
    )
    c_2_r_1_1_reporter_title = models.CharField(null=True, max_length=50)
    nf_c_2_r_1_1_reporter_title = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    c_2_r_1_2_reporter_given_name = models.CharField(null=True, max_length=60)
    nf_c_2_r_1_2_reporter_given_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_3_reporter_middle_name = models.CharField(null=True, max_length=60)
    nf_c_2_r_1_3_reporter_middle_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_4_reporter_family_name = models.CharField(null=True, max_length=60)
    nf_c_2_r_1_4_reporter_family_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_1_reporter_organisation = models.CharField(null=True, max_length=60)
    nf_c_2_r_2_1_reporter_organisation = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_2_reporter_department = models.CharField(null=True, max_length=60)
    nf_c_2_r_2_2_reporter_department = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_3_reporter_street = models.CharField(null=True, max_length=100)
    nf_c_2_r_2_3_reporter_street = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_4_reporter_city = models.CharField(null=True, max_length=35)
    nf_c_2_r_2_4_reporter_city = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_5_reporter_state_province = models.CharField(null=True, max_length=40)
    nf_c_2_r_2_5_reporter_state_province = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_6_reporter_postcode = models.CharField(null=True, max_length=15)
    nf_c_2_r_2_6_reporter_postcode = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_7_reporter_telephone = models.CharField(null=True, max_length=33)
    nf_c_2_r_2_7_reporter_telephone = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_3_reporter_country_code = models.CharField(null=True, max_length=2)  # st
    c_2_r_4_qualification = models.IntegerField(null=True, choices=enums.C_2_r_4_qualification)
    nf_c_2_r_4_qualification = models.CharField(null=True, choices=[NF.UNK])
    c_2_r_5_primary_source_regulatory_purposes = models.IntegerField(null=True, choices=enums.C_2_r_5_primary_source_regulatory_purposes)


class C_3_information_sender_case_safety_report(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_3_information_sender_case_safety_report'
    )
    c_3_1_sender_type = models.IntegerField(null=True, choices=enums.C_3_1_sender_type)
    c_3_2_sender_organisation = models.CharField(null=True, max_length=100)
    c_3_3_1_sender_department = models.CharField(null=True, max_length=60)
    c_3_3_2_sender_title = models.CharField(null=True, max_length=50)
    c_3_3_3_sender_given_name = models.CharField(null=True, max_length=60)
    c_3_3_4_sender_middle_name = models.CharField(null=True, max_length=60)
    c_3_3_5_sender_family_name = models.CharField(null=True, max_length=60)
    c_3_4_1_sender_street_address = models.CharField(null=True, max_length=100)
    c_3_4_2_sender_city = models.CharField(null=True, max_length=35)
    c_3_4_3_sender_state_province = models.CharField(null=True, max_length=40)
    c_3_4_4_sender_postcode = models.CharField(null=True, max_length=15)
    c_3_4_5_sender_country_code = models.CharField(null=True, max_length=2)  # st
    c_3_4_6_sender_telephone = models.CharField(null=True, max_length=33)
    c_3_4_7_sender_fax = models.CharField(null=True, max_length=33)
    c_3_4_8_sender_email = models.CharField(null=True, max_length=100)


class C_4_r_literature_reference(StorageModel):
    class Meta: pass

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_4_r_literature_reference'
    )
    c_4_r_1_literature_reference = models.CharField(null=True, max_length=500)
    nf_c_4_r_1_literature_reference = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    # file: c_4_r_2_included_documents


class C_5_study_identification(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_5_study_identification'
    )
    c_5_2_study_name = models.CharField(null=True, max_length=2000)
    nf_c_5_2_study_name = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_3_sponsor_study_number = models.CharField(null=True, max_length=50)
    nf_c_5_3_sponsor_study_number = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_4_study_type_reaction = models.IntegerField(null=True, choices=enums.C_5_4_study_type_reaction)


class C_5_1_r_study_registration(StorageModel):
    class Meta: pass

    c_5_study_identification = models.ForeignKey(
        to=C_5_study_identification,
        on_delete=models.CASCADE,
        related_name='c_5_1_r_study_registration'
    )
    c_5_1_r_1_study_registration_number = models.CharField(null=True, max_length=50)
    nf_c_5_1_r_1_study_registration_number = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_1_r_2_study_registration_country = models.CharField(null=True, max_length=2)  # st
    nf_c_5_1_r_2_study_registration_country = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])


class D_patient_characteristics(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='d_patient_characteristics'
    )
    d_1_patient = models.CharField(null=True)
    nf_d_1_patient = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_1_1_1_medical_record_number_source_gp = models.CharField(null=True)
    nf_d_1_1_1_medical_record_number_source_gp = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_2_medical_record_number_source_specialist = models.CharField(null=True)
    nf_d_1_1_2_medical_record_number_source_specialist = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_3_medical_record_number_source_hospital = models.CharField(null=True)
    nf_d_1_1_3_medical_record_number_source_hospital = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_4_medical_record_number_source_investigation = models.CharField(null=True)
    nf_d_1_1_4_medical_record_number_source_investigation = models.CharField(null=True, choices=[NF.MSK])
    d_2_1_date_birth = models.CharField(null=True)  # dt
    nf_d_2_1_date_birth = models.CharField(null=True, choices=[NF.MSK])
    d_2_2a_age_onset_reaction_num = models.PositiveIntegerField(null=True)
    d_2_2b_age_onset_reaction_unit = models.CharField(null=True)  # st
    d_2_2_1a_gestation_period_reaction_foetus_num = models.PositiveIntegerField(null=True)
    d_2_2_1b_gestation_period_reaction_foetus_unit = models.CharField(null=True)  # st
    d_2_3_patient_age_group = models.CharField(null=True, choices=enums.D_2_3_patient_age_group)
    d_3_body_weight = ext_fields.ArbitraryDecimalField(null=True)
    d_4_height = models.PositiveIntegerField(null=True)
    d_5_sex = models.IntegerField(null=True, choices=enums.D_5_sex)
    nf_d_5_sex = models.CharField(null=True, choices=[NF.MSK, NF.UNK, NF.ASKU, NF.NASK])
    d_6_last_menstrual_period_date = models.CharField(null=True)  # dt
    d_7_2_text_medical_history = models.CharField(null=True)
    nf_d_7_2_text_medical_history = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_7_3_concomitant_therapies = models.BooleanField(null=True, choices=[True])

    # d_9_case_death
    d_9_1_date_death = models.CharField(null=True)  # dt
    nf_d_9_1_date_death = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_9_3_autopsy = models.BooleanField(null=True)
    nf_d_9_3_autopsy = models.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])

    # d_10_information_concerning_parent
    d_10_1_parent_identification = models.CharField(null=True)
    nf_d_10_1_parent_identification = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])

    # d_10_2_parent_age_information
    d_10_2_1_date_birth_parent = models.CharField(null=True)  # dt
    nf_d_10_2_1_date_birth_parent = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_10_2_2_age_parent
    d_10_2_2a_age_parent_num = models.PositiveIntegerField(null=True)
    d_10_2_2b_age_parent_unit = models.CharField(null=True)  # st

    d_10_3_last_menstrual_period_date_parent = models.CharField(null=True)  # dt
    nf_d_10_3_last_menstrual_period_date_parent = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_4_body_weight_parent = ext_fields.ArbitraryDecimalField(null=True)
    d_10_5_height_parent = models.PositiveIntegerField(null=True)
    d_10_6_sex_parent = models.IntegerField(null=True, choices=enums.D_10_6_sex_parent)
    nf_d_10_6_sex_parent = models.CharField(null=True, choices=[NF.UNK, NF.MSK, NF.ASKU, NF.NASK])

    # d_10_7_medical_history_parent
    d_10_7_2_text_medical_history_parent = models.CharField(null=True)


class D_7_1_r_structured_information_medical_history(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_7_1_r_structured_information_medical_history'
    )
    d_7_1_r_1a_meddra_version_medical_history = models.CharField(null=True)  # st
    d_7_1_r_1b_medical_history_meddra_code = models.PositiveIntegerField(null=True)
    d_7_1_r_2_start_date = models.CharField(null=True)  # dt
    nf_d_7_1_r_2_start_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])  # dt
    d_7_1_r_3_continuing = models.BooleanField(null=True)
    nf_d_7_1_r_3_continuing = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_7_1_r_4_end_date = models.CharField(null=True)  # dt
    nf_d_7_1_r_4_end_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])  # dt
    d_7_1_r_5_comments = models.CharField(null=True)
    d_7_1_r_6_family_history = models.BooleanField(null=True, choices=[True])


class D_8_r_past_drug_history(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_8_r_past_drug_history'
    )
    d_8_r_1_name_drug = models.CharField(null=True)
    nf_d_8_r_1_name_drug = models.CharField(null=True, choices=[NF.UNK, NF.NA])
    d_8_r_2a_mpid_version = models.CharField(null=True)  # st
    d_8_r_2b_mpid = models.CharField(null=True)  # st
    d_8_r_3a_phpid_version = models.CharField(null=True)  # st
    d_8_r_3b_phpid = models.CharField(null=True)  # st
    d_8_r_4_start_date = models.CharField(null=True)  # dt
    nf_d_8_r_4_start_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_8_r_5_end_date = models.CharField(null=True)  # dt
    nf_d_8_r_5_end_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_8_r_6a_meddra_version_indication = models.CharField(null=True)  # st
    d_8_r_6b_indication_meddra_code = models.PositiveIntegerField(null=True)
    d_8_r_7a_meddra_version_reaction = models.CharField(null=True)  # st
    d_8_r_7b_reaction_meddra_code = models.PositiveIntegerField(null=True)


class D_9_2_r_cause_death(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_9_2_r_cause_death'
    )
    d_9_2_r_1a_meddra_version_cause_death = models.CharField(null=True)  # st
    d_9_2_r_1b_cause_death_meddra_code = models.PositiveIntegerField(null=True)
    d_9_2_r_2_cause_death = models.CharField(null=True)


class D_9_4_r_autopsy_determined_cause_death(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_9_4_r_autopsy_determined_cause_death'
    )
    d_9_4_r_1a_meddra_version_autopsy_determined_cause_death = models.CharField(null=True)  # st
    d_9_4_r_1b_autopsy_determined_cause_death_meddra_code = models.PositiveIntegerField(null=True)
    d_9_4_r_2_autopsy_determined_cause_death = models.CharField(null=True)


class D_10_7_1_r_structured_information_parent_meddra_code(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_10_7_1_r_structured_information_parent_meddra_code'
    )
    d_10_7_1_r_1a_meddra_version_medical_history = models.CharField(null=True)  # st
    d_10_7_1_r_1b_medical_history_meddra_code = models.PositiveIntegerField(null=True)
    d_10_7_1_r_2_start_date = models.CharField(null=True)  # dt
    nf_d_10_7_1_r_2_start_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_7_1_r_3_continuing = models.BooleanField(null=True)
    nf_d_10_7_1_r_3_continuing = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    d_10_7_1_r_4_end_date = models.CharField(null=True)  # dt
    nf_d_10_7_1_r_4_end_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_7_1_r_5_comments = models.CharField(null=True)


class D_10_8_r_past_drug_history_parent(StorageModel):
    class Meta: pass

    d_patient_characteristics = models.ForeignKey(
        to=D_patient_characteristics,
        on_delete=models.CASCADE,
        related_name='d_10_8_r_past_drug_history_parent'
    )
    d_10_8_r_1_name_drug = models.CharField(null=True)

    # d_10_8_r_2_mpid
    d_10_8_r_2a_mpid_version = models.CharField(null=True)  # st
    d_10_8_r_2b_mpid = models.CharField(null=True)  # st

    # d_10_8_r_3_phpid
    d_10_8_r_3a_phpid_version = models.CharField(null=True)  # st
    d_10_8_r_3b_phpid = models.CharField(null=True)  # st

    d_10_8_r_4_start_date = models.CharField(null=True)  # dt
    nf_d_10_8_r_4_start_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_10_8_r_5_end_date = models.CharField(null=True)  # dt
    nf_d_10_8_r_5_end_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_10_8_r_6_indication_meddra_code
    d_10_8_r_6a_meddra_version_indication = models.CharField(null=True)  # st
    d_10_8_r_6b_indication_meddra_code = models.PositiveIntegerField(null=True)

    # d_10_8_r_7_reactions_meddra_code
    d_10_8_r_7a_meddra_version_reaction = models.CharField(null=True)  # st
    d_10_8_r_7b_reactions_meddra_code = models.PositiveIntegerField(null=True)
