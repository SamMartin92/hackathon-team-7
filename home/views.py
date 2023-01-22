from django.shortcuts import render, get_object_or_404, redirect
from .models import Income, Outlay, CATEGORIES
from .forms import OutlayForm

# Create your views here.

def index(request):
    return render(request, 'home/index.html')

def primary(request):
    return render(request, 'home/primary.html')

def secondary(request):
    income = get_object_or_404(Income)

    if request.method =="GET":
        outlays = Outlay.objects.all()
        return render(request, 'home/secondary.html', {'income':income, 'outlays':outlays})

    elif request.method == "POST":
        form =OutlayForm(request.POST)
        if form.is_valid():
            title= form.cleaned_data['title']
            amount = form.cleaned_data['amount']
            category = form. cleaned_data['category']

            Outlay.objects.create(
                balance=income,
                title=title,
                amount=amount,
                category=category
            ).save()

    
    return redirect('secondary')


def others(request):
    return render(request, 'home/others.html')

