from django.db import models
from django.contrib.auth.models import User
from model_utils import Choices
from django.utils.translation import gettext_lazy as _
from django_backend import settings

from django.core.validators import MaxValueValidator, MinValueValidator


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tag"


class Media(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    is_enabled = models.BooleanField(default=True)
    cost = models.DecimalField(decimal_places=2, max_digits=6, default=0)
    tags = models.ManyToManyField(Tag, related_name="media", null=True)
    is_published = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=False)
    was_bought = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Media"


class Attachment(models.Model):
    ALLOWED_TYPES = Choices("image", "video", "audio", "application",)
    ALLOWED_FORMATS = Choices(
        "png", "jpg", "jpeg", "gif", "mp4", "webm", "x-m4v", "quicktime",
        "x-wav", "mp3", "mpeg",
    )
    name = models.CharField(max_length=100, blank=False)
    media = models.ForeignKey(Media, on_delete=models.CASCADE, null=True)
    uri = models.CharField(max_length=500)
    format = models.CharField(max_length=100,
                              choices=ALLOWED_FORMATS,
                              blank=False)
    type = models.CharField(max_length=30,
                            choices=ALLOWED_TYPES,
                            blank=False)
    labels = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Media attachment"


class Order(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    media = models.ForeignKey(Media, on_delete=models.CASCADE)
    price = models.DecimalField(decimal_places=2, max_digits=6)

    class Meta:
        unique_together = ("buyer", "media",)

class Ratings(models.Model):
    stars = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
     )
    media = models.ForeignKey(Media, on_delete=models.CASCADE)
    given_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    feedback = models.CharField(blank=False, max_length=500)
    
    class Meta:
        verbose_name = "Ratings"