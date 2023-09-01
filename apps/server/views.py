from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics

from apps.server.models import Category, Server
from apps.server.serializers import ServerSerializer


class ServerListAPIView(generics.ListAPIView):
    def get_queryset(self):
        return Server.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        category = request.query_params.get("category")

        if category:
            queryset = queryset.filter(category=category)

        serializer = ServerSerializer(queryset, many=True)
        return Response(serializer.data)
