FROM python:3.8

WORKDIR /webapp

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1 
# ENV DB_HOST=database
# ENV REDIS_HOST=172.17.0.3
ENV DEBUG=False

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt 

EXPOSE 8000

# RUN python manage.py migrate
# RUN python manage.py loaddata initial-data.json
RUN python manage.py collectstatic --no-input

CMD [ "./scripts/run_backend.sh" ]
# CMD gunicorn 'django_backend.wsgi:application' --bind 0.0.0.0:8000 && daphne -b 0.0.0.0 -p 8001 django_backend.asgi:application
