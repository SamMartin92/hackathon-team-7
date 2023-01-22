from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'home/index.html')

def primary(request):
    return render(request, 'home/primary.html')

def secondary(request):
    return render(request, 'home/secondary.html')

def others(request):
    return render(request, 'home/others.html')

def news(request):
    return render(request, 'home/news.html')

