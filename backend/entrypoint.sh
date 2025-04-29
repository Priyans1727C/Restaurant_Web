#!/bin/bash

echo "Applying database migrations"
python manage.py migrate --noinput

# Create superuser from environment variables
echo "Creating superuser"
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists():
    User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD');
    print('Superuser created successfully');
else:
    print('Superuser already exists');
"

echo "Collecting static files"
python manage.py collectstatic --noinput

# Start the Django development server
echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000