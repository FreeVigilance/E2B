import csv
import pathlib
import logging

from django.core.management import BaseCommand
from django.db import transaction

from app.src.layers.storage.models.meddra import meddra_release, soc_term, hlgt_pref_term, hlt_pref_term, pref_term, \
    low_level_term

logger = logging.getLogger(__name__)


def parse_meddra_file(file_path, model_class, field_names, meddra_release):
    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f, delimiter='$')
        objects = []
        for data in reader:
            obj = {'meddra_release': meddra_release}
            for i, field_name in enumerate(field_names):
                if field_name is None:
                    continue

                field_object = model_class._meta.get_field(field_name)
                if field_object.is_relation:
                    obj[field_name] = field_object.remote_field.model.objects.get(meddra_release=meddra_release,
                                                                                  code=data[i])
                else:
                    obj[field_name] = data[i]
            objects.append(model_class(**obj))
        model_class.objects.bulk_create(objects)

    logger.info(f'{file_path} parsed successfully')


def parse_meddra_relationship_file(file_path, model_class_from, model_class_to, meddra_release):
    logger.info(f'Parsing {file_path}')

    with file_path.open() as f:
        reader = csv.reader(f, delimiter='$')
        for data in reader:
            code_from, code_to = data[:2]
            model_to = model_class_to.objects.get(meddra_release=meddra_release, code=code_to)
            model_from = model_class_from.objects.get(meddra_release=meddra_release, code=code_from)
            getattr(model_to, f'{model_class_from._meta.object_name}s').add(model_from)

    logger.info(f'{file_path} parsed successfully')


class Command(BaseCommand):
    help = 'Uploads MedDRA files to the database'

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('path', type=pathlib.Path)

        # Named (optional) arguments
        parser.add_argument('--meddra-version', type=str, help='Version of the MedDRA')
        parser.add_argument('--meddra-language', type=str, help='Language of the MedDRA')

    @transaction.atomic
    def handle(self, *args, **options):
        meddra_folder = pathlib.Path(options['path'])
        meddra_release_file = meddra_folder / 'meddra_release.asc'

        if meddra_release_file.is_file():
            if options['meddra_version'] or options['meddra_language']:
                raise AttributeError(
                    'MedDRA version and language must be specified in the meddra_release.asc file '
                    'or by command line arguments, not both'
                )

            version, language = meddra_release_file.read_text().split('$')[:2]
        elif options['meddra_version'] and options['meddra_language']:
            version, language = options['meddra_version'], options['meddra_language']
        else:
            raise AttributeError(
                'MedDRA version and language must be specified in the meddra_release.asc file '
                'or by command line arguments'
            )

        meddra_release_, _ = meddra_release.objects.get_or_create(
            version=version,
            language=language
        )

        # Order of the files is important: from the highest level to the lowest.
        files = [
            ('soc.asc', soc_term, ['code', 'name', 'abbrev']),
            ('hlgt.asc', hlgt_pref_term, ['code', 'name']),
            ('hlt.asc', hlt_pref_term, ['code', 'name']),
            ('pt.asc', pref_term, ['code', 'name', 'null_field', 'soc_term']),
            # None is used to skip legacy empty fields
            ('llt.asc', low_level_term, ['code', 'name', 'pref_term', None, None, None, None, None, None, 'currency'])
        ]
        for file_name, model_class, field_names in files:
            parse_meddra_file(meddra_folder / file_name, model_class, field_names, meddra_release_)

        relationships_files = [
            ('soc_hlgt.asc', soc_term, hlgt_pref_term),
            ('hlgt_hlt.asc', hlgt_pref_term, hlt_pref_term),
            ('hlt_pt.asc', hlt_pref_term, pref_term),
        ]
        for file_name, model_class_from, model_class_to in relationships_files:
            parse_meddra_relationship_file(meddra_folder / file_name, model_class_from, model_class_to, meddra_release_)
