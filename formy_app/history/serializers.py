from rest_framework import serializers
from . import models


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = (
            "id",
            "table_name",
            "instance_id",
            "action",
            "user",
            "request_data",
            "response_data",
            "path",
            "created_at",
        )
