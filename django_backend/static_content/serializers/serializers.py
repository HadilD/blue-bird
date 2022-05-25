from rest_framework import serializers

from static_content.models import UploadedMedia
from static_content.s3_service import get_public_link


class UploadedMediaSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField("get_url")

    def get_url(self, obj: UploadedMedia):
        return get_public_link(obj.uri)

    class Meta:
        model = UploadedMedia
        fields = "id", "name", "url", "content_type", "created_at"


class UploadedMediaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedMedia
        fields = "__all__"
