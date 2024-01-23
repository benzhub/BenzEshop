from rest_framework import serializers
from .models import Product, Promotion, Customer, Order, OrderItem
from decimal import Decimal
from django.db import transaction


class OrderItemSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()

class OrderItemGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "product", "quantity", "unit_price")

class OrderGetSerializer(serializers.ModelSerializer):
    orderitems = OrderItemGetSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ("id", "placed_at", "payment_status", "orderitems",)


class OrderCreateSerializer(serializers.ModelSerializer):
    products_info = {}
    products = OrderItemSerializer(write_only=True, many=True)

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
            for item in self.products_info["products"]:
                product_instance = Product.objects.get(pk=item["product"])
                if item["quantity"] > product_instance.inventory:
                    quantity = item["quantity"]
                    raise serializers.ValidationError({"quantity": f"orderitem quantity: {quantity} is greater than the product inventory: {product_instance.inventory}"})
                order_item = OrderItem(
                    order=order,
                    product=product_instance,
                    quantity=item["quantity"],
                    unit_price=product_instance.unit_price,
                )
                order_items_to_create.append(order_item)
            OrderItem.objects.bulk_create(order_items_to_create)
            return order


# Get => Get Customer Info By Self
# Update => Update Customer Info
# Delete => Soft Delete(Update is_active=False)
class CustomerBySelfSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    membership = serializers.CharField(read_only=True)
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    is_active = serializers.BooleanField(source="user.is_active")

    class Meta:
        model = Customer
        fields = (
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "birth_date",
            "membership",
            "is_active",
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        instance = super().update(instance, validated_data)

        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)

        user.save()
        return instance


# Get List => Get All Customers
# Get      => Get Customer's Detail Info
# Update   => Update Customer Info
# Delete   => Soft Delete(Update is_active=False)
class CustomerByManagerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email")
    username = serializers.CharField(source="user.username")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    last_login = serializers.DateTimeField(source="user.last_login")
    is_active = serializers.BooleanField(source="user.is_active")

    class Meta:
        model = Customer
        fields = (
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "birth_date",
            "membership",
            "last_login",
            "is_active",
        )
        depth = 1

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        instance = super().update(instance, validated_data)

        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)

        user.save()
        return instance


class ProductListSerializer(serializers.ModelSerializer):
    discount = serializers.SerializerMethodField(method_name="get_discount")

    class Meta:
        model = Product
        fields = ("id", "title", "unit_price", "discount", "inventory", )

    def get_discount(self, product: Product):
        promotions = product._prefetched_objects_cache.get("promotions")
        if promotions:
            promotion = promotions.first()
            return Decimal(promotion.discount)
        return 0


class ProductDetailSerializer(ProductListSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "unit_price",
            "discount",
            "inventory",
            "description",
        )


class PromotionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = "__all__"


# 一次只能選一種折購優惠
class ProductByManagerSerializer(serializers.ModelSerializer):
    promotions = PromotionSerializers(many=True, read_only=True)
    promotion_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "slug",
            "unit_price",
            "description",
            "inventory",
            "promotions",
            "promotion_id",
            "is_deleted",
        )

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.title = validated_data.get("title", instance.title)
            instance.slug = validated_data.get("slug", instance.slug)
            instance.description = validated_data.get(
                "description", instance.description
            )
            instance.unit_price = validated_data.get("unit_price", instance.unit_price)
            instance.inventory = validated_data.get("inventory", instance.inventory)

            promotion_id = validated_data.pop("promotion_id", [])
            if promotion_id:
                try:
                    instance.promotions.clear()
                    promotion_instance = Promotion.objects.get(pk=promotion_id)
                    if promotion_instance.discount > instance.unit_price:
                        raise serializers.ValidationError({"unit_price": f"Discount: {promotion_instance.discount} is greater than the product's unit price: {instance.unit_price}"})
                    instance.promotions.add(promotion_instance)
                except Promotion.DoesNotExist:
                    raise serializers.ValidationError({"promotions": f"Promotion with id {promotion_id} does not exist."})
            return instance

    def create(self, validated_data):
        with transaction.atomic():
            promotion_id = validated_data.pop("promotion_id", [])
            instance = super().create(validated_data)
            if promotion_id:
                try:
                    promotion_instance = Promotion.objects.get(pk=promotion_id)
                    if promotion_instance.discount > instance.unit_price:
                        raise serializers.ValidationError({"unit_price": f"Discount: {promotion_instance.discount} is greater than the product's unit price: {instance.unit_price}"})
                    instance.promotions.add(promotion_instance)
                except Promotion.DoesNotExist:
                    raise serializers.ValidationError({"promotions": f"Promotion with id {promotion_id} does not exist."})
            return instance
