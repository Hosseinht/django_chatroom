from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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
