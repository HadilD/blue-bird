from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from .models import Room
from .serializers import RoomListSerializer, RoomCreateSerializer
from .exceptions import RoomAlreadyExistsError, NotAValidToUserError


class RoomListCreateAPIView(ListCreateAPIView):
    queryset = Room.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return RoomCreateSerializer
        else:
            return RoomListSerializer

    def get_queryset(self):
        if self.request.method == "POST":
            return Room.objects.filter(from_user=self.request.user).order_by("created_at")
        else:
            return Room.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = RoomCreateSerializer(data=request.data)

        if serializer.is_valid():
            to_user = serializer.validated_data["to_user"]

            if to_user == request.user:
                raise NotAValidToUserError
            if Room.objects.filter(from_user=request.user, to_user=to_user):
                raise RoomAlreadyExistsError(to_user.id)

            saved_room = serializer.save(from_user=request.user)
            response = Response(data=RoomListSerializer(saved_room).data)
        else:
            response = Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return response
