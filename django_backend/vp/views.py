from authentication.models import User
from rest_framework import viewsets

from vp.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
