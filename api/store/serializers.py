from rest_framework import serializers
from .models import Product, Promotion


class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        # fields = "__all__"
        # fields = ('id', 'discount')
        fields = ('id',)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        # fields = ["id", "title", "unit_price", "inventory", "promotions"]
        depth = 1

    promotions = PromotionSerializer(many=True, read_only=True)
