from rest_framework import generics, permissions, status, pagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
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
            
        if mobile:
            exists = User.objects.filter(mobile=mobile).exists()
            response_data['mobile_exists'] = exists
        
        # Overall exists flag
        response_data['exists'] = response_data.get('email_exists', False) or response_data.get('mobile_exists', False)
            
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
            
            # Get or create user - FIXED: use 'name' instead of 'username'
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={
                    'name': f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}".strip() or user_data['email'].split('@')[0],
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
        return {
            'email': data['email'],
            'first_name': data.get('first_name', ''),
            'last_name': data.get('last_name', ''),
        }


class LogoutAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Successfully logged out'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# ==================== PAGINATION CLASS ====================

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


# ==================== CATEGORY APIs ====================

class CategoryListAPI(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_queryset(self):
        # Only return main categories (where parent is NULL)
        return Category.objects.filter(status=True, parent__isnull=True)


class CategoryDetailAPI(generics.RetrieveAPIView):
    """Get specific category by ID"""
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.filter(status=True)
    lookup_field = 'id'


class SubCategoryListAPI(generics.ListAPIView):
    """Get subcategories of a specific parent"""
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    
    def get_queryset(self):
        parent_id = self.kwargs.get('parent_id')
        return Category.objects.filter(status=True, parent_id=parent_id)


# ==================== PRODUCT APIs ====================

class ProductListAPI(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        queryset = Product.objects.filter(status=True)
        
        # Filter by category ID
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__id=category)
        
        # Filter by sub_category ID
        sub_category = self.request.query_params.get('sub_category', None)
        if sub_category:
            queryset = queryset.filter(sub_category__id=sub_category)
        
        # Search by name or description
        search = self.request.query_params.get('search', None)
        if search:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(product_name__icontains=search) |
                Q(description__icontains=search)
            )
        
        # Price range filter
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Ordering
        ordering = self.request.query_params.get('ordering', '-created_at')
        if ordering:
            queryset = queryset.order_by(ordering)
        
        return queryset.select_related('category', 'sub_category')


class ProductDetailAPI(generics.RetrieveAPIView):
    queryset = Product.objects.filter(status=True)
    serializer_class = ProductSerializer
    lookup_field = 'product_url'
    permission_classes = (permissions.AllowAny,)