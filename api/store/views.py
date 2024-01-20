from rest_framework import status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import ProductBaseSerializer, ProductGetSerializer, ProductEditSerializer, CustomerSerializer
from .models import Product, OrderItem, Customer

class CustomerViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Customer
    serializer_class = CustomerSerializer

    @action(detail=False, methods=['GET', 'PUT'])
    def me(self, request):
        (customer, created) = Customer.objects.get_or_create(
            user_id=request.user.id)
        if request.method == 'GET':
            # request.user # AnonymousUser
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = CustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductBaseSerializer

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
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
