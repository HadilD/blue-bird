from django.urls import path

from static_content.views import MediaListCreateView, MediaRetreiveAPIView


urlpatterns = [
    path("media", MediaListCreateView.as_view()),
    path("media/<int:pk>", MediaRetreiveAPIView.as_view())
]
