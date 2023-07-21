release: python manage.py migrate
web: npm install --legacy-peer-deps --force && gunicorn backend.wsgi --log-file -