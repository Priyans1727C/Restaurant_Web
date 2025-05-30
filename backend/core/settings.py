"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta

# ----------------------------------------------
# Load environment variables from .env file
# ----------------------------------------------
# Set the path to your .env file explicitly
dotenv_path = Path(__file__).resolve().parent / '.env'

# Load the .env file and force override
load_dotenv(dotenv_path=dotenv_path, override=True)

print("JWT_ACCESS_TOKEN_LIFETIME:", os.getenv("JWT_ACCESS_TOKEN_LIFETIME"))

# ----------------------------------------------
# Basic Imports and Paths
# ----------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent
CORE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(CORE_DIR, "templates")  # Fixed the path
ASSETS_ROOT = os.getenv('ASSETS_ROOT', '/static')
print(BASE_DIR)
# ----------------------------------------------
# Core Settings
# ----------------------------------------------
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default-key')
DEBUG = os.getenv('DEBUG', 'True') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',') if os.getenv('ALLOWED_HOSTS') else []

# ----------------------------------------------
# Applications and Middleware
# ----------------------------------------------
INSTALLED_APPS = [
    'corsheaders',  # Added corsheaders app
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'apis.accounts',
    'apis.stores',
    'apis.storeType.general',
    'apis.storeType.restaurant',
    'apis.storeType.grocery',
    
    
    
    'channels',
    'apis.chat',
    'drf_spectacular', # Added drf_spectacular for OpenAPI schema generation, API documentation
    
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be near the top
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Added whitenoise middleware for static files
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            TEMPLATE_DIR,
            os.path.join(BASE_DIR, 'templates'),
            # Include Django's admin templates
            os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'venv/lib/python3.11/site-packages/django/contrib/admin/templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# ----------------------------------------------
# Database
# ----------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('MYSQL_DATABASE', 'restaurant_db'),
        'USER': os.getenv('MYSQL_USER', 'root'),
        'PASSWORD': os.getenv('MYSQL_PASSWORD', 'password'),
        'HOST': os.getenv('MYSQL_HOST', 'db'),
        'PORT': os.getenv('MYSQL_PORT', '3306'),
    }
}

# ----------------------------------------------
# Password Validation
# ----------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ----------------------------------------------
# Internationalization
# ----------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ----------------------------------------------
# Static and Media Files
# ----------------------------------------------
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),  # Make sure this path exists
]

# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# ----------------------------------------------
# Custom User Model
# ----------------------------------------------
AUTH_USER_MODEL = 'accounts.User'

# ----------------------------------------------
# REST Framework and JWT Settings
# ----------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema', # Use drf_spectacular for OpenAPI schema generation, API documentation
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=10),
    # Additional settings can be added here for extra security
}



# ----------------------------------------------
# CORS Settings
# ----------------------------------------------
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000').split(',')
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
]
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "accept",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# ----------------------------------------------
# Default Primary Key Field Type
# ----------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



# ----------------------------------------------
# Email Settings
# ----------------------------------------------
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@localhost')

# FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:3000') # Frontend URL for email verification link
FRONTEND_URL = 'http://127.0.0.1:5173'  # Frontend URL for email verification link


# ----------------------------------------------
# drf_spectacular Settings
# ----------------------------------------------
SPECTACULAR_SETTINGS = {
    'TITLE': 'AreaLink API',
    'DESCRIPTION': '<h1>College Area Management API</h1>',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
}


# ----------------------------------------------
# Channels Settings
# ----------------------------------------------
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"  # For development
        # "BACKEND": "channels_redis.core.RedisChannelLayer", # For production (requires Redis)
        # "CONFIG": {
        #     "hosts": [("127.0.0.1", 6379)],
        # },
    },
}
