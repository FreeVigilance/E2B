#!/bin/sh

meddra_zip="$1"
docker-compose cp "$meddra_zip" backend:/e2b4free/meddra.zip
docker-compose exec backend unzip /e2b4free/meddra.zip -d /e2b4free/MedDRA
docker-compose exec -it backend python manage.py upload_meddra MedDRA
docker-compose exec backend rm -rf /e2b4free/MedDRA
docker-compose exec backend rm -rf /e2b4free/meddra.zip
