#!/bin/sh


if [ -z "${DB_USER}" ]; then
    base_mysql_image_default_user='root'
    export DB_USER="${base_mysql_image_default_user}"
fi

mysql_ready() {
python << END
import sys

import mysql.connector
from mysql.connector import Error

try:
    conn = mysql.connector.connect(
        host="${DB_HOST}",
        database="${DB_NAME}",
        user="${DB_USER}",
        password="${DB_PASSWORD}"
    )
    if conn.is_connected():
        sys.exit(0)
except Error as e:
    sys.exit(-1)

END
}

until mysql_ready; do
  >&2 echo 'Waiting for MYSQL to become available...'
  sleep 1
done
>&2 echo 'MYSQL is available'

exec "$@"
