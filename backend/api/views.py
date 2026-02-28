from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from social_django.utils import load_strategy, load_backend
from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden
import requests
from .models import Category, Product

from .serializers import (
    UserSerializer, UserLoginSerializer, UserProfileSerializer,
    SocialAuthSerializer, TokenSerializer, CategorySerializer, ProductSerializer
)

User = get_user_model()

class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class UserProfileAPI(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_object(self):
        return self.request.user

class CheckUserExistsAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        email = request.data.get('email')
        mobile = request.data.get('mobile')
        
        response_data = {}
        
        if email:
            exists = User.objects.filter(email=email).exists()
            response_data['email_exists'] = exists
            response_data['exists'] = exists
            
        if mobile:
            exists = User.objects.filter(mobile=mobile).exists()
            response_data['mobile_exists'] = exists
            response_data['exists'] = exists
            
        return Response(response_data)
    
class SocialLoginAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = SocialAuthSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        provider = serializer.validated_data['provider']
        access_token = serializer.validated_data['access_token']
        
        try:
            if provider == 'google':
                user_data = self.get_google_user_info(access_token)
            elif provider == 'facebook':
                user_data = self.get_facebook_user_info(access_token)
            else:
                return Response({'error': 'Invalid provider'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get or create user
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={
                    'username': user_data.get('email').split('@')[0],
                    'first_name': user_data.get('first_name', ''),
                    'last_name': user_data.get('last_name', ''),
                    'is_verified': True
                }
            )
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserProfileSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'is_new_user': created
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_google_user_info(self, access_token):
        url = 'https://www.googleapis.com/oauth2/v3/userinfo'
        headers = {'Authorization': f'Bearer {access_token}'}
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            raise Exception('Failed to get user info from Google')
        
        data = response.json()
        return {
            'email': data['email'],
            'first_name': data.get('given_name', ''),
            'last_name': data.get('family_name', ''),
        }
    
    def get_facebook_user_info(self, access_token):
        url = 'https://graph.facebook.com/me'
        params = {
            'access_token': access_token,
            'fields': 'id,name,email,first_name,last_name'
        }
        response = requests.get(url, params=params)
        
        if response.status_code != 200:
            raise Exception('Failed to get user info from Facebook')
        
        data = response.json()
        name_parts = data.get('name', '').split(' ', 1)
        return {
            'email': data['email'],
            'first_name': data.get('first_name', name_parts[0]),
            'last_name': data.get('last_name', name_parts[1] if len(name_parts) > 1 else ''),
        }

class LogoutAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)



class CategoryListAPI(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_queryset(self):
        # Only return main categories (where parent is NULL)
        # This will include their subcategories via the serializer
        return Category.objects.filter(status=True, parent__isnull=True)


class SubCategoryListAPI(generics.ListAPIView):
    """Optional: API to get subcategories of a specific parent"""
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_queryset(self):
        parent_id = self.kwargs.get('parent_id')
        return Category.objects.filter(status=True, parent_id=parent_id)


class ProductListAPI(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_queryset(self):
        queryset = Product.objects.filter(status=True)
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__id=category)
        
        # Filter by sub_category
        sub_category = self.request.query_params.get('sub_category', None)
        if sub_category:
            queryset = queryset.filter(sub_category__id=sub_category)
            
        return queryset.select_related('category', 'sub_category')


class CategoryDetailAPI(generics.RetrieveAPIView):
    """Get specific category by ID"""
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.filter(status=True)
    lookup_field = 'id'
    
class ProductDetailAPI(generics.RetrieveAPIView):
    queryset = Product.objects.filter(status=True)
    serializer_class = ProductSerializer
    lookup_field = 'product_url'
    permission_classes = (permissions.AllowAny,)
    