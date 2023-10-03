from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView

from .models import User
from .schemas import user_list_docs
from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)


class LogoutAPIView(APIView):
    def post(self, request, format=None):
        response = Response("Logged out successfully")

        response.set_cookie("refresh_token", "", expires=0)
        response.set_cookie("access_token", "", expires=0)

        return response


class UserRetrieveView(APIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    @user_list_docs
    def get(self, request, *args, **kwargs):
        queryset = self.queryset
        user_id = request.query_params.get("user_id")
        try:
            queryset = queryset.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"detail": f"User with id {user_id} not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = UserSerializer(queryset)
        return Response(serializer.data)


class JWTSetCookieMixin:
    #  ensures that the generated JWT tokens are sent to the client as cookies
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )

        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["َACCESS_TOKEN_NAME"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
                httponly=True,
                samesite=settings.SIMPLE_JWT["JWT_COOKIE_SAMESITE"],
            )
            del response.data["access"]

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class JWTCookieTokenRefreshView(JWTSetCookieMixin, TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
