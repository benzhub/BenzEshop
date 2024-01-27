from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAdminUser
from .models import Product, Order, Customer, ProductImage
from .permissions import IsInCustomerGroup
from django.db.models import Q
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    ProductByManagerSerializer,
    ProductImageByManagerSerializers,
    CustomerBySelfSerializer,
    CustomerByManagerSerializer,
    OrderCreateSerializer,
    OrderSoftDeleteSerializer,
    OrderGetSerializer,
    OrderListByManagerSerializer,
    OrderDetailByManagerSerializer,
    OrderUpdateByManagerSerializer,
)


#################### Order ####################
# Get         => Get Order Detail         By Customer Self
# Get List    => Get All Orders           By Customer Self
# Create      => Create Order             By Customer Self
# Soft Delete => Update is_canceled=True  By Customer Self
class OrderByCustomerViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    permission_classes = [IsInCustomerGroup]

    def get_queryset(self):
        queryset = (
            Order.objects.filter(
                Q(customer=self.request.user.customer)
                & ~Q(status=Order.ORDER_STATUS_DELETED)
            )
            .prefetch_related("orderitems__product")
            .all()
        )
        return queryset

    def get_serializer_class(self):
        if self.action == "create":
            return OrderCreateSerializer
        elif self.action == "update":
            return OrderSoftDeleteSerializer
        else:
            return OrderGetSerializer


# Get         => Get Order Detail         By Manager
# Get List    => Get All Orders           By Manager
# Update      => Update Order Detail      By Manager
# Soft Delete => Update is_canceled=True  By Manager
class OrderByManagerViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    queryset = (
        Order.objects.prefetch_related("orderitems")
        .select_related("customer__user")
        .all()
    )
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action == "list":
            return OrderListByManagerSerializer
        elif self.action == "update":
            return OrderUpdateByManagerSerializer
        else:
            return OrderDetailByManagerSerializer


#################### Customer ####################
# Get         => Get Customer Info      By Self
# Update      => Update Customer Info   By Self
# Soft Delete => Update is_active=False By Self
class CustomerBySelfViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet
):
    serializer_class = CustomerBySelfSerializer
    permission_classes = [IsInCustomerGroup]

    def get_queryset(self):
        queryset = Customer.objects.select_related("user").filter(
            user=self.request.user
        )
        return queryset


# Get List    => Get All Customers          By Manager
# Get         => Get Customer's Detail Info By Manager
# Update      => Update Customer Info       By Manager
# Soft Delete => Update is_active=False     By Manager
class CustomerByManagerViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):
    queryset = Customer.objects.select_related("user").all()
    serializer_class = CustomerByManagerSerializer
    permission_classes = [IsAdminUser]


#################### Products ####################
# Get List => Get All Products     By Anyone
# Get      => Get Product's Detail By Anyone
class ProductByAnyoneViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet
):
    def get_queryset(self):
        if self.action == "list":
            queryset = Product.objects.filter(is_deleted=False).prefetch_related("promotions").all()
            return queryset
        else:
            queryset = Product.objects.filter(is_deleted=False).prefetch_related("images", "promotions").all()
            return queryset


    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer
        else:
            return ProductDetailSerializer


# Create      => Create Prodcut         By Admin
# Update      => Update Product Detail  By Admin
# Soft Delete => Update is_deleted=True By Admin
class ProductByManagerViewSet(
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    queryset = (
        Product.objects.filter(is_deleted=False).prefetch_related("images", "promotions").all()
    )
    permission_classes = [IsAdminUser]
    serializer_class = ProductByManagerSerializer

class ProductImageByManagerViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageByManagerSerializers
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return ProductImage.objects.filter(product_id=self.kwargs['products_pk'])
    
    def get_serializer_context(self):
        return {'product_id': self.kwargs['products_pk']}