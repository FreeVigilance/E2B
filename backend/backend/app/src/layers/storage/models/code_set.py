from django.db import models
from django.core.validators import MinLengthValidator


class CountryCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

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


class UCUMCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

    code = models.CharField(help_text='The UCUM code')
    name = models.CharField(help_text='The name of the UCUM code from ucum/common-units')
    property = models.CharField(help_text='The type of the UCUM code')
    language = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)]
    )


class RouteOfAdministrationCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

    code = models.CharField()
    name = models.CharField()
    language = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)],
    )


class DosageFormCode(models.Model):
    class Meta:
        unique_together = ('code', 'language')

    code = models.CharField()
    name = models.CharField()
    language = models.CharField(
        max_length=3,
        validators=[MinLengthValidator(3)],
    )
