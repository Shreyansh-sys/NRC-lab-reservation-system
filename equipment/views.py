from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import EquipmentCategory, Equipment
from .serializers import EquipmentCategorySerializer, EquipmentSerializer

class EquipmentCategoryListView(generics.ListAPIView):
    """
    API endpoint to list all equipment categories
    """
    queryset = EquipmentCategory.objects.all()
    serializer_class = EquipmentCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class EquipmentListView(generics.ListAPIView):
    """
    API endpoint to list equipment with filtering, searching, and sorting
    """
    serializer_class = EquipmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Enable powerful filtering capabilities
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'location']  # Filter by these fields
    search_fields = ['name', 'description', 'location']    # Search in these fields
    ordering_fields = ['name', 'created_at']               # Sort by these fields

    def get_queryset(self):
        """
        Custom queryset - only show active equipment
        """
        queryset = Equipment.objects.filter(is_active=True)
        
        # Additional filtering by category if provided
        category_id = self.request.query_params.get('category', None)
        if category_id:
            queryset = queryset.filter(category_id=category_id)
            
        return queryset

class EquipmentDetailView(generics.RetrieveAPIView):
    """
    API endpoint to view details of a specific equipment item
    """
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [permissions.IsAuthenticated]