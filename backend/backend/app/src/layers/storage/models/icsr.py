from django.db import models

from app.src import enums
from app.src.enums import NullFlavor as NF
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
            if not field.choices:
                raise ValueError(f'Null flavor field {field_name} must have choices restriction')

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


# C_1_identification_case_safety_report


class C_1_identification_case_safety_report(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_1_identification_case_safety_report'
    )

    c_1_1_sender_safety_report_unique_id = models.CharField(null=True, unique=True)
    c_1_2_date_creation = models.CharField(null=True)  # dt
    c_1_3_type_report = models.IntegerField(null=True, choices=enums.C_1_3_type_report)
    c_1_4_date_report_first_received_source = models.CharField(null=True)  # dt
    c_1_5_date_most_recent_information = models.CharField(null=True)  # dt

    # c_1_6_additional_available_documents_held_sender
    c_1_6_1_additional_documents_available = models.BooleanField(null=True)

    c_1_7_fulfil_local_criteria_expedited_report = models.BooleanField(null=True)
    nf_c_1_7_fulfil_local_criteria_expedited_report = models.CharField(null=True, choices=[NF.NI])

    # c_1_8_worldwide_unique_case_identification
    c_1_8_1_worldwide_unique_case_identification_number = models.CharField(null=True, unique=True)
    c_1_8_2_first_sender = models.IntegerField(null=True, choices=enums.C_1_8_2_first_sender)

    # c_1_9_other_case_ids
    c_1_9_1_other_case_ids_previous_transmissions = models.BooleanField(null=True, choices=[True])
    nf_c_1_9_1_other_case_ids_previous_transmissions = models.CharField(null=True, choices=[NF.NI])

    # c_1_11_report_nullification_amendment
    c_1_11_1_report_nullification_amendment = models.IntegerField(null=True, choices=enums.C_1_11_1_report_nullification_amendment)
    c_1_11_2_reason_nullification_amendment = models.CharField(null=True)


class C_1_6_1_r_documents_held_sender(StorageModel):
    class Meta: pass

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_6_1_r_documents_held_sender'
    )

    c_1_6_1_r_1_documents_held_sender = models.CharField(null=True)
    # file: c_1_6_1_r_2_included_documents


class C_1_9_1_r_source_case_id(StorageModel):
    class Meta: pass

    ext_cons.add_unique_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_9_1_r_2_case_id'
    )

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_9_1_r_source_case_id'
    )

    c_1_9_1_r_1_source_case_id = models.CharField(null=True)
    c_1_9_1_r_2_case_id = models.CharField(null=True)


class C_1_10_r_identification_number_report_linked(StorageModel):
    class Meta: pass

    ext_cons.add_unique_constraint(
        Meta,
        'c_1_identification_case_safety_report',
        'c_1_10_r_identification_number_report_linked'
    )

    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_10_r_identification_number_report_linked'
    )

    c_1_10_r_identification_number_report_linked = models.CharField(null=True)


# C_2_r_primary_source_information


