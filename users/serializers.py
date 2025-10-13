from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for converting User model to/from JSON
    Used for reading user data (safe for API responses)
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'institution_id', 'department', 
                 'phone_number', 'is_approved', 'training_completed', 'date_joined']
        read_only_fields = ['id', 'date_joined']  # These can't be changed via API

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Special serializer for user registration
    Handles password hashing and user creation
    """
    password = serializers.CharField(write_only=True)  # Password is write-only (never returned in API responses)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'institution_id', 'department', 'phone_number']
    
    def create(self, validated_data):
        """
        Override the default create method to properly hash passwords
        """
        # Create user with Django's built-in create_user which hashes passwords
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],  # This gets hashed automatically
            role=validated_data.get('role', 'student'),  # Default to student role
            institution_id=validated_data.get('institution_id'),
            department=validated_data.get('department'),
            phone_number=validated_data.get('phone_number')
        )
        return user