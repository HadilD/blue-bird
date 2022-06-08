from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.response import Response

from .models import User
from .serializers import MyTokenObtainPairSerializer, UserDetailsSerializer, UserUpdateSerializer
from .serializers import UserRegistrationSerializer


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            User.objects.create_user(email=serializer.validated_data['email'],
                                     password=request.data['password'],
                                     first_name=serializer.validated_data['first_name'],
                                     last_name=serializer.validated_data['last_name'],
                                     )
            return Response(serializer.data, status=201)
        except Exception as ex:
            print(ex)
            return Response({'error': str(ex)}, status=400)


class UserDetailsView(generics.RetrieveAPIView):
    def retrieve(self, request, *args, **kwargs):
        return Response(UserDetailsSerializer(request.user).data)


class UserDetailsUpdateView(generics.UpdateAPIView):
    def update(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            data = serializer.validated_data
            if data.get("password"):
                user.set_password(data["password"])

            user.first_name = data["first_name"]
            user.last_name = data["last_name"]

            user.save()
            return Response(UserDetailsSerializer(user).data)
        else:
            return Response(data=str(serializer.errors))
