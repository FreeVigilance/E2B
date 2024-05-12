from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.postgres.operations import UnaccentExtension


class CountryCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

    operations = [
        UnaccentExtension()
    ]

    code = models.CharField(
        max_length=2,
        validators=[MinLengthValidator(2)],
        help_text='ISO 3166-1 alpha-2 code for the country'
    )
    name = models.CharField(
        help_text='short name of the country'
    )
    language = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)],
    )


class LanguageCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

    operations = [
        UnaccentExtension()
    ]

    code = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)],
        help_text='ISO 639-2 alpha-3 code for the language'
    )
    name = models.CharField(
        help_text='Name of the language'
    )
    language = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)],
    )