from rest_framework import status, mixins
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import (
    ProductBaseSerializer,
    ProductGetSerializer,
    ProductEditSerializer,
    CustomerSerializer,
    CustomerEditSerializer,
    OrderCreateSerializer,
)
from .models import Product, Order, OrderItem, Customer
from .permissions import IsInCustomerGroup

class OrderViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Order.objects.filter(is_deleted=False).all()
    serializer_class = OrderCreateSerializer
    permission_classes = [IsInCustomerGroup]


class CustomerViewSet(ModelViewSet):
    queryset = Customer.objects.filter(is_deleted=False).all()
    serializer_class = CustomerSerializer

    def get_serializer_class(self):
        if self.action == "update":
            return CustomerEditSerializer
        else:
            return CustomerSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.filter(is_deleted=False).all()
    serializer_class = ProductBaseSerializer

    def get_serializer_class(self):
        if self.action == "list" or self.action == "retrieve":
            return ProductGetSerializer
        else:
            return ProductEditSerializer

    def get_serializer_context(self):
        return {"request": self.request}

    def destroy(self, request, *args, **kwargs):
        if OrderItem.objects.filter(product_id=kwargs["pk"]).count() > 0:
            return Response(
                {
                    "error": "Product cannot be deleted because it is associated with an order item"
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        return super().destroy(request, *args, **kwargs)
