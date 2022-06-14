from django.urls import path

from static_content.views import MediaList, MediaDetail, AttachmentCreate, AttachmentDetail, \
    NotApprovedMediaListView, MyMediasList, OrderCreate, OrderList, MyOrdersList


urlpatterns = [
    path("medias/", MediaList.as_view(), name="media-list"),
    path("medias/approve", NotApprovedMediaListView.as_view()),
    path("medias/<int:pk>", MediaDetail.as_view(), name="media-detail"),
    path("attachments/", AttachmentCreate.as_view(), name="attachment-create"),
    path("attachments/<int:pk>", AttachmentDetail.as_view(), name="attachment-detail"),
    path("medias/my", MyMediasList.as_view(), name="my-media"),
    path("medias/<int:pk>/order", OrderCreate.as_view(), name="order-create"),
    path("orders", OrderList.as_view(), name="order-list"),
    path("orders/my", MyOrdersList.as_view(), name="my-orders")
]
