from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist

from static_content.s3_service import upload_file
from static_content.serializers.serializers import MediaSerializer, AttachmentSerializer, FileSerializer
from rest_framework import generics
from static_content.forms import AttachmentForm
from static_content.models import Media, Attachment
from static_content.filters import MediaListFilter
from rest_framework import filters


class MediaList(generics.ListCreateAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    filterset_fields = ['is_enabled']
    filter_backends = [filters.SearchFilter]
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
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            file = request.data.get("file")
            file_name = request.data.get("name", file.name)
            uri = upload_file(file)
            attachment = Attachment.objects.create(name=file_name, format=file.content_type, uri=uri)
            return Response({"id": attachment.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

