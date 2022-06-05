import uuid

from rest_framework import serializers

from .models import Room


class RoomCreateSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        kwargs["room_id"] = uuid.uuid4()
        return super(RoomCreateSerializer, self).save(**kwargs)

    class Meta:
        model = Room
        fields = "to_user",


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "to_user", "from_user", "room_id", "created_at"

