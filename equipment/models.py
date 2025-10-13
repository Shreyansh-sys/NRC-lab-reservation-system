from django.db import models
from django.core.validators import MinValueValidator

class EquipmentCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Equipment Categories"

class Equipment(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('reserved', 'Reserved'),
        ('maintenance', 'Under Maintenance'),
        ('out_of_service', 'Out of Service'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(EquipmentCategory, on_delete=models.CASCADE)
    specifications = models.JSONField(default=dict, blank=True)  # Store technical specs
    location = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    
    # Images
    image = models.ImageField(upload_to='equipment_images/', blank=True, null=True)
    
    # Usage limits
    max_reservation_hours = models.PositiveIntegerField(default=24)
    requires_training = models.BooleanField(default=False)
    
    # Maintenance tracking
    last_maintenance = models.DateField(blank=True, null=True)
    next_maintenance = models.DateField(blank=True, null=True)
    
    # Metadata
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Equipment"