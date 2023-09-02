from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.
from .models import Notes, Category
from .serializers import NotesSerializers


class NotesView(APIView):
    def get(self, request, format=None):
        id = request.user.id
        queryset = Notes.objects.filter(user = id)
        # print(queryset)
        serializer = NotesSerializers(queryset, many=True)
        return Response(serializer.data)