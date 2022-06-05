from django.shortcuts import render
from .models import Message


def index(request):
    return render(request, 'chat/index.html')


def room(request, room_id):
    messages = Message.objects.filter(room__room_id=room_id)[0:25]
    context = {'room_id': room_id, 'username': "Gull", "messages": messages}
    return render(request, 'chat/room.html', context)
