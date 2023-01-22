from django.db import models
from django.contrib.auth.models import User

CATEGORIES = (
    ('Primary', 'Primary'),
    ('Secondary', 'Secondary'),
    ('Saving', 'Saving'),
)
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




