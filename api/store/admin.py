from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from . import models
from tags.models import TaggedItem


class TagInline(GenericTabularInline):
    autocomplete_fields = ["tag"]
    model = TaggedItem


class AddressInline(admin.TabularInline):
    extra = 1
    model = models.Address


# Register your models here.
@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "unit_price", "inventory_status"]
    list_editable = ["unit_price"]
    list_per_page = 10
    inlines = [TagInline]

    @admin.display(ordering="inventory")
    def inventory_status(self, product):
        if product.inventory < 10:
            return "Low"
        return "OK"


@admin.register(models.Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'membership', 'orders']
    list_editable = ['membership']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    search_fields = ['first_name__startswith', 'last_name__istartswith']
    # startswith 一定要用搜尋的字母開頭
    # istartswith 不區分大小寫


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "placed_at", "customer"]

@admin.register(models.Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ["id", "discount", "description"]

@admin.register(models.ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "image"]