from dataclasses import field
from rest_framework import serializers

from static_content.models import Media, Attachment, Ratings, Tag, Order
from static_content.s3_service import get_public_link
from authentication.serializers import UserDetailsSerializer


class CustomSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            tag, _ = self.get_queryset().get_or_create(name=data)
            return tag
        except (TypeError, ValueError):
            self.fail("invalid")


class AttachmentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField("get_url")
    type = serializers.CharField(read_only=True)

    def get_url(self, obj):
        return get_public_link(obj.uri)

    class Meta:
        model = Attachment
        fields = ["id", "name", "format", "url", "type", "labels"]


class AttachmentUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False, required=True)

    class Meta:
        model = Attachment
        fields = ["file"]


class MediaSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField("get_attachments_serializer")
    tags = CustomSlugRelatedField(
        many=True, queryset=Tag.objects.all(), slug_field="name",required=False)
    owner = UserDetailsSerializer(read_only=True)
    ratings = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ["id", "name", "description", "cost", "owner", "created_at", "is_approved", "was_bought",
                  "attachments", "tags", "ratings"]

    def get_attachments_serializer(self, obj):
        serializer_context = {'request': self.context.get('request')}
        attachments = obj.attachment_set.all()
        attachments_serializer = AttachmentSerializer(
            attachments, many=True, read_only=True, context=serializer_context)
        return attachments_serializer.data

    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        media = Media.objects.create(**validated_data)
        for tag_name in tags:
            t, _ = Tag.objects.get_or_create(name=tag_name)
            media.tags.add(t)
        return media

    def get_ratings(self, obj: Media):
        return RatingsSerializer(obj.ratings_set.all(), many=True).data


class OrderSerializer(serializers.ModelSerializer):
    # used SerializerMethodField to pass the context of OrderSerializer to MediaSerializer
    # context cannot be passed directly to class field because __init__ has to be called first
    media = serializers.SerializerMethodField("get_media_serializer")

    class Meta:
        model = Order
        fields = ["id", "buyer", "media", "price"]

    def get_media_serializer(self, obj):
        serializer_context = {'request': self.context.get('request')}
        media = Media.objects.all().get(pk=obj.media.pk)
        serializer = MediaSerializer(media, context=serializer_context)
        return serializer.data

class RatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = '__all__'