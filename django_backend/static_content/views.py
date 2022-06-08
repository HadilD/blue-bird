from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from static_content.s3_service import upload_file
from static_content.serializers.serializers import MediaSerializer, AttachmentSerializer, AttachmentUploadSerializer
from rest_framework import generics
from static_content.models import Media, Attachment
from static_content.filters import MediaFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class MediaList(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = MediaFilter
    search_fields = ['name', 'description']

    def create(self, request):
        serializer = MediaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        media = serializer.save()
        attachments = request.data.get("attachments")
        for id in attachments:
            try:
                attachment = Attachment.objects.get(id=id)
                if attachment.media is None:
                    attachment.media = media
                    attachment.save()
                else:
                    media.delete()
                    return Response({"error": "attachment with id {id} is already associated with a "
                                              "media object".format(id=id)}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                media.delete()
                return Response({"error": "attachment with id {id} does not exist".format(id=id)},
                                status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MediaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class AttachmentCreate(generics.CreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def create(self, request):
        serializer = AttachmentUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = request.data.get("file")
            file_name = request.data.get("name", file.name)
            uri = upload_file(file)
            media_id = request.data.get("media")
            if media_id:
                attachment = Attachment.objects.create(name=file_name, format=file.content_type, uri=uri,
                                                       media=Media.objects.get(id=media_id))
            else:
                attachment = Attachment.objects.create(name=file_name, format=file.content_type, uri=uri)
            return Response({"id": attachment.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

