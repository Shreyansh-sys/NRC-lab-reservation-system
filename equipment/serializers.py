from rest_framework import serializers
from .models import EquipmentCategory, Equipment

class EquipmentCategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Equipment Category model
    Simple serializer for category data
    """
    class Meta:
        model = EquipmentCategory
        fields = ['id', 'name', 'description']  # Only expose these fields via API

class EquipmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Equipment model with extra computed fields
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    # ^ This creates a computed field that shows the category name instead of just ID
    
    class Meta:
        model = Equipment
        fields = ['id', 'name', 'description', 'category', 'category_name', 
                 'specifications', 'location', 'status', 'image', 
                 'max_reservation_hours', 'requires_training', 'is_active',
                 'last_maintenance', 'next_maintenance', 'created_at']
        read_only_fields = ['id', 'created_at']  # These are auto-generated