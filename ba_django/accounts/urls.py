from django.urls import path
from .views import LoginView, LogoutView, RefreshTokenView, RegisterView, TeacherDetailView

app_name = "accounts"

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('refresh-token/', RefreshTokenView.as_view(), name="refresh"),
    path('register/', RegisterView.as_view(), name='register'),
    path('detail/', TeacherDetailView.as_view(), name='detail'),
]