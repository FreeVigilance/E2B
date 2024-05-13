# Generated by Django 5.0.2 on 2024-05-13 13:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_countrycode_languagecode'),
    ]

    operations = [
        migrations.CreateModel(
            name='UCUMCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(help_text='The UCUM code')),
                ('name', models.CharField(help_text='The name of the UCUM code from ucum/common-units')),
                ('property', models.CharField(help_text='The type of the UCUM code')),
                ('language', models.CharField(max_length=3, validators=[django.core.validators.MinLengthValidator(3)])),
            ],
            options={
                'unique_together': {('code', 'language')},
            },
        ),
    ]