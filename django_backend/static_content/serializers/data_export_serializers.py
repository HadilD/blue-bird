from rest_framework import serializers

from static_content.models import Media, Video


class MediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadedMedia
        fields = "name", "uri"


class VideoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField("get_image_url")

    def get_image_url(self, obj: Video):
        if obj.image:
            return UploadedMediaSerializer(obj.image).data

    class Meta:
        model = Video
        fields = "name", "url", "image"
