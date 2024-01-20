from rest_framework import serializers
from .models import Product, Promotion, Customer
from decimal import Decimal

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'phone_number', 'birth_date', 'membership']

class ProductBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class ProductGetSerializer(ProductBaseSerializer):
    class Meta:
        model = Product
        fields = ("id", "title", "unit_price", "price", "discount", "inventory")

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
        instance.title = validated_data.get('title', instance.title)
        instance.slug = validated_data.get('slug', instance.slug)
        instance.description = validated_data.get('description', instance.description)
        instance.unit_price = validated_data.get('unit_price', instance.unit_price)
        instance.inventory = validated_data.get('inventory', instance.inventory)

        # Update promotions
        promotion_id = validated_data.get('promotion')
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
