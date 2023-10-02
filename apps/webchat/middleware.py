import jwt
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()


@database_sync_to_async  # convert synchronous functions that interact the database into asynchronous function that can
# be used within asynchronous context in the JWTAuthMiddleWare
def get_user(scope):
    token = scope["token"]
    try:
        if token:
            user_id = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])[
                "user_id"
            ]
            return User.objects.get(id=user_id)
    except (jwt.exceptions.DecodeError, User.DoesNotExist):
        return AnonymousUser()


class JWTAuthMiddleWare:
    def __init__(self, app):
        self.app = app

    # find the cookie
    async def __call__(self, scope, receive, send):
        # scope = information about the incoming request or outgoing responses
        headers_dict = dict(scope["headers"])
        cookies_str = headers_dict.get(b"cookie", b"").decode()
        cookies = {
            cookie.split("=")[0]: cookie.split("=")[1]
            for cookie in cookies_str.split("; ")
        }

        access_token = cookies.get("access_token")

        scope["token"] = access_token
        scope["user"] = await get_user(scope)

        return await self.app(scope, receive, send)
