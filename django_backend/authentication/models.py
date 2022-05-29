from django.db import models
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager, PermissionsMixin)


class UserManager(BaseUserManager):

    def create_user(self, username, password, **extra_fields):
        if username is None:
            raise TypeError('User must have a username.')

        if password is None:
            raise TypeError('User must have a password.')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.EmailField(max_length=200, null=False, blank=False, unique=True)
    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)
    address = models.TextField(max_length=1000, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'address']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    class Meta:
        db_table = "User"


