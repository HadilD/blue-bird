import json

from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import filters

from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

from static_content.s3_service import upload_file
from static_content.serializers.serializers import MediaSerializer, AttachmentSerializer, \
    AttachmentUploadSerializer, OrderSerializer

from static_content.models import Media, Attachment, Order
from static_content.filters import MediaFilter
from django_filters.rest_framework import DjangoFilterBackend


class MediaList(generics.ListCreateAPIView):
    queryset = Media.objects.filter(is_enabled=True)
    serializer_class = MediaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = MediaFilter
    search_fields = ["name", "description", "tags__name", "owner__name"]

    def create(self, request):
        serializer = MediaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        media = serializer.save(owner=self.request.user, )
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
    queryset = Media.objects.filter(is_enabled=True)
    serializer_class = MediaSerializer

    def delete(self, request, pk):
        media = Media.objects.get(pk=pk)
        media.is_enabled = False
        media.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
                attachment = Attachment.objects.create(name=file_name, format=file.content_type.split("/")[1],
                                                       uri=uri, media=Media.objects.get(id=media_id),
                                                       type=file.content_type.split("/")[0])
            else:
                attachment = Attachment.objects.create(name=file_name, format=file.content_type.split("/")[1],
                                                       uri=uri, type=file.content_type.split("/")[0])
            return Response({"id": attachment.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer


class NotApprovedMediaListView(generics.ListCreateAPIView):
    permission_classes = IsAdminUser,
    serializer_class = MediaSerializer

    def get_queryset(self):
        is_approved: str = self.request.GET.get("is_approved")
        if is_approved:
            is_approved = json.loads(is_approved)
            return Media.objects.filter(is_approved=is_approved)
        else:
            return Media.objects.all()

    def create(self, request, *args, **kwargs):
        media_ids: list = request.data.get("ids")
        approve: bool = request.data.get("approve", True)
        if not media_ids:
            return Response(data={"error": "please provide 'ids' list to approve"})

        Media.objects.filter(id__in=media_ids).update(is_approved=approve)

        return Response(MediaSerializer(Media.objects.all(), many=True).data)


class MyMediasList(generics.ListAPIView):
    """
    View for listing medias owned by the currently authenticated user.
    """
    queryset = Media.objects.filter(is_enabled=True)
    serializer_class = MediaSerializer

    def get_queryset(self):
        return Media.objects.filter(owner=self.request.user)


class OrderCreate(generics.CreateAPIView):
    """
    View for creating orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, pk):
        try:
            media = Media.objects.get(pk=pk)
            buyer = self.request.user
            price = media.cost
            order = Order.objects.create(media=media, buyer=buyer, price=price)
            media.was_bought = media.was_bought + 1
            media.save()
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({"error": "media with id {pk} does not exist".format(pk=pk)},
                            status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({"error": "order has been already placed"}, status=status.HTTP_201_CREATED)


class OrderList(generics.ListAPIView):
    """
    View for listing existing orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]


class MyOrdersList(generics.ListAPIView):
    """
    View for listing orders made by the currently authenticated user.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)

# TODO: ask if we also need api for listing orders made to a particular user (not by)
