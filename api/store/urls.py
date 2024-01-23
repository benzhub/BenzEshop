from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("products", views.ProductByAnyoneViewSet, basename="products")
router.register("manage/products", views.ProductByManagerViewSet, basename="manage-products")
router.register("customer/info", views.CustomerBySelfViewSet, basename="customer-info")
router.register("manage/customers", views.CustomerByManagerViewSet, basename="manage-customers")
# router.register("customer/orders", views.OrderGetByCustomerViewSet, basename="customer-orders")
# router.register("customer/orders", views.OrderCreateByCustomerViewSet, basename="customer-order-create")
router.register("customer/orders", views.OrderByCustomerViewSet, basename="customer-order")
# URLConf
urlpatterns = router.urls
