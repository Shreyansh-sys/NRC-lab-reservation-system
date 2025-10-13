from django.contrib import admin
from .models import Reservation, MaintenanceLog, Notification

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'equipment', 'start_time', 'end_time', 'status')
    list_filter = ('status', 'equipment', 'start_time')
    search_fields = ('user__username', 'equipment__name', 'purpose')

@admin.register(MaintenanceLog)
class MaintenanceLogAdmin(admin.ModelAdmin):
    list_display = ('equipment', 'maintenance_type', 'performed_by', 'start_date', 'end_date')
    list_filter = ('maintenance_type', 'start_date')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'notification_type', 'title', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read')