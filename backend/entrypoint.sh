#!/bin/bash

echo "Applying database migrations"
python manage.py migrate --noinput

# Check if the superuser already exists, and create it if it doesn't
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_EMAIL" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating Django superuser..."
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')"
else
    echo "Superuser credentials are not set in the environment variables. Skipping superuser creation."
fi

echo "Collecting static files"
python manage.py collectstatic --noinput

# Start the Django development server
echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000