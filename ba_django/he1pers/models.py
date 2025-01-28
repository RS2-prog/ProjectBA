from django.db import models
from students.models import Student
from .choices import ContentChoices

class HelperStudent(models.Model):
  student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="student")
  content = models.CharField(max_length=1, choices=ContentChoices)
  sort_no = models.IntegerField(choices=[(i, str(i)) for i in range(1, 4)])
  
  @property
  def friend_code(self):
    return self.student.teacher.friend_code if self.student.teacher else None

  @property
  def teacher_name(self):
    return self.student.teacher.username if self.student.teacher else None
