from django.db import models
from accounts.models import User

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=255)
    
    def __str__(self):
        return self.title
    
class Notes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_published = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    