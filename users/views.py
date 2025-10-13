from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer, UserRegistrationSerializer

class UserListView(generics.ListAPIView):
    """
    API endpoint to list all users
    Only accessible to authenticated users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Must be logged in

class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    API endpoint to view/update a specific user
    Users can only see their own profile unless they're admin
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Restrict data access based on user role
        """
        user = self.request.user
        if user.role in ['super_admin', 'lab_manager']:
            # Admins can see all users
            return User.objects.all()
        # Regular users can only see themselves
        return User.objects.filter(id=user.id)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])  # Anyone can register
def register_user(request):
    """
    Custom registration endpoint
    Allows new users to create accounts (pending admin approval)
    """
    serializer = UserRegistrationSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the new user
        user = serializer.save()
        user.is_approved = False  # New users need admin approval
        user.save()
        
        return Response({
            'message': 'User registered successfully. Waiting for admin approval.',
            'user_id': user.id
        }, status=status.HTTP_201_CREATED)
    
    # Return errors if data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])  # Anyone can try to login
def login_user(request):
    """
    Custom login endpoint that returns JWT tokens
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Authenticate user with Django's built-in system
    user = authenticate(username=username, password=password)
    
    if user and user.is_approved and user.is_active:
        # Generate JWT tokens for authenticated, approved users
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),      # Long-term token for getting new access tokens
            'access': str(refresh.access_token),  # Short-term token for API calls
            'user': UserSerializer(user).data  # User data for frontend
        })
    
    # Return error for invalid login
    return Response(
        {'error': 'Invalid credentials or account not approved'}, 
        status=status.HTTP_401_UNAUTHORIZED
    )