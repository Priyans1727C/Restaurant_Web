#!/bin/bash

# Wait for the MySQL database to be ready
until mysqladmin ping -h "$MYSQL_HOST" -P "$MYSQL_PORT" --silent --password="$MYSQL_ROOT_PASSWORD"; do
    echo "Waiting for MySQL to be ready..."
    sleep 2
done

echo "Applying database migrations"
python manage.py migrate --noinput

# Check if the superuser already exists, and create it if it doesn't
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_EMAIL" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "Creating Django superuser..."
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')"
    if [ $? -eq 0 ]; then
        echo "Superuser created successfully."
    else
        echo "Failed to create superuser."
    fi
else
    echo "Superuser credentials are not set in the environment variables. Skipping superuser creation."
fi




# Start the Django development server
echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000