class C_2_r_primary_source_information(StorageModel):
    class Meta: pass

    ext_cons.add_unique_constraint(
        Meta,
        'icsr',
        'c_2_r_5_primary_source_regulatory_purposes'
    )

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_2_r_primary_source_information'
    )

    # c_2_r_1_reporter_name
    c_2_r_1_1_reporter_title = models.CharField(null=True)
    nf_c_2_r_1_1_reporter_title = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])
    c_2_r_1_2_reporter_given_name = models.CharField(null=True)
    nf_c_2_r_1_2_reporter_given_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_3_reporter_middle_name = models.CharField(null=True)
    nf_c_2_r_1_3_reporter_middle_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_1_4_reporter_family_name = models.CharField(null=True)
    nf_c_2_r_1_4_reporter_family_name = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # c_2_r_2_reporter_address_telephone
    c_2_r_2_1_reporter_organisation = models.CharField(null=True)
    nf_c_2_r_2_1_reporter_organisation = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_2_reporter_department = models.CharField(null=True)
    nf_c_2_r_2_2_reporter_department = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_3_reporter_street = models.CharField(null=True)
    nf_c_2_r_2_3_reporter_street = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_4_reporter_city = models.CharField(null=True)
    nf_c_2_r_2_4_reporter_city = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_5_reporter_state_province = models.CharField(null=True)
    nf_c_2_r_2_5_reporter_state_province = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_6_reporter_postcode = models.CharField(null=True)
    nf_c_2_r_2_6_reporter_postcode = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    c_2_r_2_7_reporter_telephone = models.CharField(null=True)
    nf_c_2_r_2_7_reporter_telephone = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    c_2_r_3_reporter_country_code = models.CharField(null=True)  # st
    c_2_r_4_qualification = models.IntegerField(null=True, choices=enums.C_2_r_4_qualification)
    nf_c_2_r_4_qualification = models.CharField(null=True, choices=[NF.UNK])
    c_2_r_5_primary_source_regulatory_purposes = models.IntegerField(null=True, choices=enums.C_2_r_5_primary_source_regulatory_purposes)


# C_3_information_sender_case_safety_report


class C_3_information_sender_case_safety_report(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_3_information_sender_case_safety_report'
    )

    c_3_1_sender_type = models.IntegerField(null=True, choices=enums.C_3_1_sender_type)
    c_3_2_sender_organisation = models.CharField(null=True)

    # c_3_3_person_responsible_sending_report
    c_3_3_1_sender_department = models.CharField(null=True)
    c_3_3_2_sender_title = models.CharField(null=True)
    c_3_3_3_sender_given_name = models.CharField(null=True)
    c_3_3_4_sender_middle_name = models.CharField(null=True)
    c_3_3_5_sender_family_name = models.CharField(null=True)

    # c_3_4_sender_address_fax_telephone_email
    c_3_4_1_sender_street_address = models.CharField(null=True)
    c_3_4_2_sender_city = models.CharField(null=True)
    c_3_4_3_sender_state_province = models.CharField(null=True)
    c_3_4_4_sender_postcode = models.CharField(null=True)
    c_3_4_5_sender_country_code = models.CharField(null=True)  # st
    c_3_4_6_sender_telephone = models.CharField(null=True)
    c_3_4_7_sender_fax = models.CharField(null=True)
    c_3_4_8_sender_email = models.CharField(null=True)


# C_4_r_literature_reference


class C_4_r_literature_reference(StorageModel):
    class Meta: pass

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_4_r_literature_reference'
    )

    c_4_r_1_literature_reference = models.CharField(null=True)
    nf_c_4_r_1_literature_reference = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    # file: c_4_r_2_included_documents


# C_5_study_identification

class C_5_study_identification(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_5_study_identification'
    )

    c_5_2_study_name = models.CharField(null=True)
    nf_c_5_2_study_name = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_3_sponsor_study_number = models.CharField(null=True)
    nf_c_5_3_sponsor_study_number = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_4_study_type_reaction = models.IntegerField(null=True, choices=enums.C_5_4_study_type_reaction)


class C_5_1_r_study_registration(StorageModel):
    class Meta: pass

    c_5_study_identification = models.ForeignKey(
        to=C_5_study_identification,
        on_delete=models.CASCADE,
        related_name='c_5_1_r_study_registration'
    )

    c_5_1_r_1_study_registration_number = models.CharField(null=True)
    nf_c_5_1_r_1_study_registration_number = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])
    c_5_1_r_2_study_registration_country = models.CharField(null=True)  # st
    nf_c_5_1_r_2_study_registration_country = models.CharField(null=True, choices=[NF.ASKU, NF.NASK])


# D_patient_characteristics


