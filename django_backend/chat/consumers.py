import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

from .models import Message, Room
from .serializers import MessageCreateSerializer, MessageListSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from web socket
    async def receive(self, text_data):
        output = await self.save_message(json.loads(text_data))
        await self.channel_layer.group_send(self.room_group_name, output)

    # Receive message from room group
    async def chat_message(self, event):

        data_to_send = {**event["message"], "type": event["type"]}
        # Send message to WebSocket
        await self.send(text_data=json.dumps(data_to_send))

    async def chat_error(self, event):

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': event["message"],
        }))

    @sync_to_async
    def save_message(self, loaded_data):

        serializer = MessageCreateSerializer(data=loaded_data)
        if not serializer.is_valid():
            return {
                'type': 'chat_error',
                'message': str(serializer.errors),
            }
        else:
            saved_message = serializer.save()

            return {
                'type': 'chat_message',
                'message': MessageListSerializer(saved_message).data,
            }
