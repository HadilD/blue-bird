from django.urls import path

from static_content.views import MediaListCreateView


urlpatterns = [
    path("media", MediaListCreateView.as_view())
]
