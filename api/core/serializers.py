from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from django.core.validators import RegexValidator
from rest_framework import serializers
from django.db import transaction
from store.models import Customer


class UserCreateSerializer(BaseUserCreateSerializer):
    extra_info = {}
    phone_regex = RegexValidator(
        regex=r"^09\d{8}$",
        message="Phone number must be entered in the format: '0912345678'. Up to 10 digits allowed.",
    )
    phone_number = serializers.CharField(
        validators=[phone_regex], max_length=10, write_only=True
    )
    birth_date = serializers.DateField(write_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "birth_date",
        ]

    def validate(self, attrs):
        not_allowed_keys = ["phone_number", "birth_date"]
        self.extra_info = {
            key: value for key, value in attrs.items() if key in not_allowed_keys
        }
        filtered_attrs = {
            key: value for key, value in attrs.items() if key not in not_allowed_keys
        }
        validated_data = super().validate(filtered_attrs)

        return validated_data

    def create(self, validated_data):
        existing_customer = Customer.objects.filter(
            phone_number=self.extra_info["phone_number"]
        ).first()
        if existing_customer:
            raise serializers.ValidationError(
                "Customer with this phone number already exists."
            )
        with transaction.atomic():
            user = super().create(validated_data)
            Customer.objects.create(
                user=user,
                phone_number=self.extra_info["phone_number"],
                birth_date=self.extra_info["birth_date"],
            )

        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ["id", "username", "email", "first_name", "last_name"]
