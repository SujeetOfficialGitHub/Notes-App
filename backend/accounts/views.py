from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import SignupSerializer, LoginSerializer
from api.renderer import ErrorRenderer
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate


# Token generator function 
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    

class SignupView(APIView):
    # renderer_classes = [ErrorRenderer]
    def post(self, request, format=None):
        serializer = SignupSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'message': 'Signup successfully'}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            data = {'token': token, 'message': "Login successfully"}
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)