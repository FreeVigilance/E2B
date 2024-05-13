import csv
import pathlib
import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models import LanguageCode

logger = logging.getLogger(__name__)


def parse_language_codes_file(file_path: pathlib.Path, language: str):
    logger.info(f'Deleting previous info for {language}')
    LanguageCode.objects.filter(language=language).delete()
    logger.info(f'{language} deleted successfully')

    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f, quoting=csv.QUOTE_MINIMAL)
        LanguageCode.objects.bulk_create(
            [LanguageCode(code=code, name=name, language=language) for code, name in reader]
        )

    logger.info(f'{file_path} parsed successfully')


class Command(BaseCommand):
    help = ('Uploads language codes to the database '
            'Be aware that script will clear the language codes for specified language before adding new data.')

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('path', type=pathlib.Path)

        # Named (optional) arguments
        parser.add_argument('--language', type=str, help='Language of names of languages, default=ENG')

    @transaction.atomic
    def handle(self, *args, **options):
        language_codes_file = pathlib.Path(options['path'])

        if not language_codes_file.is_file():
            raise FileNotFoundError(f'{language_codes_file} is not a file. '
                                    f'Language codes should be uploaded from a file specified with the path argument')

        # TODO: Add check whether we have interface in specified language
        parse_language_codes_file(language_codes_file, options['language'] or 'ENG')
