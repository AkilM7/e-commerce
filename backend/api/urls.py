from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterAPI, CustomTokenObtainPairView, LogoutAPI,
    UserProfileAPI, CheckUserExistsAPI, SocialLoginAPI,
    CategoryListAPI, CategoryDetailAPI, ProductListAPI, ProductDetailAPI
)

urlpatterns = [
    # Authentication
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('profile/', UserProfileAPI.as_view(), name='profile'),
    path('check-user-exists/', CheckUserExistsAPI.as_view(), name='check-user-exists'),
    
    # Social Auth
    path('social-login/', SocialLoginAPI.as_view(), name='social_login'),
    
    # Categories
    path('categories/', CategoryListAPI.as_view(), name='categories'),
    path('categories/<int:pk>/', CategoryDetailAPI.as_view(), name='category-detail'),
    
    # Products
    path('products/', ProductListAPI.as_view(), name='products'),
    path('products/<slug:product_url>/', ProductDetailAPI.as_view(), name='product-detail'),
]