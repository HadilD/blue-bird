from django.urls import include, re_path
from rest_framework import routers

from vp.views import UserViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    re_path(r'', include(router.urls))
]
