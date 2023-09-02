from django.contrib import admin
from .models import Notes, Category
# Register your models here.
@admin.register(Notes)
class NotesAdmin(admin.ModelAdmin):
    list_display = ['user', 'id', 'title', 'is_published']
    
admin.site.register(Category)