class D_patient_characteristics(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='d_patient_characteristics'
    )

    d_1_patient = models.CharField(null=True)
    nf_d_1_patient = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK, NF.UNK])

    # d_1_1_medical_record_number_source
    d_1_1_1_medical_record_number_source_gp = models.CharField(null=True)
    nf_d_1_1_1_medical_record_number_source_gp = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_2_medical_record_number_source_specialist = models.CharField(null=True)
    nf_d_1_1_2_medical_record_number_source_specialist = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_3_medical_record_number_source_hospital = models.CharField(null=True)
    nf_d_1_1_3_medical_record_number_source_hospital = models.CharField(null=True, choices=[NF.MSK])
    d_1_1_4_medical_record_number_source_investigation = models.CharField(null=True)
    nf_d_1_1_4_medical_record_number_source_investigation = models.CharField(null=True, choices=[NF.MSK])

    # d_2_age_information

    d_2_1_date_birth = models.CharField(null=True)  # dt
    nf_d_2_1_date_birth = models.CharField(null=True, choices=[NF.MSK])

    # d_2_2_age_onset_reaction

    d_2_2a_age_onset_reaction_num = models.PositiveIntegerField(null=True)
    d_2_2b_age_onset_reaction_unit = models.CharField(null=True)  # st

    # d_2_2_1_gestation_period_reaction_foetus
    d_2_2_1a_gestation_period_reaction_foetus_num = models.PositiveIntegerField(null=True)
    d_2_2_1b_gestation_period_reaction_foetus_unit = models.CharField(null=True)  # st

    d_2_3_patient_age_group = models.CharField(null=True, choices=enums.D_2_3_patient_age_group)

    d_3_body_weight = ext_fields.ArbitraryDecimalField(null=True)
    d_4_height = models.PositiveIntegerField(null=True)
    d_5_sex = models.IntegerField(null=True, choices=enums.D_5_sex)
    nf_d_5_sex = models.CharField(null=True, choices=[NF.MSK, NF.UNK, NF.ASKU, NF.NASK])
    d_6_last_menstrual_period_date = models.CharField(null=True)  # dt

    # d_7_medical_history
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

    # d_8_r_2_mpid
    d_8_r_2a_mpid_version = models.CharField(null=True)  # st
    d_8_r_2b_mpid = models.CharField(null=True)  # st

    # d_8_r_3_phpid
    d_8_r_3a_phpid_version = models.CharField(null=True)  # st
    d_8_r_3b_phpid = models.CharField(null=True)  # st

    d_8_r_4_start_date = models.CharField(null=True)  # dt
    nf_d_8_r_4_start_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    d_8_r_5_end_date = models.CharField(null=True)  # dt
    nf_d_8_r_5_end_date = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # d_8_r_6_indication_meddra_code
    d_8_r_6a_meddra_version_indication = models.CharField(null=True)  # st
    d_8_r_6b_indication_meddra_code = models.PositiveIntegerField(null=True)

    # d_8_r_7_reaction_meddra_code
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


# E_i_reaction_event


