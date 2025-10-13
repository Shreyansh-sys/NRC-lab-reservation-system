from django.contrib import admin
from .models import EquipmentCategory, Equipment

@admin.register(EquipmentCategory)
class EquipmentCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'status', 'location', 'is_active')
    list_filter = ('category', 'status', 'is_active')
    search_fields = ('name', 'description', 'location')