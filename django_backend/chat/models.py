from django.db import models

from authentication.models import User


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        abstract = True


class Room(BaseModel):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_1")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_2")
    room_id = models.UUIDField()


class Message(BaseModel):
    content = models.TextField()

    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_message")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_message")
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return 'Room name: %s , Message: %s , Time: %s' % (
        self.room.room_id, self.content, self.created_at)
