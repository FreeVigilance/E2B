#!/bin/sh

docker-compose exec -it backend python manage.py upload_country_and_language_codes_pycountry
