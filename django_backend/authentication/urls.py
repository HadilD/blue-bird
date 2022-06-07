from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyObtainTokenPairView, UserRegistrationView


urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='auth_register'),
]
