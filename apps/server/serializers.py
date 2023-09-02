from rest_framework import serializers

from apps.server.models import Server, Room


class RoomSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = ["id", "name", "owner", "topic"]


class ServerSerializer(serializers.ModelSerializer):
    room_server = RoomSerializer(many=True)
    owner = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

    class Meta:
        model = Server
        fields = [
            "id",
            "name",
            "owner",
            "category",
            "description",
            "members",
            "room_server",
        ]
