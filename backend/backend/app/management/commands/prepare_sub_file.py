import csv
import pathlib

from django.core.management import BaseCommand


class Command(BaseCommand):
    help = 'Prepare sms substance file for upload_substance_codes command'

    def add_arguments(self, parser):
        parser.add_argument('path', type=pathlib.Path)
        parser.add_argument('output', type=pathlib.Path)

    def handle(self, *args, **options):
        sub_file = pathlib.Path(options['path'])

        with open(options['output'], 'w') as output, sub_file.open() as f:
            reader = csv.DictReader(f)
            writer = csv.writer(output)
            previous = None
            for data in reader:
                if data['Is_Preferred_Name'] == "True" and data['Substance_Domain'] == "Human use" and data['Status'] == "Current":
                    current = (data['External_Code_XEVMPD'], data['Substance_Name'])
                    if current != previous:
                        writer.writerow([data['External_Code_XEVMPD'], data['Substance_Name']])
                        previous = current
