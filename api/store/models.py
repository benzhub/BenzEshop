from django.db import models
from django.core.validators import RegexValidator
# Promotion - Product(many to many)


class Promotion(models.Model):
    description = models.CharField(max_length=255)
    discount = models.FloatField()
    # product_set => products # 如果沒有設定related_name的話，那麼默認就會是product_set
    def __str__(self) -> str:
        return self.description

class Customer(models.Model):
    phone_regex = RegexValidator(
        regex=r'^09\d{8}$',
        message="Phone number must be entered in the format: '0912345678'. Up to 10 digits allowed."
    )

    MEMEBERSHIP_BRONZE = "B"
    MEMEBERSHIP_SILVER = "S"
    MEMEBERSHIP_GOLD = "G"

    MEMEBERSHIP_CHOICES = [
        (MEMEBERSHIP_BRONZE, "Bronze"),
        ("S", "Silver"),
        ("G", "Gold"),
    ]
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(validators=[phone_regex], max_length=10, blank=True) 
    birth_date = models.DateField(null=True)
    membership = models.CharField(
        max_length=1, choices=MEMEBERSHIP_CHOICES, default=MEMEBERSHIP_BRONZE
    )

    class Meta:
        db_table = "store_customers"
        indexes = [models.Index(fields=["last_name", "first_name"])]


class Product(models.Model):
    # sku = models.CharField(max_length=10, primary_key=True) # 將這個sku設定為 primary key
    title = models.CharField(max_length=255)
    slug = models.SlugField(default="-")  # slug可以優化我們在搜尋的速度
    description = models.TextField()
    # 9999999.99
    # 跟錢有關的小數點數字都應該使用 DecimalField
    unit_price = models.DecimalField(max_digits=9, decimal_places=2)
    inventory = models.IntegerField()
    last_update = models.DateTimeField(auto_now=True)  # 只要有更新就會記錄時間
    # last_update = models.DateTimeField(auto_now_add=True) # 只有在第一次創建的時候才會記錄時間
    promotions = models.ManyToManyField(Promotion, related_name="products")

    def __str__(self) -> str:
        return self.title

    class Meta:
        ordering = ["title"]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = "P"
    PAYMENT_STATUS_COMPLETE = "C"
    PAYMENT_STATUS_FAILED = "F"

    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, "Pending"),
        (PAYMENT_STATUS_COMPLETE, "Complete"),
        (PAYMENT_STATUS_FAILED, "Failed"),
    ]
    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING
    )
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()  # 小數量的正整數
    # 因為我們有時候可能會有促銷活動，因此我們要特別紀錄成立訂單的時候當前的商品價格
    unit_price = models.DecimalField(max_digits=9, decimal_places=2)


# on_delete=
# SET_NULL 當我們刪除父類的時候，子類會被保留，但是關聯的欄位會變成Null
# PROTECT  當我們刪除父類的時候，子類會被保護，防止被誤刪除
# CASCADE  當我們刪除父類的時候，子類也會一併被刪除
# SET_DEFAULT


class Address(models.Model):  # 父類是Customer
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
