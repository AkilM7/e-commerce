from django.contrib import admin
from django.utils.html import format_html
from .models import User, Category, Product


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'mobile', 'gender', 'status', 'created_at')
    search_fields = ('name', 'email', 'mobile')
    list_filter = ('status', 'gender')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'email', 'mobile', 'password')
        }),
        ('Additional Info', {
            'fields': ('gender', 'dob', 'photo', 'status')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at')
        }),
    )



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name', 'parent', 'status', 'created_at', 'image_preview')
    search_fields = ('category_name',)
    list_filter = ('status',)
    readonly_fields = ('created_at', 'updated_at', 'image_preview')

    def image_preview(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" width="60" height="60" style="object-fit:cover;" />',
                obj.photo.url
            )
        return "No Image"

    image_preview.short_description = 'Photo'



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'product_name',
        'category',
        'sub_category',
        'price',
        'quantity',
        'status',
        'image_preview'
    )
    search_fields = ('product_name', 'product_url')
    list_filter = ('status', 'category')
    prepopulated_fields = {'product_url': ('product_name',)}
    readonly_fields = ('created_at', 'updated_at', 'image_preview')

    def image_preview(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" width="70" height="70" style="object-fit:cover;" />',
                obj.photo.url
            )
        return "No Image"

    image_preview.short_description = 'Photo'