class E_i_reaction_event(StorageModel):
    class Meta: pass

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='e_i_reaction_event'
    )

    # e_i_1_reaction_primary_source

    # e_i_1_1_reaction_primary_source_native_language
    e_i_1_1a_reaction_primary_source_native_language = models.CharField(null=True)
    e_i_1_1b_reaction_primary_source_language = models.CharField(null=True)  # st

    e_i_1_2_reaction_primary_source_translation = models.CharField(null=True)

    # e_i_2_1_reaction_meddra_code
    e_i_2_1a_meddra_version_reaction = models.CharField(null=True)  # st
    e_i_2_1b_reaction_meddra_code = models.PositiveIntegerField(null=True)

    e_i_3_1_term_highlighted_reporter = models.IntegerField(null=True, choices=enums.E_i_3_1_term_highlighted_reporter)

    # e_i_3_2_seriousness_criteria_event_level
    e_i_3_2a_results_death = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2a_results_death = models.CharField(null=True, choices=[NF.NI])
    e_i_3_2b_life_threatening = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2b_life_threatening = models.CharField(null=True, choices=[NF.NI])
    e_i_3_2c_caused_prolonged_hospitalisation = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2c_caused_prolonged_hospitalisation = models.CharField(null=True, choices=[NF.NI])
    e_i_3_2d_disabling_incapacitating = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2d_disabling_incapacitating = models.CharField(null=True, choices=[NF.NI])
    e_i_3_2e_congenital_anomaly_birth_defect = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2e_congenital_anomaly_birth_defect = models.CharField(null=True, choices=[NF.NI])
    e_i_3_2f_other_medically_important_condition = models.BooleanField(null=True, choices=[True])
    nf_e_i_3_2f_other_medically_important_condition = models.CharField(null=True, choices=[NF.NI])

    e_i_4_date_start_reaction = models.CharField(null=True)  # dt
    nf_e_i_4_date_start_reaction = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    e_i_5_date_end_reaction = models.CharField(null=True)  # dt
    nf_e_i_5_date_end_reaction = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # e_i_6_duration_reaction
    e_i_6a_duration_reaction_num = models.PositiveIntegerField(null=True)
    e_i_6b_duration_reaction_unit = models.CharField(null=True)  # st

    e_i_7_outcome_reaction_last_observation = models.IntegerField(null=True, choices=enums.E_i_7_outcome_reaction_last_observation)
    e_i_8_medical_confirmation_healthcare_professional = models.BooleanField(null=True)
    e_i_9_identification_country_reaction = models.CharField(null=True)  # st


# F_r_results_tests_procedures_investigation_patient


class F_r_results_tests_procedures_investigation_patient(StorageModel):
    class Meta: pass

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='f_r_results_tests_procedures_investigation_patient'
    )

    f_r_1_test_date = models.CharField(null=True)  # dt
    nf_f_r_1_test_date = models.CharField(null=True, choices=[NF.UNK])  # dt

    # f_r_2_test_name

    f_r_2_1_test_name = models.CharField(null=True)

    # f_r_2_2_test_name_meddra_code
    f_r_2_2a_meddra_version_test_name = models.CharField(null=True)  # st
    f_r_2_2b_test_name_meddra_code = models.PositiveIntegerField(null=True)

    # f_r_3_test_result
    f_r_3_1_test_result_code = models.IntegerField(null=True, choices=enums.F_r_3_1_test_result_code)
    f_r_3_2_test_result_val_qual = ext_fields.ArbitraryDecimalField(null=True)  # TODO: check how qualifiers are used
    nf_f_r_3_2_test_result_val_qual = models.CharField(null=True, choices=[NF.NINF, NF.PINF])
    f_r_3_3_test_result_unit = models.CharField(null=True)  # st
    f_r_3_4_result_unstructured_data = models.CharField(null=True)

    f_r_4_normal_low_value = models.CharField(null=True)
    f_r_5_normal_high_value = models.CharField(null=True)
    f_r_6_comments = models.CharField(null=True)
    f_r_7_more_information_available = models.BooleanField(null=True)


# G_k_drug_information


class G_k_drug_information(StorageModel):
    class Meta: pass

    icsr = models.ForeignKey(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='g_k_drug_information'
    )

    g_k_1_characterisation_drug_role = models.IntegerField(null=True, choices=enums.G_k_1_characterisation_drug_role)

    # g_k_2_drug_identification

    # g_k_2_1_mpid_phpid
    g_k_2_1_1a_mpid_version = models.CharField(null=True)  # st
    g_k_2_1_1b_mpid = models.CharField(null=True)  # st
    g_k_2_1_2a_phpid_version = models.CharField(null=True)  # st
    g_k_2_1_2b_phpid = models.CharField(null=True)  # st

    g_k_2_2_medicinal_product_name_primary_source = models.CharField(null=True)
    g_k_2_4_identification_country_drug_obtained = models.CharField(null=True)  # st
    g_k_2_5_investigational_product_blinded = models.BooleanField(null=True, choices=[True])

    # g_k_3_holder_authorisation_application_number_drug
    g_k_3_1_authorisation_application_number = models.CharField(null=True)  # st
    g_k_3_2_country_authorisation_application = models.CharField(null=True)  # st
    g_k_3_3_name_holder_applicant = models.CharField(null=True)

    # g_k_5_cumulative_dose_first_reaction
    g_k_5a_cumulative_dose_first_reaction_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_5b_cumulative_dose_first_reaction_unit = models.CharField(null=True)  # st

    # g_k_6_gestation_period_exposure
    g_k_6a_gestation_period_exposure_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_6b_gestation_period_exposure_unit = models.CharField(null=True)  # st

    g_k_8_action_taken_drug = models.IntegerField(null=True, choices=enums.G_k_8_action_taken_drug)

    g_k_11_additional_information_drug = models.CharField(null=True)


