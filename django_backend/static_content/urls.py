from django.urls import path

from static_content.views import MediaList, MediaDetail, AttachmentList


urlpatterns = [
    path("medias/", MediaList.as_view(), name="media-list"),
    path("medias/<int:pk>", MediaDetail.as_view(), name="media-detail"),
    path("attachments/", AttachmentList.as_view(), name="attachment-list"),
]
