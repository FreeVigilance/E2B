# Generated by Django 5.0.2 on 2024-03-16 20:03

import app.src.enums
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_c_1_identification_case_safety_report_nf_c_1_7_fulfil_local_criteria_expedited_report_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='c_1_11_1_report_nullification_amendment',
            field=models.IntegerField(choices=[(app.src.enums.C_1_11_1_report_nullification_amendment['NULLIFICATION'], app.src.enums.C_1_11_1_report_nullification_amendment['NULLIFICATION']), (app.src.enums.C_1_11_1_report_nullification_amendment['AMENDMENT'], app.src.enums.C_1_11_1_report_nullification_amendment['AMENDMENT'])], null=True),
        ),
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='c_1_3_type_report',
            field=models.IntegerField(choices=[(app.src.enums.C_1_3_type_report['SPONTANEOUS_REPORT'], app.src.enums.C_1_3_type_report['SPONTANEOUS_REPORT']), (app.src.enums.C_1_3_type_report['REPORT_FROM_STUDY'], app.src.enums.C_1_3_type_report['REPORT_FROM_STUDY']), (app.src.enums.C_1_3_type_report['OTHER'], app.src.enums.C_1_3_type_report['OTHER']), (app.src.enums.C_1_3_type_report['NOT_AVAILABLE_TO_SENDER'], app.src.enums.C_1_3_type_report['NOT_AVAILABLE_TO_SENDER'])], null=True),
        ),
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='c_1_8_2_first_sender',
            field=models.IntegerField(choices=[(app.src.enums.C_1_8_2_first_sender['REGULATOR'], app.src.enums.C_1_8_2_first_sender['REGULATOR']), (app.src.enums.C_1_8_2_first_sender['OTHER'], app.src.enums.C_1_8_2_first_sender['OTHER'])], null=True),
        ),
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='c_1_9_1_other_case_ids_previous_transmissions',
            field=models.BooleanField(choices=[(True, True)], null=True),
        ),
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='nf_c_1_7_fulfil_local_criteria_expedited_report',
            field=models.CharField(choices=[(app.src.enums.NullFlavor['NI'], app.src.enums.NullFlavor['NI'])], null=True),
        ),
        migrations.AlterField(
            model_name='c_1_identification_case_safety_report',
            name='nf_c_1_9_1_other_case_ids_previous_transmissions',
            field=models.CharField(choices=[(app.src.enums.NullFlavor['NI'], app.src.enums.NullFlavor['NI'])], null=True),
        ),
    ]
