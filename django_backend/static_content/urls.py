from django.urls import path

from static_content.views import MediaListCreateView, MediaRetrieveAPIView


urlpatterns = [
    path("media", MediaListCreateView.as_view()),
    path("media/<int:pk>", MediaRetrieveAPIView.as_view()),
]
