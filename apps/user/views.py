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
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            forbidden_usernames = ["Jamshid", "Ghanbar", "Hajar"]

            if username in forbidden_usernames:
                return Response(
                    {"detail": "Username not allowed"}, status=status.HTTP_409_CONFLICT
                )

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
