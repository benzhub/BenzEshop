from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

router = DefaultRouter()
router.register("products", views.ProductByAnyoneViewSet, basename="products")
router.register(
    "manage/products", views.ProductByManagerViewSet, basename="manage-products"
)
# router.register("images", views.ProductImageByManagerViewSet, basename="images")

router.register("customer/info", views.CustomerBySelfViewSet, basename="customer-info")
router.register(
    "manage/customers", views.CustomerByManagerViewSet, basename="manage-customers"
)

router.register(
    "customer/orders", views.OrderByCustomerViewSet, basename="customer-order"
)
router.register("manage/orders", views.OrderByManagerViewSet, basename="manage-order")

# product_images_router = routers.NestedSimpleRouter(router, r"images", lookup="images")
product_images_router = routers.NestedSimpleRouter(router, r'manage/products', lookup='products')
product_images_router.register(r'images', views.ProductImageByManagerViewSet, basename='product-images')

# URLConf
urlpatterns = router.urls + product_images_router.urls
