from django.urls import path

from . import views
from .apis import RoomListCreateAPIView

urlpatterns = [
    path('rooms', RoomListCreateAPIView.as_view()),

    path('<str:room_name>/', views.room, name='room'),
    path('', views.index, name='index'),
]