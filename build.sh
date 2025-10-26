#!/usr/bin/env bash
# Exit on error
set -o errexit

# Modify this line as needed for your project
pip install -r requirements.txt

# Convert static asset files
python manage.py collectstatic --no-input

echo "Creating superuser if needed..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists():
    User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')
    print('Superuser created successfully')
else:
    print('Superuser already exists')
"

# Apply any outstanding database migrations
python manage.py migrate

