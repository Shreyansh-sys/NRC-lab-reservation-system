from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.utils import timezone
from django.db.models import Q
from django.core.exceptions import PermissionDenied
from .models import Reservation, MaintenanceLog, Notification
from .serializers import ReservationSerializer, MaintenanceLogSerializer, NotificationSerializer

class AllReservationListView(generics.ListAPIView):
    """
    API endpoint for admins/lab managers to view ALL reservations
    """
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Only admins and lab managers can access this view
        if user.role in ['super_admin', 'lab_manager']:
            return Reservation.objects.all().order_by('-created_at')
        # Regular users get empty queryset (will be blocked by permission anyway)
        return Reservation.objects.none()

class ReservationListView(generics.ListCreateAPIView):
    """
    API endpoint to list and create reservations
    """
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Restrict reservations based on user role
        """
        user = self.request.user
        
        # Lab managers and admins can see all reservations
        # if user.role in ['super_admin', 'lab_manager']:
            # return Reservation.objects.all()
        
        # Regular users only see their own reservations
        # return Reservation.objects.filter(user=user)
        return Reservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Automatically assign the current user when creating a reservation
        """
        serializer.save(user=self.request.user)

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint to view, update, or delete a specific reservation
    """
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Same access control as list view
        """
        user = self.request.user
        if user.role in ['super_admin', 'lab_manager']:
            return Reservation.objects.all()
        return Reservation.objects.filter(user=user)

class MaintenanceLogListView(generics.ListCreateAPIView):
    serializer_class = MaintenanceLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['super_admin', 'lab_manager']:
            return MaintenanceLog.objects.all()
        return MaintenanceLog.objects.none()  # Regular users see nothing for now
    
    def perform_create(self, serializer):
        user = self.request.user
        if user.role not in ['super_admin', 'lab_manager']:
            raise PermissionDenied("Only lab managers and admins can create maintenance logs")
        serializer.save(technician=user)

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def equipment_availability(request, equipment_id):
    """
    Check if equipment is available for a given time period
    """
    start_time = request.query_params.get('start_time')
    end_time = request.query_params.get('end_time')
    
    if not start_time or not end_time:
        return Response(
            {'error': 'start_time and end_time parameters are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check for reservations that overlap with the requested time
    conflicting_reservations = Reservation.objects.filter(
        equipment_id=equipment_id,
        status__in=['pending', 'confirmed', 'active'],  # Only care about active reservations
        start_time__lt=end_time,    # Reservation starts before requested end
        end_time__gt=start_time     # Reservation ends after requested start
    )
    
    is_available = not conflicting_reservations.exists()
    
    return Response({
        'available': is_available,
        'conflicting_reservations': ReservationSerializer(conflicting_reservations, many=True).data
    })