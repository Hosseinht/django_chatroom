from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.webchat.consumers import WebChatConsumer
from apps.user.views import JWTCookieTokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/", include("apps.user.urls")),
    path("api/server/", include("apps.server.urls")),
    path("api/messages/", include("apps.webchat.urls")),
    path(
        "api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

websocket_urlpatterns = [
    path("<str:serverId>/<str:roomId>/", WebChatConsumer.as_asgi())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
