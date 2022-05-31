from rest_framework import status
from rest_framework.exceptions import UnsupportedMediaType
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from static_content.models import Media
from static_content.s3_service import upload_file
from static_content.serializers.serializers import MediaSerializer, AttachmentSerializer
from rest_framework import generics
from static_content.models import Media, Attachment


class MediaList(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

    def create(self, request):
        media_serializer = MediaSerializer(data=request.data, context={"request": request})
        media_serializer.is_valid(raise_exception=True)
        media = media_serializer.save()
        attachments = request.data.get("attachments")
        for attachment in attachments:
            id = attachment["id"]
            a = Attachment.objects.get(id=id)
            a.media = media
            a.save()
        return Response(media_serializer.data, status=status.HTTP_201_CREATED)


class MediaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class AttachmentList(generics.ListCreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def get_queryset(self):
        return Attachment.objects.filter(media=self.request.query_params.get("media"))

    def create(self, request):
        file = request.data.get("file")
        file_name = request.data.get("name")
        uri = upload_file(file)
        attachment = Attachment.objects.create(name=file_name, format=file.content_type, uri=uri)
        return Response(data=AttachmentSerializer(attachment).data, status=status.HTTP_201_CREATED)
