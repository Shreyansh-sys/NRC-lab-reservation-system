from django.db import models
from users.models import User
from equipment.models import Equipment

class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Approval'),
        ('confirmed', 'Confirmed'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservations')
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='reservations')
    
    # Time slots
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    # Reservation details
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    purpose = models.TextField(blank=True)
    
    # Recurring reservation support
    is_recurring = models.BooleanField(default=False)
    recurring_pattern = models.CharField(max_length=50, blank=True)  # 'weekly', 'daily', etc.
    recurring_end_date = models.DateTimeField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.equipment.name} ({self.start_time})"
    
    class Meta:
        ordering = ['-created_at']

class MaintenanceLog(models.Model):
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='maintenance_logs')
    maintenance_type = models.CharField(max_length=100)
    description = models.TextField()
    performed_by = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.equipment.name} - {self.maintenance_type}"

class Notification(models.Model):
    TYPE_CHOICES = [
        ('reservation_confirmation', 'Reservation Confirmation'),
        ('reservation_reminder', 'Reservation Reminder'),
        ('maintenance_alert', 'Maintenance Alert'),
        ('system_announcement', 'System Announcement'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
    class Meta:
        ordering = ['-created_at']