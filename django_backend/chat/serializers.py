from rest_framework import serializers

from .models import Room


class RoomCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = "to_user"


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "to_user", "from_user", "room_id", "created_at"

