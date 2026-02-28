from django.contrib import admin
from django.utils.html import format_html
from django import forms
from .models import User, Category, Product


# Custom form for creating new users (with password)
class UserCreationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    
    class Meta:
        model = User
        fields = ('email', 'name', 'mobile', 'password', 'gender', 'dob', 'avatar', 'status', 'is_staff', 'is_superuser')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


# Custom form for changing existing users (password is handled separately)
class UserChangeForm(forms.ModelForm):
    # Password field is read-only with a link to change it
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={'readonly': 'readonly'}),
        required=False,
        help_text="Raw passwords are not stored. <a href='../password/'>Click here to change password</a>."
    )
    
    class Meta:
        model = User
        fields = ('email', 'name', 'mobile', 'password', 'gender', 'dob', 'avatar', 'status', 'is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make password field read-only with help text
        if self.instance and self.instance.pk:
            self.fields['password'].widget.attrs['readonly'] = True
            self.fields['password'].help_text = (
                "Raw passwords are not stored. <a href='../password/'>Click here to change password</a>."
            )


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    form = UserChangeForm
    
    list_display = ('id', 'name', 'email', 'mobile', 'gender', 'status', 'is_staff', 'created_at')
    search_fields = ('name', 'email', 'mobile')
    list_filter = ('status', 'gender', 'is_staff', 'is_superuser')
    readonly_fields = ('created_at', 'updated_at', 'last_login')

    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'email', 'mobile', 'password')
        }),
        ('Additional Info', {
            'fields': ('gender', 'dob', 'avatar', 'status')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {
            'fields': ('last_login', 'created_at', 'updated_at')
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        """Use different forms for add vs change"""
        if obj is None:
            # Creating new user - use creation form
            kwargs['form'] = UserCreationForm
        else:
            # Editing existing user - use change form
            kwargs['form'] = UserChangeForm
        return super().get_form(request, obj, **kwargs)

    def get_fieldsets(self, request, obj=None):
        """Different fieldsets for add vs change"""
        if obj is None:
            # Creating new user - simpler form
            return (
                (None, {'fields': ('email', 'name', 'mobile', 'password', 'status')}),
            )
        return self.fieldsets


# Custom form for Product to filter sub_category
class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Filter sub_category to show only categories that HAVE a parent (sub-categories)
        self.fields['sub_category'].queryset = Category.objects.filter(parent__isnull=False)
        
        # Filter category to show only main categories (no parent)
        self.fields['category'].queryset = Category.objects.filter(parent__isnull=True)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'category_name', 'parent', 'status', 'created_at', 'image_preview')
    search_fields = ('category_name',)
    list_filter = ('status',)
    readonly_fields = ('created_at', 'updated_at', 'image_preview')

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Filter parent to show only categories that have NO parent (main categories only)
        form.base_fields['parent'].queryset = Category.objects.filter(parent__isnull=True)
        # Exclude self to prevent selecting itself as parent
        if obj:
            form.base_fields['parent'].queryset = form.base_fields['parent'].queryset.exclude(id=obj.id)
        return form

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
    form = ProductAdminForm
    
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
    list_filter = ('status', 'category', 'sub_category')
    prepopulated_fields = {'product_url': ('product_name',)}
    readonly_fields = ('created_at', 'updated_at', 'image_preview')

    fieldsets = (
        ('Basic Info', {
            'fields': ('product_name', 'product_url', 'photo', 'description')
        }),
        ('Category', {
            'fields': ('category', 'sub_category')
        }),
        ('Pricing & Stock', {
            'fields': ('price', 'quantity', 'minimum', 'maximum')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at')
        }),
    )

    def image_preview(self, obj):
        if obj.photo:
            return format_html(
                '<img src="{}" width="70" height="70" style="object-fit:cover;" />',
                obj.photo.url
            )
        return "No Image"

    image_preview.short_description = 'Photo'