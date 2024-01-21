from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("products", views.ProductViewSet)
router.register('customers', views.CustomerViewSet, basename='customers')
router.register('orders', views.OrderViewSet, basename='orders')
# URLConf
urlpatterns = router.urls
