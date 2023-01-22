from django import forms
from .models import CATEGORIES

class OutlayForm(forms.Form):
    title = forms.CharField()
    amount = forms.IntegerField()
    category = forms.ChoiceField(choices=CATEGORIES, label="Category")