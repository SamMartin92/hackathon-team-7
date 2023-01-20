from django.db import models
from django.contrib.auth.models import User

class Budget(models.Model):
     user = models.ForeignKey(User, on_delete=models.CASCADE)
     # date = models.DateTimefield(null=False, blank=False)
     income = models.IntegerField()
