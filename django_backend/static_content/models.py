from django.db import models
from django.contrib.auth.models import User
from model_utils import Choices
from django.utils.translation import gettext_lazy as _
from django_backend import settings


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
    is_enabled = models.BooleanField(default=False)
    cost = models.DecimalField(decimal_places=2, max_digits=6, default=0)
    tags = models.ManyToManyField(Tag, related_name="media", null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Media"


class Attachment(models.Model):
    ALLOWED_FORMATS = Choices(
        ("png", _("image/png")),
        ("jpg", _("image/jpg")),
        ("jpeg", _("image/jpeg")),
        ("gif", _("image/gif")),
        ("mp4", _("video/mp4")),
        ("webm", _("video/webm")),
        ("x-m4v", _("video/x-m4v")),
        ("quicktime", _("video/quicktime")),
        ("x-wav", _("audio/x-wav")),
        ("mp3", _("audio/mp3")),
        ("mpeg", _("audio/mpeg")),
    )
    name = models.CharField(max_length=100, blank=False)
    media = models.ForeignKey(Media, on_delete=models.CASCADE, null=True)
    uri = models.CharField(max_length=500)
    format = models.CharField(max_length=100,
                              choices=ALLOWED_FORMATS,
                              blank=False)
    # type = Choices(
    #     ("image", _("image")),
    #     ("video", _("video")),
    #     ("audio", _("audio")),
    #     ("application", _("application")),
    #
    # )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Media attachment"

