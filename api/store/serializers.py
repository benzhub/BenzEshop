from rest_framework import serializers
from .models import Product, Promotion, Customer, Order, OrderItem
from core.models import User
from decimal import Decimal
from django.db import transaction

class OrderItemserializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()


class OrderCreateSerializer(serializers.ModelSerializer):
    products_info = {}
    products = OrderItemserializer(write_only=True, many=True)

    class Meta:
        model = Order
        fields = ("products",)

    def validate(self, attrs):
        request_user = self.context["request"].user

        not_allowed_keys = ["products"]
        self.products_info = {
            key: value for key, value in attrs.items() if key in not_allowed_keys
        }
        filtered_attrs = {
            key: value for key, value in attrs.items() if key not in not_allowed_keys
        }
        filtered_attrs["customer_id"] = request_user.customer.id
        return super().validate(filtered_attrs)

    def create(self, validated_data):
        with transaction.atomic():
            order = super().create(validated_data)
            order_items_to_create = []
            for item in self.products_info['products']:
                product_instance = Product.objects.get(pk=item["product"])
                order_item = OrderItem(order=order, product=product_instance, quantity=item['quantity'], unit_price=product_instance.unit_price)
                order_items_to_create.append(order_item)
            OrderItem.objects.bulk_create(order_items_to_create)
            return order


class CustomerSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField(method_name="get_user_email")
    user_name = serializers.SerializerMethodField(method_name="get_user_name")

    class Meta:
        model = Customer
        fields = (
            "id",
            "email",
            "user_name",
            "phone_number",
            "birth_date",
            "membership",
        )

    def get_user_name(self, customer: Customer):
        return f"{customer.user.first_name} {customer.user.last_name}"

    def get_user_email(self, customer: Customer):
        return customer.user.email


class CustomerEditSerializer(serializers.ModelSerializer):
    extra_info = {}
    email = serializers.EmailField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    class Meta:
        model = Customer
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "birth_date",
            "membership",
        )

    def validate(self, attrs):
        not_allowed_keys = ["email", "first_name", "last_name"]
        self.extra_info = {
            key: value for key, value in attrs.items() if key in not_allowed_keys
        }
        filtered_attrs = {
            key: value for key, value in attrs.items() if key not in not_allowed_keys
        }
        return super().validate(filtered_attrs)

    def update(self, instance, validated_data):
        user = User.objects.get(customer__id=instance.id)
        user.email = self.extra_info["email"]
        user.first_name = self.extra_info["first_name"]
        user.last_name = self.extra_info["last_name"]
        user.save()
        return super().update(instance, validated_data)


class ProductBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductGetSerializer(ProductBaseSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "unit_price",
            "price",
            "discount",
            "inventory",
        )

    price = serializers.SerializerMethodField(method_name="calculate_price")
    discount = serializers.SerializerMethodField(method_name="get_discount")

    def get_discount(self, product: Product):
        promotion_obj = product.promotions.first()
        if not promotion_obj:
            return 0
        return Decimal(promotion_obj.discount)

    def calculate_price(self, product: Product):
        promotion_obj = product.promotions.first()
        if not promotion_obj:
            return product.unit_price
        return product.unit_price - Decimal(product.promotions.first().discount)


class ProductEditSerializer(ProductBaseSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "unit_price",
            "inventory",
            "promotion",
        )

    promotion = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        promotion_id = validated_data.pop("promotion", None)  # Extract promotion ID
        product = Product.objects.create(**validated_data)

        if promotion_id is not None:
            try:
                promotion_instance = Promotion.objects.get(pk=promotion_id)
                product.promotions.add(promotion_instance)
            except Promotion.DoesNotExist:
                # Handle the case where the specified promotion does not exist
                pass

        return product

    def update(self, instance, validated_data):
        # Update fields based on validated_data
        instance.title = validated_data.get("title", instance.title)
        instance.slug = validated_data.get("slug", instance.slug)
        instance.description = validated_data.get("description", instance.description)
        instance.unit_price = validated_data.get("unit_price", instance.unit_price)
        instance.inventory = validated_data.get("inventory", instance.inventory)

        # Update promotions
        promotion_id = validated_data.get("promotion")
        if promotion_id is not None:
            try:
                promotion_instance = Promotion.objects.get(pk=promotion_id)
                instance.promotions.clear()  # Remove existing promotions
                instance.promotions.add(promotion_instance)  # Add the new promotion
            except Promotion.DoesNotExist:
                # Handle the case where the specified promotion does not exist
                pass

        instance.save()
        return instance

    def to_representation(self, instance):
        # Override to exclude 'promotion' from the serialized representation
        representation = super().to_representation(instance)
        representation.pop("promotion", None)
        return representation
