from django import forms
from .models import CATEGORIES, CURRENCY_CHOICES

class OutlayForm(forms.Form):
    title = forms.CharField()
    amount = forms.IntegerField()
    category = forms.ChoiceField(choices=CATEGORIES, label="Category")
    currency = forms.ChoiceField(choices=CURRENCY_CHOICES, label="Currency")