import csv
import pathlib
import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models import CountryCode

logger = logging.getLogger(__name__)


def parse_country_codes_file(file_path: pathlib.Path, language: str):
    logger.info(f'Deleting previous info for {language}')
    CountryCode.objects.filter(language=language).delete()
    logger.info(f'{language} deleted successfully')

    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f, quoting=csv.QUOTE_MINIMAL)
        CountryCode.objects.bulk_create(
            [CountryCode(code=code, name=name, language=language) for code, name in reader]
        )

    logger.info(f'{file_path} parsed successfully')


class Command(BaseCommand):
    help = 'Uploads country codes to the database'

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('path', type=pathlib.Path)

        # Named (optional) arguments
        parser.add_argument('--language', type=str, help='Language of names of countries, default=ENG')

    @transaction.atomic
    def handle(self, *args, **options):
        country_codes_file = pathlib.Path(options['path'])

        if not country_codes_file.is_file():
            raise AttributeError(f'{country_codes_file} is not a file. '
                                 f'Country codes should be uploaded from a file specified with the path argument')

        # TODO: Add check whether we have interface in specified language
        parse_country_codes_file(country_codes_file, options['language'] or 'ENG')
