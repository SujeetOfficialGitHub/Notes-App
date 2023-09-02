from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.exceptions import NotFound
# Create your views here.
from .models import Notes, Category
from .serializers import NotesSerializers
from api.renderer import ErrorRenderer

class NotesView(APIView):
    renderer_classes = [ErrorRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        try:
            # Retrieve notes belonging to the logged-in user
            notes = Notes.objects.filter(user=request.user.id)
            
            # Serialize the retrieved notes
            serializer = NotesSerializers(notes, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle exceptions (e.g., database errors, serializer errors)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request, format=None):
        try:
            category_input = request.data.get('category')
            if not category_input:
                raise ValidationError('Category field is required')
            
            category, _= Category.objects.get_or_create(title=category_input.lower())
        

            request.data['user'] = request.user.id
            serializer = NotesSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            # Assign category to the serializer before saving
            serializer.save(category=category)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle other exceptions
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def put(self, request, id, format=None):
        try:
            # Retrieve the existing note object by ID
            note = Notes.objects.get(pk=id)
            
            # Check if the note belongs to the logged-in user
            if note.user != request.user:
                raise NotFound("Note not found")
            
            # Extract the category data from the request
            category_name = request.data.get('category')
            
            # Check if a category with the given name already exists
            category, created = Category.objects.get_or_create(title=category_name)
            
            # Use the chosen category for the note
            note.category = category
            
            serializer = NotesSerializers(note, data=request.data)
            serializer.is_valid(raise_exception=True)
            
            # Save the updated note object
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Notes.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Handle other exceptions
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, id, format=None):
        try:
            # Retrieve the existing note object by ID
            note = Notes.objects.get(pk=id)
            
            # Check if the note belongs to the logged-in user
            if note.user != request.user:
                raise NotFound("Note not found")
            
            # Serialize the note data before deleting
            serializer = NotesSerializers(note)
            serializer.data['category'] = note.category
            note_data = serializer.data
            
            # Delete the note object from the database
            note.delete()
            
            # Include the deleted note data in the response
            return Response(note_data, status=status.HTTP_204_NO_CONTENT)
        except Notes.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Handle other exceptions
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)