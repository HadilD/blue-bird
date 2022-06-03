from authentication.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from vp.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    """
    API endpoint that allows users to be viewed.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
