from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('primary/', views.primary, name='primary'),
    path('view_expenses/', views.view_expenses, name='view_expenses'),
    path('others/', views.others, name='others'),
    path('news/', views.news, name='news'),
    path('financedata/', views.financedata, name='finance'),
    path('add_expense', views.add_expense, name="add_expense"),
    path('edit_expense/<int:id>', views.expense_edit, name="expense-edit"),
    path('expense-delete/<int:id>', views.delete_expense, name="expense-delete"),
    # path('expense/', views.index_expense, name="index_expense")
    
]
