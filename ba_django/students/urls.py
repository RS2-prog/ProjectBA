from django.urls import path
from .views import RegisterStudentsView, ChoicesView, UpdateStudentView

app_name = "students"

urlpatterns = [
    path("register/", RegisterStudentsView.as_view(), name="register"),
    path("choices/", ChoicesView.as_view(), name="choices"),
    path("update_student/", UpdateStudentView.as_view(), name="update_student"),
]
