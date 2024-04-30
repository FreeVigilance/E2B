from django.db import models


class UCUMExample(models.Model):
    code = models.CharField(max_length=25, unique=True, help_text='The UCUM code')
    name = models.CharField(max_length=100, help_text='The name of the UCUM code from ucum/common-units')
    oid = models.CharField(max_length=50, help_text='The E2B OID of the UCUM code')