class G_k_2_3_r_substance_id_strength(StorageModel):
    class Meta: pass

    g_k_drug_information = models.ForeignKey(
        to=G_k_drug_information,
        on_delete=models.CASCADE,
        related_name='g_k_2_3_r_substance_id_strength'
    )

    g_k_2_3_r_1_substance_name = models.CharField(null=True)
    g_k_2_3_r_2a_substance_termid_version = models.CharField(null=True)  # st
    g_k_2_3_r_2b_substance_termid = models.CharField(null=True)  # st
    g_k_2_3_r_3a_strength_num = ext_fields.ArbitraryDecimalField(null=True)  # TODO: int or decimal?
    g_k_2_3_r_3b_strength_unit = models.CharField(null=True)  # st


class G_k_4_r_dosage_information(StorageModel):
    class Meta: pass

    g_k_drug_information = models.ForeignKey(
        to=G_k_drug_information,
        on_delete=models.CASCADE,
        related_name='g_k_4_r_dosage_information'
    )

    g_k_4_r_1a_dose_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_4_r_1b_dose_unit = models.CharField(null=True)  # st
    g_k_4_r_2_number_units_interval = ext_fields.ArbitraryDecimalField(null=True)
    g_k_4_r_3_definition_interval_unit = models.CharField(null=True)  # st
    g_k_4_r_4_date_time_drug = models.CharField(null=True)  # dt
    nf_g_k_4_r_4_date_time_drug = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])
    g_k_4_r_5_date_time_last_administration = models.CharField(null=True)  # dt
    nf_g_k_4_r_5_date_time_last_administration = models.CharField(null=True, choices=[NF.MSK, NF.ASKU, NF.NASK])

    # g_k_4_r_6_duration_drug_administration
    g_k_4_r_6a_duration_drug_administration_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_4_r_6b_duration_drug_administration_unit = models.CharField(null=True)  # st

    g_k_4_r_7_batch_lot_number = models.CharField(null=True)
    g_k_4_r_8_dosage_text = models.CharField(null=True)

    # g_k_4_r_9_pharmaceutical_dose_form

    g_k_4_r_9_1_pharmaceutical_dose_form = models.CharField(null=True)
    nf_g_k_4_r_9_1_pharmaceutical_dose_form = models.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_9_2a_pharmaceutical_dose_form_termid_version = models.CharField(null=True)  # st
    g_k_4_r_9_2b_pharmaceutical_dose_form_termid = models.CharField(null=True)  # st

    # g_k_4_r_10_route_administration
    g_k_4_r_10_1_route_administration = models.CharField(null=True)
    nf_g_k_4_r_10_1_route_administration = models.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_10_2a_route_administration_termid_version = models.CharField(null=True)  # st
    g_k_4_r_10_2b_route_administration_termid = models.CharField(null=True)  # st

    # g_k_4_r_11_parent_route_administration
    g_k_4_r_11_1_parent_route_administration = models.CharField(null=True)
    nf_g_k_4_r_11_1_parent_route_administration = models.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])
    g_k_4_r_11_2a_parent_route_administration_termid_version = models.CharField(null=True)  # st
    g_k_4_r_11_2b_parent_route_administration_termid = models.CharField(null=True)  # st


