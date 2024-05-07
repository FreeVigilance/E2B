from django.db import models


class soc_term(models.Model):
    code = models.PositiveIntegerField(
        unique=True,
        help_text='8-digit code to identify the System Organ Class'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the System Organ Class'
    )
    abbrev = models.CharField(
        max_length=5,
        help_text='System Organ Class abbreviation'
    )


class hlgt_term(models.Model):
    code = models.PositiveIntegerField(
        unique=True,
        help_text='8-digit code to identify the High Level Group Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the High Level Group Term'
    )

    soc_codes = models.ManyToManyField(soc_term, related_name='hlgt_codes')


class hlt_term(models.Model):
    code = models.PositiveIntegerField(
        unique=True,
        help_text='8-digit code to identify the High Level Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the High Level Term'
    )

    hlgt_codes = models.ManyToManyField(hlgt_term, related_name='hlt_codes')


class pref_term(models.Model):
    code = models.PositiveIntegerField(
        unique=True,
        help_text='8-digit code to identify the Preferred Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the Preferred Term'
    )
    null_field = models.CharField(
        max_length=1,
        blank=True,
        help_text='This field is null'
    )

    soc_code = models.ForeignKey(
        soc_term,
        on_delete=models.CASCADE,
        related_name='pt_codes',
        help_text='The primary System Organ Class to which the Preferred Term is linked'
    )

    hlt_codes = models.ManyToManyField(hlt_term, related_name='pt_codes')


class low_level_term(models.Model):
    code = models.PositiveIntegerField(
        unique=True,
        help_text='8-digit code to identify the Lowest Level Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the Lowest Level Term'
    )
    currency = models.CharField(
        max_length=1,
        blank=True,
        help_text='Indicates whether the Lowest Level Term is current or non-current'
    )

    pt_code = models.ForeignKey(
        pref_term,
        on_delete=models.CASCADE,
        related_name='llt_codes'
    )
