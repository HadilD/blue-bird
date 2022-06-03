from django.shortcuts import render
from .models import Message


def index(request):
    return render(request, 'chat/index.html')


def room(request, room_name):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room=room_name)[0:25]
    context = {'room_name': room_name, 'username': username, "messages": messages}
    return render(request, 'chat/room.html', context)
