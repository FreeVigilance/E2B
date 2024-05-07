from django.db import models


class meddra_release(models.Model):
    version = models.CharField()
    language = models.CharField()


class soc_term(models.Model):
    class Meta:
        unique_together = ('code', 'meddra_release')

    code = models.PositiveIntegerField(
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

    meddra_release = models.ForeignKey(meddra_release, on_delete=models.CASCADE, related_name='soc_terms')


class hlgt_pref_term(models.Model):
    class Meta:
        unique_together = ('code', 'meddra_release')

    code = models.PositiveIntegerField(
        help_text='8-digit code to identify the High Level Group Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the High Level Group Term'
    )

    soc_terms = models.ManyToManyField(soc_term, related_name='hlgt_pref_terms')
    meddra_release = models.ForeignKey(meddra_release, on_delete=models.CASCADE, related_name='hlgt_pref_terms')


class hlt_pref_term(models.Model):
    class Meta:
        unique_together = ('code', 'meddra_release')

    code = models.PositiveIntegerField(
        help_text='8-digit code to identify the High Level Term'
    )
    name = models.CharField(
        max_length=100,
        help_text='Full name of the High Level Term'
    )

    hlgt_pref_terms = models.ManyToManyField(hlgt_pref_term, related_name='hlt_pref_terms')
    meddra_release = models.ForeignKey(meddra_release, on_delete=models.CASCADE, related_name='hlt_pref_terms')


class pref_term(models.Model):
    class Meta:
        unique_together = ('code', 'meddra_release')

    code = models.PositiveIntegerField(
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

    soc_term = models.ForeignKey(
        soc_term,
        on_delete=models.CASCADE,
        related_name='pref_terms',
        help_text='The primary System Organ Class to which the Preferred Term is linked'
    )

    hlt_pref_terms = models.ManyToManyField(hlt_pref_term, related_name='pref_terms')
    meddra_release = models.ForeignKey(meddra_release, on_delete=models.CASCADE, related_name='pref_terms')


class low_level_term(models.Model):
    class Meta:
        unique_together = ('code', 'meddra_release')

    code = models.PositiveIntegerField(
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

    pref_term = models.ForeignKey(
        pref_term,
        on_delete=models.CASCADE,
        related_name='low_level_terms'
    )
    meddra_release = models.ForeignKey(meddra_release, on_delete=models.CASCADE, related_name='low_level_terms')
