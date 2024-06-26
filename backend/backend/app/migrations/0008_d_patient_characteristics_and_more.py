# Generated by Django 5.0.2 on 2024-03-17 16:44

import app.src.enums
import django.db.models.deletion
import extensions.django.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_c_2_r_primary_source_information_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='D_patient_characteristics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_1_patient', models.CharField(null=True)),
                ('nf_d_1_patient', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_1_1_1_medical_record_number_source_gp', models.CharField(null=True)),
                ('nf_d_1_1_1_medical_record_number_source_gp', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK'])], null=True)),
                ('d_1_1_2_medical_record_number_source_specialist', models.CharField(null=True)),
                ('nf_d_1_1_2_medical_record_number_source_specialist', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK'])], null=True)),
                ('d_1_1_3_medical_record_number_source_hospital', models.CharField(null=True)),
                ('nf_d_1_1_3_medical_record_number_source_hospital', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK'])], null=True)),
                ('d_1_1_4_medical_record_number_source_investigation', models.CharField(null=True)),
                ('nf_d_1_1_4_medical_record_number_source_investigation', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK'])], null=True)),
                ('d_2_1_date_birth', models.CharField(null=True)),
                ('nf_d_2_1_date_birth', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK'])], null=True)),
                ('d_2_2a_age_onset_reaction_num', models.PositiveIntegerField(null=True)),
                ('d_2_2b_age_onset_reaction_unit', models.CharField(null=True)),
                ('d_2_2_1a_gestation_period_reaction_foetus_num', models.PositiveIntegerField(null=True)),
                ('d_2_2_1b_gestation_period_reaction_foetus_unit', models.CharField(null=True)),
                ('d_2_3_patient_age_group', models.CharField(choices=[(app.src.enums.D_2_3_patient_age_group['FOETUS'], app.src.enums.D_2_3_patient_age_group['FOETUS']), (app.src.enums.D_2_3_patient_age_group['NEONATE'], app.src.enums.D_2_3_patient_age_group['NEONATE']), (app.src.enums.D_2_3_patient_age_group['INFANT'], app.src.enums.D_2_3_patient_age_group['INFANT']), (app.src.enums.D_2_3_patient_age_group['CHILD'], app.src.enums.D_2_3_patient_age_group['CHILD']), (app.src.enums.D_2_3_patient_age_group['ADOLESCENT'], app.src.enums.D_2_3_patient_age_group['ADOLESCENT']), (app.src.enums.D_2_3_patient_age_group['ADULT'], app.src.enums.D_2_3_patient_age_group['ADULT']), (app.src.enums.D_2_3_patient_age_group['ELDERLY'], app.src.enums.D_2_3_patient_age_group['ELDERLY'])], null=True)),
                ('d_3_body_weight', extensions.django.fields.ArbitraryDecimalField(null=True)),
                ('d_4_height', models.PositiveIntegerField(null=True)),
                ('d_5_sex', models.IntegerField(choices=[(app.src.enums.D_5_sex['MALE'], app.src.enums.D_5_sex['MALE']), (app.src.enums.D_5_sex['FEMALE'], app.src.enums.D_5_sex['FEMALE'])], null=True)),
                ('nf_d_5_sex', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_6_last_menstrual_period_date', models.CharField(null=True)),
                ('d_7_2_text_medical_history', models.CharField(null=True)),
                ('nf_d_7_2_text_medical_history', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_7_3_concomitant_therapies', models.BooleanField(choices=[(True, True)], null=True)),
                ('d_9_1_date_death', models.CharField(null=True)),
                ('nf_d_9_1_date_death', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_9_3_autopsy', models.BooleanField(null=True)),
                ('nf_d_9_3_autopsy', models.CharField(choices=[(app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_10_1_parent_identification', models.CharField(null=True)),
                ('nf_d_10_1_parent_identification', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_10_2_1_date_birth_parent', models.CharField(null=True)),
                ('nf_d_10_2_1_date_birth_parent', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_2_2a_age_parent_num', models.PositiveIntegerField(null=True)),
                ('d_10_2_2b_age_parent_unit', models.CharField(null=True)),
                ('d_10_3_last_menstrual_period_date_parent', models.CharField(null=True)),
                ('nf_d_10_3_last_menstrual_period_date_parent', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_4_body_weight_parent', extensions.django.fields.ArbitraryDecimalField(null=True)),
                ('d_10_5_height_parent', models.PositiveIntegerField(null=True)),
                ('d_10_6_sex_parent', models.IntegerField(choices=[(app.src.enums.D_10_6_sex_parent['MALE'], app.src.enums.D_10_6_sex_parent['MALE']), (app.src.enums.D_10_6_sex_parent['FEMALE'], app.src.enums.D_10_6_sex_parent['FEMALE'])], null=True)),
                ('nf_d_10_6_sex_parent', models.CharField(choices=[(app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK']), (app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_7_2_text_medical_history_parent', models.CharField(null=True)),
                ('icsr', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='d_patient_characteristics', to='app.icsr')),
            ],
        ),
        migrations.CreateModel(
            name='D_9_4_r_autopsy_determined_cause_death',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_9_4_r_1a_meddra_version_autopsy_determined_cause_death', models.CharField(null=True)),
                ('d_9_4_r_1b_autopsy_determined_cause_death_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_9_4_r_2_autopsy_determined_cause_death', models.CharField(null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_9_4_r_autopsy_determined_cause_death', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.CreateModel(
            name='D_9_2_r_cause_death',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_9_2_r_1a_meddra_version_cause_death', models.CharField(null=True)),
                ('d_9_2_r_1b_cause_death_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_9_2_r_2_cause_death', models.CharField(null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_9_2_r_cause_death', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.CreateModel(
            name='D_8_r_past_drug_history',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_8_r_1_name_drug', models.CharField(null=True)),
                ('nf_d_8_r_1_name_drug', models.CharField(choices=[(app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK']), (app.src.enums.NullFlavor['NA'], app.src.enums.NullFlavor['NA'])], null=True)),
                ('d_8_r_2a_mpid_version', models.CharField(null=True)),
                ('d_8_r_2b_mpid', models.CharField(null=True)),
                ('d_8_r_3a_phpid_version', models.CharField(null=True)),
                ('d_8_r_3b_phpid', models.CharField(null=True)),
                ('d_8_r_4_start_date', models.CharField(null=True)),
                ('nf_d_8_r_4_start_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_8_r_5_end_date', models.CharField(null=True)),
                ('nf_d_8_r_5_end_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_8_r_6a_meddra_version_indication', models.CharField(null=True)),
                ('d_8_r_6b_indication_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_8_r_7a_meddra_version_reaction', models.CharField(null=True)),
                ('d_8_r_7b_reaction_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_8_r_past_drug_history', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.CreateModel(
            name='D_7_1_r_structured_information_medical_history',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_7_1_r_1a_meddra_version_medical_history', models.CharField(null=True)),
                ('d_7_1_r_1b_medical_history_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_7_1_r_2_start_date', models.CharField(null=True)),
                ('nf_d_7_1_r_2_start_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_7_1_r_3_continuing', models.BooleanField(null=True)),
                ('nf_d_7_1_r_3_continuing', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_7_1_r_4_end_date', models.CharField(null=True)),
                ('nf_d_7_1_r_4_end_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_7_1_r_5_comments', models.CharField(null=True)),
                ('d_7_1_r_6_family_history', models.BooleanField(choices=[(True, True)], null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_7_1_r_structured_information_medical_history', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.CreateModel(
            name='D_10_8_r_past_drug_history_parent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_10_8_r_1_name_drug', models.CharField(null=True)),
                ('d_10_8_r_2a_mpid_version', models.CharField(null=True)),
                ('d_10_8_r_2b_mpid', models.CharField(null=True)),
                ('d_10_8_r_3a_phpid_version', models.CharField(null=True)),
                ('d_10_8_r_3b_phpid', models.CharField(null=True)),
                ('d_10_8_r_4_start_date', models.CharField(null=True)),
                ('nf_d_10_8_r_4_start_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_8_r_5_end_date', models.CharField(null=True)),
                ('nf_d_10_8_r_5_end_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_8_r_6a_meddra_version_indication', models.CharField(null=True)),
                ('d_10_8_r_6b_indication_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_10_8_r_7a_meddra_version_reaction', models.CharField(null=True)),
                ('d_10_8_r_7b_reactions_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_10_8_r_past_drug_history_parent', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.CreateModel(
            name='D_10_7_1_r_structured_information_parent_meddra_code',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('d_10_7_1_r_1a_meddra_version_medical_history', models.CharField(null=True)),
                ('d_10_7_1_r_1b_medical_history_meddra_code', models.PositiveIntegerField(null=True)),
                ('d_10_7_1_r_2_start_date', models.CharField(null=True)),
                ('nf_d_10_7_1_r_2_start_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_7_1_r_3_continuing', models.BooleanField(null=True)),
                ('nf_d_10_7_1_r_3_continuing', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK']), (app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['UNK'])], null=True)),
                ('d_10_7_1_r_4_end_date', models.CharField(null=True)),
                ('nf_d_10_7_1_r_4_end_date', models.CharField(choices=[(app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['MSK']), (app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['ASKU']), (app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['NASK'])], null=True)),
                ('d_10_7_1_r_5_comments', models.CharField(null=True)),
                ('d_patient_characteristics', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='d_10_7_1_r_structured_information_parent_meddra_code', to='app.d_patient_characteristics')),
            ],
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_1_patient__isnull', True), ('nf_d_1_patient__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_1_patient__nf_d_1_patient'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_1_1_1_medical_record_number_source_gp__isnull', True), ('nf_d_1_1_1_medical_record_number_source_gp__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_1_1_1_medical__nf_d_1_1_1_medic'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_1_1_2_medical_record_number_source_specialist__isnull', True), ('nf_d_1_1_2_medical_record_number_source_specialist__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_1_1_2_medical__nf_d_1_1_2_medic'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_1_1_3_medical_record_number_source_hospital__isnull', True), ('nf_d_1_1_3_medical_record_number_source_hospital__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_1_1_3_medical__nf_d_1_1_3_medic'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_1_1_4_medical_record_number_source_investigation__isnull', True), ('nf_d_1_1_4_medical_record_number_source_investigation__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_1_1_4_medical__nf_d_1_1_4_medic'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_2_1_date_birth__isnull', True), ('nf_d_2_1_date_birth__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_2_1_date_birth__nf_d_2_1_date_bi'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_5_sex__isnull', True), ('nf_d_5_sex__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_5_sex__nf_d_5_sex'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_7_2_text_medical_history__isnull', True), ('nf_d_7_2_text_medical_history__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_7_2_text_medic__nf_d_7_2_text_me'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_9_1_date_death__isnull', True), ('nf_d_9_1_date_death__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_9_1_date_death__nf_d_9_1_date_de'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_9_3_autopsy__isnull', True), ('nf_d_9_3_autopsy__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_9_3_autopsy__nf_d_9_3_autopsy'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_10_1_parent_identification__isnull', True), ('nf_d_10_1_parent_identification__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_10_1_parent_id__nf_d_10_1_parent'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_10_2_1_date_birth_parent__isnull', True), ('nf_d_10_2_1_date_birth_parent__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_10_2_1_date_bi__nf_d_10_2_1_date'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_10_3_last_menstrual_period_date_parent__isnull', True), ('nf_d_10_3_last_menstrual_period_date_parent__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_10_3_last_mens__nf_d_10_3_last_m'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_10_6_sex_parent__isnull', True), ('nf_d_10_6_sex_parent__isnull', True), _connector='OR'), name='anynul__D_patient_charac__d_10_6_sex_paren__nf_d_10_6_sex_pa'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_1_patient__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_patient_characteristics__nf_d_1_patient'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_1_1_1_medical_record_number_source_gp__in', [app.src.enums.NullFlavor['MSK']])), name='choics__D_patient_characteristics__nf_d_1_1_1_medical_record'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_1_1_2_medical_record_number_source_specialist__in', [app.src.enums.NullFlavor['MSK']])), name='choics__D_patient_characteristics__nf_d_1_1_2_medical_record'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_1_1_3_medical_record_number_source_hospital__in', [app.src.enums.NullFlavor['MSK']])), name='choics__D_patient_characteristics__nf_d_1_1_3_medical_record'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_1_1_4_medical_record_number_source_investigation__in', [app.src.enums.NullFlavor['MSK']])), name='choics__D_patient_characteristics__nf_d_1_1_4_medical_record'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_2_1_date_birth__in', [app.src.enums.NullFlavor['MSK']])), name='choics__D_patient_characteristics__nf_d_2_1_date_birth'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_2_3_patient_age_group__in', app.src.enums.D_2_3_patient_age_group)), name='choics__D_patient_characteristics__d_2_3_patient_age_group'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_5_sex__in', app.src.enums.D_5_sex)), name='choics__D_patient_characteristics__d_5_sex'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_5_sex__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_patient_characteristics__nf_d_5_sex'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_7_2_text_medical_history__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_patient_characteristics__nf_d_7_2_text_medical_his'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_7_3_concomitant_therapies__in', [True])), name='choics__D_patient_characteristics__d_7_3_concomitant_therapi'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_9_1_date_death__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_patient_characteristics__nf_d_9_1_date_death'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_9_3_autopsy__in', [app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_patient_characteristics__nf_d_9_3_autopsy'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_1_parent_identification__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_patient_characteristics__nf_d_10_1_parent_identifi'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_2_1_date_birth_parent__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_patient_characteristics__nf_d_10_2_1_date_birth_pa'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_3_last_menstrual_period_date_parent__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_patient_characteristics__nf_d_10_3_last_menstrual'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('d_10_6_sex_parent__in', app.src.enums.D_10_6_sex_parent)), name='choics__D_patient_characteristics__d_10_6_sex_parent'),
        ),
        migrations.AddConstraint(
            model_name='d_patient_characteristics',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_6_sex_parent__in', [app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_patient_characteristics__nf_d_10_6_sex_parent'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('d_8_r_1_name_drug__isnull', True), ('nf_d_8_r_1_name_drug__isnull', True), _connector='OR'), name='anynul__D_8_r_past_drug__d_8_r_1_name_dru__nf_d_8_r_1_name'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('d_8_r_4_start_date__isnull', True), ('nf_d_8_r_4_start_date__isnull', True), _connector='OR'), name='anynul__D_8_r_past_drug__d_8_r_4_start_da__nf_d_8_r_4_start'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('d_8_r_5_end_date__isnull', True), ('nf_d_8_r_5_end_date__isnull', True), _connector='OR'), name='anynul__D_8_r_past_drug__d_8_r_5_end_date__nf_d_8_r_5_end_d'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_8_r_1_name_drug__in', [app.src.enums.NullFlavor['UNK'], app.src.enums.NullFlavor['NA']])), name='choics__D_8_r_past_drug_history__nf_d_8_r_1_name_drug'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_8_r_4_start_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_8_r_past_drug_history__nf_d_8_r_4_start_date'),
        ),
        migrations.AddConstraint(
            model_name='d_8_r_past_drug_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_8_r_5_end_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_8_r_past_drug_history__nf_d_8_r_5_end_date'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('d_7_1_r_2_start_date__isnull', True), ('nf_d_7_1_r_2_start_date__isnull', True), _connector='OR'), name='anynul__D_7_1_r_structur__d_7_1_r_2_start__nf_d_7_1_r_2_sta'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('d_7_1_r_3_continuing__isnull', True), ('nf_d_7_1_r_3_continuing__isnull', True), _connector='OR'), name='anynul__D_7_1_r_structur__d_7_1_r_3_contin__nf_d_7_1_r_3_con'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('d_7_1_r_4_end_date__isnull', True), ('nf_d_7_1_r_4_end_date__isnull', True), _connector='OR'), name='anynul__D_7_1_r_structur__d_7_1_r_4_end_da__nf_d_7_1_r_4_end'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_7_1_r_2_start_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_7_1_r_structured_inform__nf_d_7_1_r_2_start_date'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_7_1_r_3_continuing__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_7_1_r_structured_inform__nf_d_7_1_r_3_continuing'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_7_1_r_4_end_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_7_1_r_structured_inform__nf_d_7_1_r_4_end_date'),
        ),
        migrations.AddConstraint(
            model_name='d_7_1_r_structured_information_medical_history',
            constraint=models.CheckConstraint(check=models.Q(('d_7_1_r_6_family_history__in', [True])), name='choics__D_7_1_r_structured_inform__d_7_1_r_6_family_history'),
        ),
        migrations.AddConstraint(
            model_name='d_10_8_r_past_drug_history_parent',
            constraint=models.CheckConstraint(check=models.Q(('d_10_8_r_4_start_date__isnull', True), ('nf_d_10_8_r_4_start_date__isnull', True), _connector='OR'), name='anynul__D_10_8_r_past_dr__d_10_8_r_4_start__nf_d_10_8_r_4_st'),
        ),
        migrations.AddConstraint(
            model_name='d_10_8_r_past_drug_history_parent',
            constraint=models.CheckConstraint(check=models.Q(('d_10_8_r_5_end_date__isnull', True), ('nf_d_10_8_r_5_end_date__isnull', True), _connector='OR'), name='anynul__D_10_8_r_past_dr__d_10_8_r_5_end_d__nf_d_10_8_r_5_en'),
        ),
        migrations.AddConstraint(
            model_name='d_10_8_r_past_drug_history_parent',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_8_r_4_start_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_10_8_r_past_drug_histor__nf_d_10_8_r_4_start_date'),
        ),
        migrations.AddConstraint(
            model_name='d_10_8_r_past_drug_history_parent',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_8_r_5_end_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_10_8_r_past_drug_histor__nf_d_10_8_r_5_end_date'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('d_10_7_1_r_2_start_date__isnull', True), ('nf_d_10_7_1_r_2_start_date__isnull', True), _connector='OR'), name='anynul__D_10_7_1_r_struc__d_10_7_1_r_2_sta__nf_d_10_7_1_r_2'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('d_10_7_1_r_3_continuing__isnull', True), ('nf_d_10_7_1_r_3_continuing__isnull', True), _connector='OR'), name='anynul__D_10_7_1_r_struc__d_10_7_1_r_3_con__nf_d_10_7_1_r_3'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('d_10_7_1_r_4_end_date__isnull', True), ('nf_d_10_7_1_r_4_end_date__isnull', True), _connector='OR'), name='anynul__D_10_7_1_r_struc__d_10_7_1_r_4_end__nf_d_10_7_1_r_4'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_7_1_r_2_start_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_10_7_1_r_structured_inf__nf_d_10_7_1_r_2_start_dat'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_7_1_r_3_continuing__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK'], app.src.enums.NullFlavor['UNK']])), name='choics__D_10_7_1_r_structured_inf__nf_d_10_7_1_r_3_continuin'),
        ),
        migrations.AddConstraint(
            model_name='d_10_7_1_r_structured_information_parent_meddra_code',
            constraint=models.CheckConstraint(check=models.Q(('nf_d_10_7_1_r_4_end_date__in', [app.src.enums.NullFlavor['MSK'], app.src.enums.NullFlavor['ASKU'], app.src.enums.NullFlavor['NASK']])), name='choics__D_10_7_1_r_structured_inf__nf_d_10_7_1_r_4_end_date'),
        ),
    ]
