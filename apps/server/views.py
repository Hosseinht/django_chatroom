from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from rest_framework import generics, status
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.server.models import Server, Category
from apps.server.schema import server_list_docs
from apps.server.serializers import (
    ServerDetailSerializer,
    CategorySerializer,
    ServerListSerializer,
)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# class ServerDetailAPIView(generics.RetrieveAPIView):
#     queryset = (
#         Server.objects.select_related("owner", "category")
#         .prefetch_related("members", "room_server__owner")
#         .all()
#     )
#     serializer_class = ServerDetailSerializer

    # def get(self, request, *args, **kwargs):
    #     try:
    #         query = (
    #             Server.objects.select_related("owner", "category")
    #             .prefetch_related("members", "room_server__owner")
    #             .get(id=kwargs["pk"])
    #         )
    #     except ObjectDoesNotExist:
    #         return Response(
    #             {"detail": "Page not found"},
    #             status=status.HTTP_404_NOT_FOUND,
    #         )
    #     serializer = ServerSerializer(query)
    #     return Response(serializer.data)


class ServerListAPIView(generics.ListAPIView):
    """
    Provides a list of Server objects with various filtering options.

    This view retrieves a list of Server objects from the database and allows filtering based on query parameters.

    ---
    # Query Parameters
    - **category (str):** Filter servers by category name (case-insensitive).
    - **qty (int):** Limit the number of results to the specified quantity.
    - **by_user (bool):** Filter servers where the user is a member (True for filtering, False by default).
    - **by_serverid (int):** Filter by a specific server's ID.
    - **num_members (bool):** Annotate the results with the number of members in each server (True for annotation,
        False by default).

    # Raises
    - **AuthenticationFailed:** If 'by_user' or 'by_serverid' is True and the user is not authenticated.
    - **ValidationError:** If an invalid server ID is provided or if any other validation errors occur.

    # Response
    A JSON response containing a serialized list of Server objects.

    Example Usage:
    - To retrieve all servers in a specific category:
        `/api/servers/?category=MyCategory`
    - To retrieve the first 5 servers with member counts:
        `/api/servers/?num_members=true&qty=5`
    - To retrieve a server by its ID:
        `/api/servers/?by_serverid=123`
    - To filter servers where the requesting user is a member:
        `/api/servers/?by_user=true`

    Note:
    - This view assumes that 'ServerSerializer' is appropriately configured for serializing Server objects.

    """

    def get_queryset(self):
        return (
            Server.objects.all()
            .select_related("category", "owner")
            .prefetch_related("members", "room_server__owner")
        )

    @server_list_docs
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        num_members = request.query_params.get("num_members") == "true"

        # If by_user or by_serverid is True and user is not authenticated then raise AuthenticationFailed error
#         if by_user or by_serverid and not request.user.is_authenticated:
#             raise AuthenticationFailed()

        if category:
            queryset = queryset.filter(category__name__iexact=category)

        if by_user:
            user_id = request.user.id
            queryset = queryset.filter(members=user_id)

        if num_members:
            queryset = queryset.annotate(num_members=Count("members"))

        if qty:
            queryset = queryset[: int(qty)]

        if by_serverid:
            try:
                queryset = queryset.filter(id=by_serverid)
                if not queryset.exists():
                    raise ValidationError(
                        detail=f"Server with id {by_serverid} not found"
                    )
            except ValueError:
                raise ValidationError(detail="Server value error")

        serializer = ServerDetailSerializer(
            queryset, many=True, context={"num_members": num_members}
        )
        return Response(serializer.data)
