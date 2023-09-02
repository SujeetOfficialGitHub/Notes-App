from django.urls import path
from .views import NotesView, PublishedNoteView

urlpatterns = [
    path('', NotesView.as_view()),
    path('add-notes/', NotesView.as_view()),
    path('update-notes/<int:id>', NotesView.as_view()),
    path('delete-notes/<int:id>', NotesView.as_view()),
    
    path('published-notes/', PublishedNoteView.as_view())
]
