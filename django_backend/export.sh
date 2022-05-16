export DB_HOST=172.31.46.166 DB_USER=gdsd-user DB_NAME=gdsd_db DB_PASSWORD='9EY9t?Z9yg3kR4Ai%s*_HH_0o:?3T4:a' DB_PORT=3306 SECRET_KEY='67T4@#%^%$FDVCERT$#%^%@$%^&^%#FSG1213' DEBUG=True

source gdsdSemester1Project/env/bin/activate
screen -d -m python gdsdSemester1Project/django_backend/manage.py runserver 0.0.0.0:8000
sudo ss -lptn 'sport = :8000'
