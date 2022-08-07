#!/bin/sh

while ! nc -z db 3306 ; do
    echo "Waiting for the MySQL Server"
    sleep 3
done

gunicorn 'django_backend.wsgi:application' --bind 0.0.0.0:8000
