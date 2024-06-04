# Generated by Django 5.0.2 on 2024-06-04 00:13

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_auto_20240516_2304'),
    ]

    operations = [
        migrations.CreateModel(
            name='SubstanceCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField()),
                ('name', models.CharField()),
                ('language', models.CharField(max_length=3, validators=[django.core.validators.MinLengthValidator(3)])),
            ],
            options={
                'unique_together': {('code', 'language')},
            },
        ),
    ]