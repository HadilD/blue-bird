#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

cur_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
"$cur_dir/wait_for_db.sh"

python ./manage.py migrate
# python ./manage.py loaddata fixtures/initial.json
# python ./manage.py collectstatic --no-input
gunicorn 'django_backend.wsgi:application' --timeout 600 --bind 0.0.0.0:8000
