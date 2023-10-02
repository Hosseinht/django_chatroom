import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")


django_application = get_asgi_application()

from . import urls  # noqa isort:skip
from apps.webchat.middleware import JWTAuthMiddleWare  # noqa isort:skip

# Setting up router
application = ProtocolTypeRouter(
    # separate and redirect different types of protocol
    {
        "http": get_asgi_application(),
        "websocket": JWTAuthMiddleWare(
            URLRouter(
                urls.websocket_urlpatterns,
            )
        ),
    }
)
