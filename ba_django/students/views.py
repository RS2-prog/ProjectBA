import json
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student
from .service import setupMyStudents
from .serializers import StudentSerializer, ChoicesSerializer

# 所持生徒リストを返す
class RegisterStudentsView(APIView):
  
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    setupMyStudents(user)
    students = StudentSerializer(Student.objects.filter(teacher=user), many=True).data
    return JsonResponse(students, safe=False)
        
  def post(self, request):
    user = request.user

    try:
      requestData = json.loads(request.body)
      changes = requestData.get('changes', '')
    except json.JSONDecodeError:
      return Response({"error": "Invalid request data"}, status=400)
    
    errors = []
    updated_students = []
    
    for student_data in changes:
      student_id = student_data.get("id")
      if not student_id:
        errors.append({"error": "存在しない生徒が含まれています"})
        continue
      
      try: 
        student = Student.objects.get(id=student_id, teacher=user)
      except Student.DoesNotExist:
        errors.append({"error": "存在しない生徒が含まれています"})
        continue
      
      serializer = StudentSerializer(student, data=student_data, partial=True)
      if serializer.is_valid():
        serializer.save()
        updated_students.append(serializer.data)
      else:
        errors.append({"error": serializer.errors})
    
    response_data = {
      "updated": updated_students,
      "errors": errors
    }
    
    status_code = 200 if not errors else 400
    return Response(response_data, status=status_code)
  
# 生徒用選択肢を返す
class ChoicesView(APIView):
  def get(self, request):
    serializer = ChoicesSerializer({})
    return Response(serializer.data)

# 個別生徒情報更新
class UpdateStudentView(APIView):
  
  permission_classes = [IsAuthenticated]
  
  def post(self, request):
    user = request.user
    
    try:
      requestData = json.loads(request.body)
      student_data = requestData.get('student', '')
    except json.JSONDecodeError:
      return Response({"error": "Invalid request data"}, status=400)
    
    try:
      student = Student.objects.get(teacher=user, detail__id=student_data['detail']['id'])
    except Student.DoesNotExist:
      return Response({"error": "該当生徒のデータが見つかりませんでした"}, status=400)
    
    serializer = StudentSerializer(student, data=student_data, partial=False)
    if serializer.is_valid():
      serializer.save()
      return Response({"result": "success"}, status=200)
    return Response(serializer.errors, status=400)