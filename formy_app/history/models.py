from datetime import datetime

from django.contrib.auth import get_user_model
from django.db import models

from . import constants


class History(models.Model):
    """History model to store user actions"""

    table_name = models.CharField(max_length=255, blank=False, editable=False)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    instance_id = models.CharField(
        max_length=255, null=False, blank=False, editable=False
    )
    action = models.CharField(
        max_length=7,
        null=False,
        blank=False,
        choices=constants.track_actions,
        editable=False,
    )
    path = models.CharField(max_length=255, default="", blank=False, editable=False)
    request_data = models.TextField(default="", editable=False)
    response_data = models.TextField(default="", editable=False)

    class Meta:
        db_table = 'history'
        verbose_name = 'History'
        verbose_name_plural = 'History'