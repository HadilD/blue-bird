from rest_framework import serializers

from static_content.models import Media, Attachment
from static_content.s3_service import get_public_link


class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = ["id", "name", "uri", "format"]


class MediaSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True, source="attachment_set")

    class Meta:
        model = Media
        fields = ["id", "name", "description", "attachments", "cost"]

# class MediaSerializer(serializers.ModelSerializer):
#     url = serializers.SerializerMethodField("get_url")
#
#     def get_url(self, obj: Media):
#         return get_public_link(obj.uri)
#
#     class Meta:
#         model = Media
#         fields = "name", "url", "created_at"
#
#
# class MediaCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Media
#         fields = "__all__"
