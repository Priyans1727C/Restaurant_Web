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


# Ensure the database file and its parent directory have the correct permissions and ownership
if [ -f /app/db.sqlite3 ]; then
    echo "Setting permissions and ownership for db.sqlite3 and its parent directory"
    chmod 664 /app/db.sqlite3
    chown www-data:www-data /app/db.sqlite3
    chmod 775 /app
    chown www-data:www-data /app
else
    echo "Database file not found. Running migrations to create it."
    python manage.py migrate
    chmod 664 /app/db.sqlite3
    chown www-data:www-data /app/db.sqlite3
    chmod 775 /app
    chown www-data:www-data /app
fi


# Start the Django development server
echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000