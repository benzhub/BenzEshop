from .base import *
from datetime import timedelta
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]

# Application definition

INTERNAL_IPS = [
    "127.0.0.1",
]

REST_FRAMEWORK = {
    "COERCE_DECIMAL_TO_STRING": False,
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        # any other renderers you may need
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('JWT',),
   'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
   'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
   'AUTH_TOKEN_CLASSES': (
       'rest_framework_simplejwt.tokens.AccessToken',
   )
}

DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")
DOMAIN = os.getenv("DOMAIN")
SITE_NAME = os.getenv("SITE_NAME")

DJOSER = {
    "EMAIL": {
        "activation": "djoser.email.ActivationEmail",
        "confirmation": "djoser.email.ConfirmationEmail",
        "password_reset": "djoser.email.PasswordResetEmail",
        "password_changed_confirmation": "djoser.email.PasswordChangedConfirmationEmail",
    },
    "PASSWORD_RESET_CONFIRM_URL": "#/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "#/username/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "/auth/users/activation/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": True,
    "SEND_RESET_PASSWORD_EMAIL": True,
    'SEND_CONFIRMATION_EMAIL': True,
    "SERIALIZERS": {
        "user_create": "core.serializers.UserCreateSerializer",
        "current_user": "core.serializers.UserSerializer",
    },
}

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
}

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "store",
    "tags",
    "likes",
    "storages",
    "core",
    "djoser"
]

AUTH_USER_MODEL = "core.User"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("SQL_DB_NAME"),
        "USER": os.getenv("SQL_DB_USERNAME"),
        "PASSWORD": os.getenv("SQL_DB_PASSWORD"),
        "HOST": os.getenv("SQL_DB_HOST"),
        "PORT": os.getenv("SQL_DB_PORT"),
        "OPTIONS": {
            "init_command": "SET sql_mode='STRICT_TRANS_TABLES'",
        },
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = "/static/"

USE_S3 = bool(os.environ.get("USE_S3_STATIC", "False"))

if USE_S3 is True:
    AWS_ACCESS_KEY_ID = os.environ.get("CUSTOM_AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("CUSTOM_AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
    AWS_DEFAULT_ACL = "public-read"
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    # s3 static settings
    AWS_LOCATION = "static"
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/"
    STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
else:
    MEDIA_URL = "/mediafiles/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")
