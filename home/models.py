from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

CATEGORIES = (
    ('Primary', 'Primary'),
    ('Secondary', 'Secondary'),
    ('Saving', 'Saving'),
)

CURRENCY_CHOICES = [
    ("KWD", "KWD"),
    ("BHD", "BHD"),
    ("OMR", "OMR"),
    ("JOD", "JOD"),
    ("GBP", "GBP"),
    ("KYD", "KYD"),
    ("EUR", "EUR"),
    ("CHF", "CHF"),
    ("USD", "USD"),
    ("CAD", "CAD")
]


class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    income = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class Outlay(models.Model):
    balance = models.ForeignKey(Income, on_delete=models.CASCADE, related_name='outlays')
    title = models.CharField(max_length=50, null=False)
    amount= models.DecimalField(max_digits=8, decimal_places=2)
    category =models.CharField(max_length=50, choices=CATEGORIES)

    # def __str__(self):
    #     return self.title


class Expense(models.Model):
    amount = models.FloatField()
    date = models.DateField(default=now)
    description = models.TextField()
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category = models.CharField(max_length=266)
    currency = models.CharField(max_length=10, choices=CURRENCY_CHOICES)

    def __str__(self):
        return self.category

    class Meta:
        ordering: ['-date']


class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name




