from django.contrib import admin
from . import models


class HistoryAdmin(admin.ModelAdmin):
    model = models.History
    date_hierarchy = 'created_at'
    list_display = ('id', 'created_at', 'table_name', 'user',
                    'instance_id', 'action',
                    'path', 'request_data', 'response_data')
    list_filter = ('action', 'user__email')
    search_fields = ('path', 'user__email',)
    raw_id_fields = ('user',)

admin.site.register(models.History, HistoryAdmin)
