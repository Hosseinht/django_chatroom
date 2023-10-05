from rest_framework import serializers

from apps.server.models import Category, Room, Server


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "description",
            "icon",
        ]


class RoomSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()

    class Meta:
        model = Room
        fields = [
            "id",
            "name",
            "owner",
            "topic",
        ]


class ServerSerializer(serializers.ModelSerializer):
    room_server = RoomSerializer(many=True)
    owner = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    num_members = serializers.SerializerMethodField()
    banner = serializers.SerializerMethodField()

    def get_banner(self, obj):
        if obj.banner:
            return self.context["request"].build_absolute_uri(obj.banner.url)
        else:
            return None

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get("num_members")
        if not num_members:
            data.pop("num_members")
        return data

    class Meta:
        model = Server
        fields = [
            "id",
            "num_members",
            "name",
            "owner",
            "category",
            "description",
            "banner",
            "icon",
            "room_server",
        ]