class G_k_7_r_indication_use_case(StorageModel):
    class Meta: pass

    g_k_drug_information = models.ForeignKey(
        to=G_k_drug_information,
        on_delete=models.CASCADE,
        related_name='g_k_7_r_indication_use_case'
    )

    g_k_7_r_1_indication_primary_source = models.CharField(null=True)
    nf_g_k_7_r_1_indication_primary_source = models.CharField(null=True, choices=[NF.ASKU, NF.NASK, NF.UNK])

    # g_k_7_r_2_indication_meddra_code
    g_k_7_r_2a_meddra_version_indication = models.CharField(null=True)  # st
    g_k_7_r_2b_indication_meddra_code = models.PositiveIntegerField(null=True)


class G_k_9_i_drug_reaction_matrix(StorageModel):
    class Meta: pass

    g_k_drug_information = models.ForeignKey(
        to=G_k_drug_information,
        on_delete=models.CASCADE,
        related_name='g_k_9_i_drug_reaction_matrix'
    )

    g_k_9_i_1_reaction_assessed = models.ForeignKey(
        to=E_i_reaction_event,
        on_delete=models.CASCADE,
        related_name='+'
    )

    # g_k_9_i_3_interval_drug_administration_reaction
    g_k_9_i_3_1a_interval_drug_administration_reaction_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_9_i_3_1b_interval_drug_administration_reaction_unit = models.CharField(null=True)  # st
    g_k_9_i_3_2a_interval_last_dose_drug_reaction_num = ext_fields.ArbitraryDecimalField(null=True)
    g_k_9_i_3_2b_interval_last_dose_drug_reaction_unit = models.CharField(null=True)  # st

    g_k_9_i_4_reaction_recur_readministration = models.IntegerField(null=True, choices=enums.G_k_9_i_4_reaction_recur_readministration)


class G_k_9_i_2_r_assessment_relatedness_drug_reaction(StorageModel):
    class Meta: pass

    g_k_9_i_drug_reaction_matrix = models.ForeignKey(
        to=G_k_9_i_drug_reaction_matrix,
        on_delete=models.CASCADE,
        related_name='g_k_9_i_2_r_assessment_relatedness_drug_reaction'
    )

    g_k_9_i_2_r_1_source_assessment = models.CharField(null=True)
    g_k_9_i_2_r_2_method_assessment = models.CharField(null=True)
    g_k_9_i_2_r_3_result_assessment = models.CharField(null=True)


class G_k_10_r_additional_information_drug(StorageModel):
    class Meta: pass

    g_k_drug_information = models.ForeignKey(
        to=G_k_drug_information,
        on_delete=models.CASCADE,
        related_name='g_k_10_r_additional_information_drug'
    )

    g_k_10_r_additional_information_drug = models.IntegerField(null=True, choices=enums.G_k_10_r_additional_information_drug)


# H_narrative_case_summary


class H_narrative_case_summary(StorageModel):
    class Meta: pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='h_narrative_case_summary'
    )

    h_1_case_narrative = models.CharField(null=True)
    h_2_reporter_comments = models.CharField(null=True)

    h_4_sender_comments = models.CharField(null=True)


class H_3_r_sender_diagnosis_meddra_code(StorageModel):
    class Meta: pass

    h_narrative_case_summary = models.ForeignKey(
        to=H_narrative_case_summary,
        on_delete=models.CASCADE,
        related_name='h_3_r_sender_diagnosis_meddra_code'
    )

    h_3_r_1a_meddra_version_sender_diagnosis = models.CharField(null=True)  # st
    h_3_r_1b_sender_diagnosis_meddra_code = models.PositiveIntegerField(null=True)


class H_5_r_case_summary_reporter_comments_native_language(StorageModel):
    class Meta: pass

    h_narrative_case_summary = models.ForeignKey(
        to=H_narrative_case_summary,
        on_delete=models.CASCADE,
        related_name='h_5_r_case_summary_reporter_comments_native_language'
    )

    h_5_r_1a_case_summary_reporter_comments_text = models.CharField(null=True)
    h_5_r_1b_case_summary_reporter_comments_language = models.CharField(null=True)  # st
