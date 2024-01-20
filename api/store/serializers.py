from rest_framework import serializers
from .models import Product
from decimal import Decimal


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        # fields = "__all__"
        fields = ["id", "title", "unit_price", "price", "discount", "inventory"]
        # depth = 1

    price = serializers.SerializerMethodField(method_name="calculate_price")
    discount = serializers.SerializerMethodField(method_name="get_discount")

    def get_discount(self, product: Product):
        promotion_obj = product.promotions.first()
        if(not promotion_obj):
            return 0
        return Decimal(promotion_obj.discount)

    def calculate_price(self, product: Product):
        promotion_obj = product.promotions.first()
        if(not promotion_obj):
            return product.unit_price
        return product.unit_price - Decimal(product.promotions.first().discount)
