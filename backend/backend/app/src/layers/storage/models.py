from django.db import models

from app.src.shared import enums
from app.src.shared.enums import NullFlavor as NF
from extensions.django import constraints as ext_constraints
from extensions.django import fields as ext_fields
from extensions.django import models as ext_models


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
            ext_constraints.add_any_null_constraint(meta, base_field_name, field_name)

        return super().__new__(cls, name, bases, attrs, **kwargs)


class StorageModel(ext_models.ModelWithTempRelationSupport, metaclass=StorageModelMeta):
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
    c_1_identification_case_safety_report = models.ForeignKey(
        to=C_1_identification_case_safety_report,
        on_delete=models.CASCADE,
        related_name='c_1_6_1_r_documents_held_sender'
    )
    c_1_6_1_r_1_documents_held_sender = models.CharField(null=True, max_length=2000)


class C_1_9_1_r_source_case_id(StorageModel):
    class Meta:
        pass

    ext_constraints.add_unique_together_constraint(
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

    ext_constraints.add_unique_together_constraint(
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
