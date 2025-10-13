from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'is_approved', 'training_completed')
    list_filter = ('role', 'is_approved', 'training_completed')
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('role', 'institution_id', 'department', 'phone_number', 'is_approved', 'training_completed')
        }),
    )