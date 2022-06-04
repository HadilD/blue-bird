from rest_framework.generics import ListCreateAPIView

from .models import Room


class RoomListCreateAPIView(ListCreateAPIView):
    queryset = Room.objects.all()

    def create(self, request, *args, **kwargs):
        pass

    def list(self, request, *args, **kwargs):
        pass
