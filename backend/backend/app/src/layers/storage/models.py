from django.db import models

from app.src.shared import enums
from app.src.shared.enums import NullFlavor
from extensions.django.constraints import add_choices_constraint, add_any_null_constraint, add_unique_together_constraint
from extensions.django.models import ModelWithTempRelationsSupport, PrefixedFieldUtils


DATETIME_MAX_LENGTH = 24
NULL_FLAVOR_MAX_LENGTH = 4


null_flavor_field_utils = PrefixedFieldUtils('nf_')


def add_null_flavor_constraint(meta_cls: type, field_name: str) -> None:
    add_any_null_constraint(meta_cls, field_name, null_flavor_field_utils.make_special_field_name(field_name))


class StorageModel(ModelWithTempRelationsSupport):
    class Meta:
        abstract = True


class ICSR(StorageModel):
    pass


class C_1_identification_case_safety_report(StorageModel):
    class Meta:
        pass

    icsr = models.OneToOneField(
        to=ICSR,
        on_delete=models.CASCADE,
        related_name='c_1_identification_case_safety_report'
    )

    c_1_1_sender_safety_report_unique_id = models.CharField(null=True, unique=True, max_length=100)

    c_1_2_date_creation = models.CharField(null=True, max_length=DATETIME_MAX_LENGTH)

    c_1_3_type_report = models.IntegerField(null=True)
    add_choices_constraint(Meta, 'c_1_3_type_report', enums.C_1_3_type_report)

    c_1_4_date_report_first_received_source = models.CharField(null=True, max_length=DATETIME_MAX_LENGTH)

    c_1_5_date_most_recent_information = models.CharField(null=True, max_length=DATETIME_MAX_LENGTH)

    c_1_6_1_additional_documents_available = models.BooleanField(null=True)

    c_1_7_fulfil_local_criteria_expedited_report = models.BooleanField(null=True)
    nf_c_1_7_fulfil_local_criteria_expedited_report = models.CharField(null=True, max_length=NULL_FLAVOR_MAX_LENGTH)
    add_choices_constraint(Meta, 'nf_c_1_7_fulfil_local_criteria_expedited_report', [NullFlavor.NI])
    add_null_flavor_constraint(Meta, 'c_1_7_fulfil_local_criteria_expedited_report')

    c_1_8_1_worldwide_unique_case_identification_number = models.CharField(null=True, unique=True, max_length=100)

    c_1_8_2_first_sender = models.IntegerField(null=True)
    add_choices_constraint(Meta, 'c_1_8_2_first_sender', enums.C_1_8_2_first_sender)

    c_1_9_1_other_case_ids_previous_transmissions = models.BooleanField(null=True)
    add_choices_constraint(Meta, 'c_1_9_1_other_case_ids_previous_transmissions', [True])
    nf_c_1_9_1_other_case_ids_previous_transmissions = models.CharField(null=True, max_length=NULL_FLAVOR_MAX_LENGTH)
    add_choices_constraint(Meta, 'nf_c_1_9_1_other_case_ids_previous_transmissions', [NullFlavor.NI])
    add_null_flavor_constraint(Meta, 'c_1_9_1_other_case_ids_previous_transmissions')

    c_1_11_1_report_nullification_amendment = models.IntegerField(null=True)
    add_choices_constraint(Meta, 'c_1_11_1_report_nullification_amendment', enums.C_1_11_1_report_nullification_amendment)

    c_1_11_2_reason_nullification_amendment = models.CharField(null=True, max_length=2000)


class C_1_6_1_r_documents_held_sender(StorageModel):
    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_6_1_r_documents_held_sender'
    )

    c_1_6_1_r_1_documents_held_sender = models.CharField(null=True, max_length=2000)


class C_1_9_1_r_source_case_id(StorageModel):
    class Meta:
        pass

    add_unique_together_constraint(
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
    class Meta:
        pass

    add_unique_together_constraint(
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
