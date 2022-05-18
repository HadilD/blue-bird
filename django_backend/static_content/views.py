from rest_framework import status
from rest_framework.exceptions import UnsupportedMediaType
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from static_content.models import UploadedMedia
from static_content.s3_service import upload_file
from static_content.serializers import UploadedMediaSerializer


class MediaListCreateView(ListCreateAPIView):
    queryset = UploadedMedia.objects.all()
    serializer_class = UploadedMediaSerializer

    def create(self, request, *args, **kwargs):
        try:
            allowed_file_types = ["image/jpeg", "image/jpg", "image/png", "image/gif", "video/mp4", "video/webm", "video/x-m4v",
                                  "video/quicktime", "audio/x-wav", "audio/mpeg"]
            file = request.data.get('file')
            # if file.content_type == 'image/png' or file.content_type == 'image/jpeg':
            if file.content_type in allowed_file_types:
                file_name = request.data.get("name", file.name)

                uploaded_uri = upload_file(file)
                media = UploadedMedia.objects.create(name=file_name, uri=uploaded_uri)

                return Response(data=UploadedMediaSerializer(media).data, status=status.HTTP_201_CREATED)
            else:
                return Response({
                    "error": "valid file formats are: %s" % (", ".join(allowed_file_types))},
                    status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response("file missing.", status=status.HTTP_404_NOT_FOUND)

    def list(self, request, *args, **kwargs):
        all_media = UploadedMedia.objects.all().order_by("id")
        final_media = UploadedMedia.objects.none()

        # name filter if there is any
        name = request.GET.get("name")
        if name:
            final_media |= all_media.filter(name__icontains=name).order_by("id")

        ext = request.GET.get("ext")
        if ext:
            final_media |= all_media.filter(uri__endswith=ext).order_by("id")

        return Response(UploadedMediaSerializer(all_media | final_media, many=True).data)