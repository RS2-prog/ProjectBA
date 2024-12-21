from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student
from .service import setupMyStudents
from .serializers import StudentSerializer

# 所持管理画面
class RegisterStudentsView(APIView):
  
  permission_classes = [IsAuthenticated]

  def get(self, request):
      user = request.user
      setupMyStudents(user)
      students = StudentSerializer(Student.objects.filter(teacher=user), many=True).data
      return JsonResponse(students, safe=False)
        
  
        
