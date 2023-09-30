from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView

from .models import User
from .schemas import user_list_docs
from .serializers import UserSerializer


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

        return super().finalize_response(request, response, *args, **kwargs)


class JWTCookieTokenObtainPairView(JWTSetCookieMixin, TokenObtainPairView):
    pass
