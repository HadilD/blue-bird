from django.urls import path

from static_content.views import MediaList, MediaDetail


urlpatterns = [
    path("medias/", MediaList.as_view(), name="media-list"),
    path("medias/<int:pk>", MediaDetail.as_view(), name="media-detail"),
]
