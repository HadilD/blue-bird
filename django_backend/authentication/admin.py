from django.contrib import admin
from . import models


# Register your models here.
@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'address', 'is_staff', 'is_superuser', 'is_active')

