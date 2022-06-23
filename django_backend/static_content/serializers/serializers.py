from rest_framework import serializers

from static_content.models import Media, Attachment, Tag, Order
from static_content.s3_service import get_public_link

from authentication.serializers import UserDetailsSerializer


class TagsSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            tag, is_created = self.get_queryset().get_or_create(name=data)
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
        fields = ["id", "name", "format", "url", "type"]


class AttachmentUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False, required=True)

    class Meta:
        model = Attachment
        fields = ["file"]


class MediaSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True, source="attachment_set")
    tags = TagsSlugRelatedField(many=True,
                                queryset=Tag.objects.all(),
                                slug_field="name",
                                required=False)
    owner = UserDetailsSerializer(read_only=True)

    class Meta:
        model = Media
        fields = ["id", "name", "description", "cost", "owner", "created_at", "is_approved",
                  "attachments", "tags", "was_bought", "is_published", "is_approved"]

    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        media = Media.objects.create(**validated_data)
        for tag_name in tags:
            t, _ = Tag.objects.get_or_create(name=tag_name)
            media.tags.add(t)
        return media


class OrderSerializer(serializers.ModelSerializer):
    media = MediaSerializer()

    class Meta:
        model = Order
        fields = ["id", "buyer", "media", "price"]
