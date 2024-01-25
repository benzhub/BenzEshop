from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from .models import Order, Product


@receiver(post_save, sender=Order)
def order_post_save(sender, instance, created, **kwargs):
    if (created == False) and (
        instance.status == Order.ORDER_STATUS_CANCELED
        or instance.status == Order.ORDER_STATUS_DELETED
    ):
        orderitems = instance._prefetched_objects_cache.get("orderitems")
        with transaction.atomic():
            Product.objects.bulk_update(
                [
                    Product(
                        id=orderitem.product.id,
                        inventory=(orderitem.product.inventory + orderitem.quantity),
                    )
                    for orderitem in orderitems
                ],
                ["inventory"],
            )
    # instance._prefetched_objects_cache = {}
