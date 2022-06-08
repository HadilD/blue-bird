from django.db import models
from django.contrib.auth.models import (AbstractUser, BaseUserManager, PermissionsMixin)


class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if email is None:
            raise TypeError('User must have a email.')

        if password is None:
            raise TypeError('User must have a password.')

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=200, null=False, blank=False, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    @property
    def full_name(self):
        return self.first_name + " " + self.last_name
