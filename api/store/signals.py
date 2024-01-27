from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.db import transaction
from .models import Order, Product
from rest_framework import serializers

# NoWork
#### Cancel(X) or Delete(D) => Cancel(X) or Delete(D)
#### Complete(C) or Pending(P) => Complete(C) or Pending(P)

# Consume(need to check inventory quantity)
#### Create
#### Cancel(X) or Delete(D) => Complete(C) or Pending(P)

# Restore
# Complete(C) or Pending(P) => Cancel(X) or Delete(D)

@receiver(pre_save, sender=Order)
def order_pre_save(sender, instance, **kwargs):
    # Consume(-1)，Restore(1)
    inventory = 0
    previous_instance = sender.objects.get(pk=instance.pk)
    # print(f"previous status: {previous_instance.status}")
    # print(f"new status: {instance.status}")
    if previous_instance.status == Order.ORDER_STATUS_CANCELED or previous_instance.status == Order.ORDER_STATUS_DELETED:
        if instance.status == Order.ORDER_STATUS_CANCELED or instance.status == Order.ORDER_STATUS_DELETED:
            return
        if instance.status == Order.ORDER_STATUS_COMPLETED or instance.status == Order.ORDER_STATUS_PENDING:
            inventory = -1
    
    if previous_instance.status == Order.ORDER_STATUS_COMPLETED or previous_instance.status == Order.ORDER_STATUS_PENDING:
        if instance.status == Order.ORDER_STATUS_COMPLETED or instance.status == Order.ORDER_STATUS_PENDING:
            return
        if instance.status == Order.ORDER_STATUS_CANCELED or instance.status == Order.ORDER_STATUS_DELETED:
            inventory = 1
    
    if inventory is 0:
        return
    
    orderitems = instance._prefetched_objects_cache.get("orderitems")
    if orderitems is None:
        return 
    
    product_update_list = []
    for orderitem in orderitems:
        if (inventory is -1) and (orderitem.product.inventory < orderitem.quantity):
            raise serializers.ValidationError(f"Insufficient inventory({orderitem.product.inventory}) for product '{orderitem.product.title}({orderitem.quantity})'")
        product_update_list.append(Product(id=orderitem.product.id, inventory=(orderitem.product.inventory + (orderitem.quantity * inventory))) )
    with transaction.atomic():
        Product.objects.bulk_update(product_update_list, ["inventory"])
    

@receiver(post_save, sender=Order)
def order_post_save(sender, instance, created, **kwargs):
    if created:
        # send order detail email
        return
