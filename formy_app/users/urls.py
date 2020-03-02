from . import views
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_auth import views as auth_views


router = DefaultRouter()
router.register("user_profile", views.UserProfileViewSet, basename="user_profile")

urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", views.UserLogoutAllView.as_view(), name="logout"),
    path("login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "rest-auth/password/reset/",
        auth_views.PasswordResetView.as_view(),
        name="password_reset",
    ),
    re_path(
        r"(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$",
        auth_views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    # path("track_actions/", include("track_actions.urls")),
]
urlpatterns += router.urls
