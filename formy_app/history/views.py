from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from . import serializers, models


class HistoryView(ModelViewSet):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = serializers.HistorySerializer
    queryset = models.History.objects.all()
    http_method_names = ["get"]
