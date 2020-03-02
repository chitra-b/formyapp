from . import models, serializers
from rest_framework.response import Response
from rest_framework import status, views, permissions, viewsets, mixins, pagination
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import uuid, json
from django.contrib.auth import logout
from rest_framework import filters
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from forms import models as form_models
from rest_framework.exceptions import APIException


class UserLoginViewSet(viewsets.GenericViewSet):
    """
    This class takes care of login

    """
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserLoginSerializer

    def create(self, request, *args, **kwargs):
        user = authenticate(
            username=request.POST.get('username'),
            password=request.POST.get('password'))
        if user:
            login(request, user)
            return Response("Registered & Logged in", status=status.HTTP_202_ACCEPTED)
        return Response("User login failed", status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutAllView(views.APIView):
    """
    Use this endpoint to log out all sessions for a given user.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        user.jwt_secret = uuid.uuid4()
        user.save()
        logout(request)
        return JsonResponse({'data' : 'Logged out'}, status=status.HTTP_202_ACCEPTED)


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    This class takes care of user registration
    """
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return models.CustomUser.objects.filter(
            id=self.request.user.id)
