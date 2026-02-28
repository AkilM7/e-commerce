# serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Product

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'mobile', 'password', 
                  'password_confirm', 'avatar', 'is_verified', 'created_at')
        read_only_fields = ('id', 'is_verified', 'created_at')
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'mobile', 'avatar', 'is_verified')


class SocialAuthSerializer(serializers.Serializer):
    provider = serializers.CharField(required=True)
    access_token = serializers.CharField(required=True)


class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
    user = UserProfileSerializer()


# ==================== FIXED CATEGORY SERIALIZER ====================

class CategorySerializer(serializers.ModelSerializer):
    # Include subcategories (categories where this category is the parent)
    subcategories = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'parent', 'description', 
                  'photo', 'status', 'created_at', 'updated_at', 'subcategories']
    
    def get_subcategories(self, obj):
        # Get all active subcategories where parent is this category
        subcategories = obj.subcategories.filter(status=True)
        # Return full subcategory data
        return SubCategorySerializer(subcategories, many=True).data


class SubCategorySerializer(serializers.ModelSerializer):
    """Simplified serializer for subcategories"""
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'photo', 'description']


# ==================== PRODUCT SERIALIZER ====================

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name', read_only=True)
    sub_category_name = serializers.CharField(source='sub_category.category_name', read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'product_name', 'product_url', 'photo', 'description',
            'price', 'quantity', 'minimum', 'maximum', 'status',
            'category', 'category_name', 'sub_category', 'sub_category_name',
            'created_at', 'updated_at'
        ]