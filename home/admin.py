from django.contrib import admin
from .models import Income, Outlay, Expense, Category

# Register your models here.
admin.site.register(Income)
admin.site.register(Outlay)


class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('amount', 'description', 'owner', 'category', 'date',)
    search_fields = ('description', 'category', 'date',)

    list_per_page = 5


admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Category)