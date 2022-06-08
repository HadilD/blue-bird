from rest_framework import serializers

from static_content.models import Media, Attachment, Tag
from static_content.s3_service import get_public_link
from authentication.models import User


class CustomSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            tag, is_created = self.get_queryset().get_or_create(name=data)
            return tag
        except (TypeError, ValueError):
            self.fail("invalid")


class AttachmentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField("get_url")

    def get_url(self, obj: Attachment):
        return get_public_link(obj.uri)

    class Meta:
        model = Attachment
        fields = ["id", "name", "format", "url", ]


class AttachmentUploadSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False, required=True)

    class Meta:
        model = Attachment
        fields = ["file"]


class MediaSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True, source="attachment_set")
    tags = CustomSlugRelatedField(many=True,
                                  queryset=Tag.objects.all(),
                                  slug_field="name",
                                  required=False)
    owner = serializers.SlugRelatedField(slug_field="full_name", read_only=True)

    class Meta:
        model = Media
        fields = ["id", "name", "description", "attachments", "cost", "tags", "owner"]

    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        media = Media.objects.create(**validated_data)
        for tag_name in tags:
            t, _ = Tag.objects.get_or_create(name=tag_name)
            media.tags.add(t)
        return media
