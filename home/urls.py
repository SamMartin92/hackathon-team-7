from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('primary/', views.primary, name='primary'),
    path('secondary/', views.secondary, name='secondary'),
    path('others/', views.others, name='others'),
    path('news/', views.news, name='news'),
]
