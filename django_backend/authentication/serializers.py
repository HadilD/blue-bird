from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User
from django_backend.settings import SIMPLE_JWT


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)
        data.update({'access_token_expiry': SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']})
        data.update({'refresh_token_expiry': SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']})
        return data


class UserRegistrationSerializer(serializers.ModelSerializer):

    def validate(self, attrs):
        if attrs['username'][len(attrs['username'])-12:] != '.hs-fulda.de':
            raise serializers.ValidationError({"email": "Should be a member of Fulda organization"})

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'address']
        extra_kwargs = {'password': {'write_only': True}}




