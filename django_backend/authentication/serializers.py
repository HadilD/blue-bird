from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token


class UserRegistrationSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        if attrs['username'][len(attrs['username'])-12:] != '.hs-fulda.de':
            raise serializers.ValidationError({"email": "Should be a member of Fulda organization"})

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'address']
        extra_kwargs = {'password': {'write_only': True}}




