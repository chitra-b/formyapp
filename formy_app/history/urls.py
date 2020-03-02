from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('history', views.HistoryView, basename='history')
urlpatterns = [
]


urlpatterns += router.urls
