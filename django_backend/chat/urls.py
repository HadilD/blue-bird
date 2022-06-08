from django.urls import path

from . import views
from .apis import RoomListCreateAPIView, MessageListApiView

urlpatterns = [
    path('rooms', RoomListCreateAPIView.as_view()),
    path('<uuid:room_id>/messages', MessageListApiView.as_view()),

    path('<str:room_id>/', views.room, name='room'),
    path('', views.index, name='index'),
]