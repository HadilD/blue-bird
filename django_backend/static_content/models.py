from django.db import models


class UploadedMedia(models.Model):
    name = models.CharField(max_length=50)
    uri = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)

    def delete(self, using=None, keep_parents=False):
        super(UploadedMedia, self).delete(using, keep_parents)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Uploaded Image"
