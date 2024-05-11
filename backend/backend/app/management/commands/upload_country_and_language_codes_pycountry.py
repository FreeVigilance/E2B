import logging
import pycountry

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models.international_standard_code_set import LanguageCode, CountryCode

logger = logging.getLogger(__name__)


@transaction.atomic
def create_country_codes():
    language = 'ENG'
    logger.info(f'Deleting previous info for {language}')
    CountryCode.objects.filter(language=language).delete()
    logger.info(f'{language} deleted successfully')

    logger.info(f'Adding pycountries to the database')

    CountryCode.objects.bulk_create(
        [CountryCode(code=country.alpha_2, name=country.name, language=language) for country in pycountry.countries]
    )

    logger.info(f'Pycountries added successfully')


@transaction.atomic
def create_languages():
    language = 'ENG'
    logger.info(f'Deleting previous info for {language}')
    LanguageCode.objects.filter(language=language).delete()
    logger.info(f'{language} deleted successfully')

    logger.info(f'Adding pycountries to the database')
    LanguageCode.objects.bulk_create(
        [LanguageCode(code=lang.alpha_3, name=lang.name, language=language) for lang in pycountry.languages]
    )
    logger.info(f'Pycountries added successfully')


class Command(BaseCommand):
    help = 'Uploads country codes and languages to the database'

    def handle(self, *args, **options):
        create_country_codes()
        create_languages()
