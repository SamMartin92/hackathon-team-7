from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
    return render(request, 'home/index.html')

def primary(request):
    return render(request, 'home/primary.html')

def secondary(request):
    return render(request, 'home/secondary.html')

def others(request):
    return render(request, 'home/others.html')

@csrf_exempt
def news(request):
    return render(request, 'home/news.html')

@csrf_exempt
def financedata(request):
    return render(request, 'home/financedata.html')

