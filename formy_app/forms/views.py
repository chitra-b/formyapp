from . import models, serializers
from rest_framework import permissions, viewsets
from rest_framework import filters


class FormsViewSet(viewsets.ModelViewSet):
    queryset = models.Forms.objects.all()
    serializer_class = serializers.FormSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated()]
        return permission_classes


class FormDataViewSet(viewsets.ModelViewSet):
    queryset = models.FormData.objects.all()
    serializer_class = serializers.FormDataSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['status']


class UserFormMappingViewSet(viewsets.ModelViewSet):
    queryset = models.UserFormMapping.objects.all()
    serializer_class = serializers.UserFormMappingSerializer

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated()]
        return permission_classes

    # def destroy(self, request, *args, **kwargs):
    #     if 'user_id' not in self.request.query_params or 'form_id' not in self.request.query_params:
    #         raise APIException({"detail": "Missing input parameters"})
    #     instance = models.UserFormMapping.objects.get(
    #         form_id=self.request.query_params['form_id'], user_id=self.request.query_params['user_id'])
    #     if models.Forms.objects.get(id=self.request.query_params['form_id']).form_owner == instance.user:
    #         raise APIException({"detail": "Owner can't be unmapped"})
    #     self.perform_destroy(instance)
    #     return Response(status=status.HTTP_204_NO_CONTENT)

