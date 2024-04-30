import csv
import pathlib
import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models.ucum import UCUMExample

logger = logging.getLogger(__name__)


def parse_ucum_file(file_path: pathlib.Path) -> None:
    logger.info('Clearing UCUM table')
    UCUMExample.objects.all().delete()
    logger.info('Table UCUM cleared')

    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f)
        objects = []
        for data in reader:
            code, name, property = data
            objects.append(UCUMExample(code=code, name=name, property=property))
        UCUMExample.objects.bulk_create(objects)

    logger.info(f'{file_path} parsed successfully')


class Command(BaseCommand):
    help = 'Update UCUM to the database. Be aware that script will clear the UCUM table before adding new data.'

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('path', type=pathlib.Path)

    @transaction.atomic
    def handle(self, *args, **options):
        ucum_file = pathlib.Path(options['path'])

        if not ucum_file.is_file():
            raise FileNotFoundError(f'{ucum_file} does not exist')

        parse_ucum_file(ucum_file)
