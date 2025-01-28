from django.urls import path
from .views import RegisterStudentsView, ChoicesView, UpdateStudentView, GetStudentSuggestionView

app_name = "students"

urlpatterns = [
    path("register/", RegisterStudentsView.as_view(), name="register"),
    path("choices/", ChoicesView.as_view(), name="choices"),
    path("update_student/", UpdateStudentView.as_view(), name="update_student"),
    path("get_student_names/", GetStudentSuggestionView.as_view(), name="get_student_names"),
]
