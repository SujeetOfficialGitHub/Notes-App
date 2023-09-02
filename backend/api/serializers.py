from .models import Notes, Category
from accounts.models import User

from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class NotesSerializers(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Notes
        fields = "__all__"
        