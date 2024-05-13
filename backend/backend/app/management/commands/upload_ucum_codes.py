import csv
import pathlib
import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models import UCUMCode

logger = logging.getLogger(__name__)


def parse_ucum_file(file_path: pathlib.Path, language: str) -> None:
    logger.info('Clearing UCUM table')
    UCUMCode.objects.filter(language=language).delete()
    logger.info('Table UCUM cleared')

    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f)
        objects = []
        for data in reader:
            code, name = data[:2]
            property = data[2] if len(data) > 2 else 'other'
            objects.append(UCUMCode(code=code, name=name, property=property, language=language))
        UCUMCode.objects.bulk_create(objects)

    UCUMCode.objects.create(code='{DF}', name='dosage form', property='strength_dose', language=language)
    logger.info(f'{file_path} parsed successfully')


class Command(BaseCommand):
    help = ('Update UCUM to the database. '
            'Be aware that script will clear the UCUM codes for specified language before adding new data.')

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('path', type=pathlib.Path)

        # Named (optional) arguments
        parser.add_argument('--language', type=str, help='Language of names of languages', default='ENG')

    @transaction.atomic
    def handle(self, *args, **options):
        ucum_file = pathlib.Path(options['path'])

        if not ucum_file.is_file():
            raise FileNotFoundError(f'{ucum_file} is not a file. '
                                    f'UCUM codes should be uploaded from a file specified with the path argument')

        parse_ucum_file(ucum_file, options['language'])
