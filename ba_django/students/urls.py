from django.urls import path
from .views import RegisterStudentsView

app_name = "students"

urlpatterns = [
    path("register/", RegisterStudentsView.as_view(), name="register"),
]
