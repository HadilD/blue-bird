import json
from copy import deepcopy

from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics

from django.core.exceptions import ObjectDoesNotExist
from django_filters.rest_framework import DjangoFilterBackend
from django.db import IntegrityError

from static_content.s3_service import upload_file
from static_content.serializers.serializers import (MediaSerializer, AttachmentSerializer,
                                                    AttachmentUploadSerializer, OrderSerializer, RatingsSerializer)
from static_content.rekognition_service import get_labels, get_tags

from static_content.models import (Media, Attachment, Order, Ratings)
from static_content.filters import MediaFilter


class MediaList(generics.ListCreateAPIView):
    """
    A class for creating and retrieving all media objects.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.
        filter_backends : list of FilterBackends classes
            A list of filter backend classes that should be used for filtering the queryset.
        filterset_class : FilterSet
            A custom filter class that should be used for filtering media objects.

    Methods:
    -------
        get_serializer_context():
            Overrides the default behavior of the method to return extra context.
        create():
            Overrides the default behavior of the method to create a media object.
        list():
            Overrides the default behavior of the method to return media objects.
    """
    queryset = Media.objects.filter(is_enabled=True, is_approved=True, is_published=True)
    serializer_class = MediaSerializer
    filter_backends = [DjangoFilterBackend, ]
    filterset_class = MediaFilter

    def get_serializer_context(self):
        """
        Overrides the original method to include the request object in the serializer context.
        """
        context = super(MediaList, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def create(self, request):
        """
        Overrides the original method, mainly to associate media objects with attachments upon creation.
        """
        serializer = MediaSerializer(data=request.data, context=self.get_serializer_context())
        serializer.is_valid(raise_exception=True)
        media = serializer.save(owner=self.request.user, )
        attachments = request.data.get("attachments")
        if len(attachments) == 0:
            return Response({"error": "attachment field must not be empty"})
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

    def list(self, request, *args, **kwargs):
        """
        Overrides the original methods, mainly to include filtering and search behavior.
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        search_key = request.query_params.get("search", None)
        if search_key:
            queryset = search_media(queryset, search_key)
            serializer = self.get_serializer(queryset, many=True,
                                             context=self.get_serializer_context())
            return Response(serializer.data, status=status.HTTP_200_OK)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MediaDetail(generics.RetrieveUpdateDestroyAPIView):

    """
    A class for retrieving, updating, or deleting a single media object.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.

    Methods:
    -------
        get_serializer_context():
            Overrides the default behavior of the method to return extra context.
        delete():
            Overrides the default behavior of the method to delete a media object.
    """

    queryset = Media.objects.filter(is_enabled=True)
    serializer_class = MediaSerializer

    def get_serializer_context(self):
        """
        Overrides the original method to include the request object in the serializer context.
        """
        context = super(MediaDetail, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def delete(self, request, pk):
        """
        Overrides the original method to change it's behavior because objects are not actually deleted from the
        database they are merely disabled (to deal with buyers of the media having access to it even after the
        owner deletes it).
        """
        media = Media.objects.get(pk=pk)
        media.is_enabled = False
        media.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AttachmentCreate(generics.CreateAPIView):
    """
    A class for creating attachment objects.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.

    Methods:
    -------
        create():
            Overrides the default behavior of the method to create an attachment object.
    """
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def create(self, request):
        """
        Overrides the default behavior of the create() method to insure the attachment's format is supported,
        to store it on S3, and to generate labels for it using AWS Rekognition.
        """
        serializer = AttachmentUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = request.data.get("file")
            file_name = request.data.get("name", file.name)

            labels = []
            # only images are uploaded for fetching the labels
            if "image" in file.content_type:
                copied_file = deepcopy(file)
                try:
                    labels = get_labels(copied_file.read())
                except Exception as e:
                    print(e)
            uri = upload_file(file)
            media_id = request.data.get("media")
            if media_id:
                attachment = Attachment.objects.create(
                    name=file_name, format=file.content_type.split("/")[1], uri=uri, 
                    media=Media.objects.get(id=media_id), type=file.content_type.split("/")[0],
                    labels=labels
                    )
            else:
                attachment = Attachment.objects.create(
                    name=file_name, 
                    format=file.content_type.split("/")[1],
                    uri=uri, 
                    type=file.content_type.split("/")[0], 
                    labels=labels
                )
            return Response(AttachmentSerializer(attachment).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttachmentDetail(generics.RetrieveUpdateDestroyAPIView):

    """
    A class for retrieving, deleting, and uploading a single attachment.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.

    Methods:
    -------
        get_serializer_context():
            Overrides the default behavior of the method to return extra context.
    """
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    def get_serializer_context(self):
        """
            Overrides the original method to include the request object in the serializer context.
        """
        context = super(AttachmentDetail, self).get_serializer_context()
        context.update({"request": self.request})
        return context


class NotApprovedMediaListView(generics.ListCreateAPIView):
    permission_classes = IsAdminUser,
    serializer_class = MediaSerializer

    def get_serializer_context(self):
        context = super(NotApprovedMediaListView, self).get_serializer_context()
        context.update({"request": self.request})
        return context

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

        return Response(MediaSerializer(Media.objects.all(), many=True, context=self.get_serializer_context()).data)


class MyMediasList(generics.ListAPIView):
    """
    View for listing medias owned by the currently authenticated user.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.
    Methods:
    -------
        get_queryset():
            Overrides the default behavior of the method to return extra context.
    """
    queryset = Media.objects.filter(is_enabled=True)
    serializer_class = MediaSerializer

    def get_queryset(self):
        """
        Returns all media objects belonging the currently authenticated user.
        The reason this filtering cannot be done by merely setting the queryset variable above is because
        the above query is created only once. On the other hand, this method is called every single time a user
        sends a request to this endpoint.
        """
        return Media.objects.filter(owner=self.request.user)


class OrderCreate(generics.CreateAPIView):
    """
    View for creating orders.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.
    Methods:
    -------
        create():
            Overrides the default behavior of the method to create an order.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, pk):
        """
        Needed to override default behavior of the method to update the count of orders on a media object.
        """
        try:
            media = Media.objects.get(pk=pk)
            buyer = self.request.user
            price = media.cost
            order = Order.objects.create(media=media, buyer=buyer, price=price)
            media.was_bought = media.was_bought + 1
            order_serializer = OrderSerializer(order, context={"request": self.request})
            media.save()
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({"error": "media with id {pk} does not exist".format(pk=pk)},
                            status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({"error": "order has been already placed"}, status=status.HTTP_201_CREATED)


class OrderList(generics.ListAPIView):
    """
    View for listing existing orders.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.
        permission_classes : list of Permission classes for authorizing access only to admins.

    Methods:
    -------
        get_serializer_context():
            Overrides the default behavior of the method to return extra context.
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

    def get_serializer_context(self):
        """
        Overrides the default behavior of the method to return extra context.
        """
        context = super(OrderList, self).get_serializer_context()
        context.update({"request": self.request})
        return context


class MyOrdersList(generics.ListAPIView):
    """
    View for listing orders made by the currently authenticated user.

    Attributes:
    ----------
        queryset : QuerySet
            The queryset that should be used for returning objects from this view.
        serializer_class : Serializer
            The serializer class that should be used for validating and deserializing input, and for serializing output.
        permission_classes : list of Permission classes for authorizing access only to admins.

    Methods:
    -------
        get_serializer_context():
            Overrides the default behavior of the method to return extra context.
        get_queryset():
            Overrides the default behavior of the method to return extra context.
    """

    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        """
        Returns all orders owned by the currently authenticated user.
        """
        return Order.objects.filter(buyer=self.request.user)

    def get_serializer_context(self):
        """
        Overrides the original method to include the request object in the serializer context.
        """
        context = super(MyOrdersList, self).get_serializer_context()
        context.update({"request": self.request})
        return context


def search_media(queryset, search_key):
    """
    A function that filters a queryset based on a search key.

    Parameters
    ----------
        queryset : QuerySet
        The queryset to be filtered
        search_key : str
        The search key
    """
    search_words = [word.strip() for word in search_key.split(" ")]
    qs = Media.objects.none()
    qs2 = queryset
    for word in search_words:
        qs = qs | qs2.filter(name__icontains=word) | \
             qs2.filter(description__icontains=word) | \
             qs2.filter(tags__name__icontains=word) | \
             qs2.filter(owner__first_name__icontains=word) | \
             qs2.filter(owner__last_name__icontains=word)

    return qs


class RatingsList(generics.ListCreateAPIView):
    """
    View for listing and creating ratings.
    """

    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        media = Media.objects.get(pk=self.kwargs['pk'])
        return Ratings.objects.filter(media=media)

    def create(self, request, pk):
        try:
            media = Media.objects.get(pk=pk)
            given_by = self.request.user
            stars = request.data.get("stars")
            feedback = request.data.get("feedback")
            rating = Ratings.objects.create(media=media, given_by=given_by, stars=stars, feedback=feedback)
            rating_serializer = RatingsSerializer(rating, context={"request": self.request})
            rating.save()
            return Response(rating_serializer.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return Response({"error": "media with id {pk} does not exist".format(pk=pk)},
                            status=status.HTTP_400_BAD_REQUEST)

        
class DeleteRating(generics.DestroyAPIView):
    """
    View for deleting ratings.
    """
    queryset = Ratings.objects.all()
    serializer_class = RatingsSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            rating = Ratings.objects.get(pk=pk)
            rating.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ObjectDoesNotExist:
            return Response({"error": "rating with id {pk} does not exist".format(pk=pk)},
                            status=status.HTTP_400_BAD_REQUEST)