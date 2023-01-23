from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from .models import Income, Outlay, Category, Expense, CATEGORIES
from django.views.decorators.csrf import csrf_exempt
from .forms import OutlayForm
from django.contrib import messages

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

@login_required
def view_expenses(request):
    expenses = Expense.objects.filter(owner=request.user)
    categories = Category.objects.all()
    items = [] 
    total = list(Expense.objects.filter(owner=request.user).values_list('amount'))
    for item in total:
        items.append(item[0])
    month_total= sum(items)

    context = {
        'expenses': expenses,
        'month_total': month_total     
    }
    return render(request, 'home/view_expenses.html', context)

@login_required
def add_expense(request):
    categories = Category.objects.all()
    currency = Expense.objects.all()
    context = {
        'categories': categories,
        'currency': currency,
        'values': request.POST
    }
    if request.method == 'GET':
        return render(request, 'home/add_expense.html', context)

    if request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'home/add_expense.html', context)

        description = request.POST['description']
        date = request.POST['expense_date']
        category = request.POST['category']
        

        if not description:
            messages.error(request, 'description is required')
            return render(request, 'home/add_expense.html', context)

        if not date:
            messages.error(request, 'Date is required')
            return render(request, 'home/add_expense.html', context)

        if not currency:
            messages.error(request, 'Currency is required')
            return render(request, 'home/add_expense.html', context)

        Expense.objects.create(owner=request.user, amount=amount, date=date,
                               category=category, description=description)
        messages.success(request, 'Expense saved successfully')

        return redirect('view_expenses')

@login_required
def expense_edit(request, id):
    expense = Expense.objects.get(pk=id)
    categories = Category.objects.all()
    context = {
        'expense': expense,
        'values': expense,
        'categories': categories
    }
    if request.method == 'GET':
        return render(request, 'home/edit_expense.html', context)
    if request.method == 'POST':
        amount = request.POST['amount']

        if not amount:
            messages.error(request, 'Amount is required')
            return render(request, 'home/edit_expense.html', context)
        description = request.POST['description']
        date = request.POST['expense_date']
        category = request.POST['category']

        if not description:
            messages.error(request, 'description is required')
            return render(request, 'home/edit_expense.html', context)

        expense.owner = request.user
        expense.amount = amount
        expense. date = date
        expense.category = category
        expense.description = description

        expense.save()
        messages.success(request, 'Expense updated  successfully')
    return redirect('view_expenses')

@login_required
def delete_expense(request, id):
    expense = Expense.objects.get(pk=id)
    expense.delete()
    messages.success(request, 'Expense removed')
    return redirect('view_expenses')
