#!/bin/sh

docker-compose exec -it backend python manage.py migrate

