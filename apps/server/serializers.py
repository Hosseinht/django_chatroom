from rest_framework import serializers

from apps.server.models import Server


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = [
            "id",
            "name",
            "owner",
            "category",
            "description",
            "members",
        ]
