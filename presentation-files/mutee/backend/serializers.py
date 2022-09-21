import uuid

from rest_framework import serializers

from authentication.serializers import UserListingSerializerForChat
from .exceptions import RoomNotFound
from .models import Room, Message


class RoomCreateSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        kwargs["room_id"] = uuid.uuid4()
        return super(RoomCreateSerializer, self).save(**kwargs)

    class Meta:
        model = Room
        fields = "to_user",


class RoomListSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField("_from_user")
    to_user = serializers.SerializerMethodField("_to_user")
    latest_message = serializers.SerializerMethodField("_latest_message")

    def _from_user(self, obj: Room):
        return UserListingSerializerForChat(obj.from_user).data

    def _to_user(self, obj: Room):
        return UserListingSerializerForChat(obj.to_user).data

    def _latest_message(self, obj: Room):
        return MessageDetailSerializer(obj.message_set.order_by("-created_at").first()).data

    class Meta:
        model = Room
        fields = "to_user", "from_user", "room_id", "latest_message", "created_at"


class MessageCreateSerializer(serializers.ModelSerializer):
    room_id = serializers.UUIDField()

    def is_valid(self, raise_exception=False):
        is_valid = super(MessageCreateSerializer, self).is_valid(raise_exception)
        room_id = self.validated_data["room_id"]
        if not Room.objects.filter(room_id=self.validated_data["room_id"]):
            raise RoomNotFound(room_id)
        else:
            return is_valid

    def save(self, **kwargs):
        kwargs["room_id"] = Room.objects.get(room_id=self.validated_data["room_id"]).id
        return super(MessageCreateSerializer, self).save(**kwargs)

    class Meta:
        model = Message
        fields = ("content", "room_id", "from_user", "to_user")


class MessageListSerializer(serializers.ModelSerializer):
    from_user = serializers.SerializerMethodField()
    to_user = serializers.SerializerMethodField()
    room_id = serializers.SerializerMethodField()

    def get_from_user(self, obj: Message):
        return UserListingSerializerForChat(obj.from_user).data

    def get_to_user(self, obj: Message):
        return UserListingSerializerForChat(obj.to_user).data

    def get_room_id(self, obj: Message):
        return str(obj.room.room_id)

    
    class Meta:
        model = Message
        fields = ("content", "room_id", "from_user", "to_user", "room_id", "created_at")


class MessageDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = "content", "created_at"

