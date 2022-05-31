from django.db import models
from django.contrib.auth.models import User
from model_utils import Choices
from django.utils.translation import gettext_lazy as _


class Media(models.Model):
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=500)
    is_enabled = models.BooleanField(default=False)
    cost = models.DecimalField(decimal_places=3, max_digits=6, default=0)

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
    name = models.CharField(max_length=30, blank=False)
    media = models.ForeignKey(Media, on_delete=models.CASCADE, null=True)
    uri = models.CharField(max_length=500)
    format = models.CharField(max_length=10,
                              choices=ALLOWED_FORMATS,
                              blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Media attachment"

