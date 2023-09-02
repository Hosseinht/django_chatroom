from rest_framework import generics
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response

from apps.server.models import Server
from apps.server.serializers import ServerSerializer


class ServerListAPIView(generics.ListAPIView):
    def get_queryset(self):
        return (
            Server.objects.all()
            .select_related("category", "owner")
            .prefetch_related("members", "room_server__owner")
        )

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user")
        by_serverid = request.query_params.get("by_serverid")

        if by_user or by_serverid and not request.user.is_authenticated:
            raise AuthenticationFailed()

        if category:
            queryset = queryset.filter(category__name__iexact=category)

        if qty:
            queryset = queryset[: int(qty)]

        if by_user:
            # user_id = request.user.id
            queryset = queryset.filter(members=by_user)

        if by_user:
            # user_id = request.user.id
            queryset = queryset.filter(members=by_user)

        if by_serverid:
            try:
                queryset = queryset.filter(id=by_serverid)
                if not queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_serverid} not found"
                    )
            except ValueError:
                raise ValidationError(detail="Server value error")

        serializer = ServerSerializer(queryset, many=True)
        return Response(serializer.data)
