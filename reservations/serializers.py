from rest_framework import serializers
from .models import Reservation, MaintenanceLog, Notification
from users.serializers import UserSerializer
from equipment.serializers import EquipmentSerializer

class ReservationSerializer(serializers.ModelSerializer):
    """
    Serializer for Reservation model with related data
    Shows user and equipment details instead of just IDs
    """
    user_name = serializers.CharField(source='user.username', read_only=True)
    equipment_name = serializers.CharField(source='equipment.name', read_only=True)
    equipment_details = EquipmentSerializer(source='equipment', read_only=True)
    # ^ These fields provide friendly names and full equipment details
    
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'user_name', 'equipment', 'equipment_name', 'equipment_details',
                 'start_time', 'end_time', 'status', 'purpose', 'is_recurring',
                 'recurring_pattern', 'recurring_end_date', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class MaintenanceLogSerializer(serializers.ModelSerializer):
    """
    Serializer for Maintenance Logs
    """
    equipment_name = serializers.CharField(source='equipment.name', read_only=True)
    
    class Meta:
        model = MaintenanceLog
        fields = ['id', 'equipment', 'equipment_name', 'maintenance_type', 
                 'description', 'performed_by', 'start_date', 'end_date', 
                 'notes', 'created_at']
        read_only_fields = ['id', 'created_at']

class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for User Notifications
    """
    class Meta:
        model = Notification
        fields = ['id', 'user', 'notification_type', 'title', 'message', 
                 'is_read', 'created_at']
        read_only_fields = ['id', 'created_at']