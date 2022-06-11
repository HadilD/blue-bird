from django.urls import path

from static_content.views import MediaList, MediaDetail, AttachmentCreate, AttachmentDetail, NotApprovedMediaListView


urlpatterns = [
    path("medias/", MediaList.as_view(), name="media-list"),
    path("medias/approve", NotApprovedMediaListView.as_view()),
    path("medias/<int:pk>", MediaDetail.as_view(), name="media-detail"),
    path("attachments/", AttachmentCreate.as_view(), name="attachment-create"),
    path("attachments/<int:pk>", AttachmentDetail.as_view(), name="attachment-detail"),
]
