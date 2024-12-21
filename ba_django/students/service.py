from .models import Student, StudentDtl
from accounts.models import Teacher


# 各先生用の生徒リストを作成する
def setupMyStudents(user):
  if not Student.objects.filter(teacher=user).exists():
    for studentDtl in StudentDtl.objects.all():
      student = Student()
      student.teacher = user
      student.detail = studentDtl
      student.save()


# 新規生徒を各先生の生徒に追加する
def addNewStudentForAll(studentDtl):
  for teacher in Teacher.objects.all():
    student = Student()
    student.teacher = teacher
    student.detail = studentDtl 
    student.save()
    
    