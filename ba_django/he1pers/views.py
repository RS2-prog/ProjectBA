import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from students.models import Student
from .models import HelperStudent
from .serializers import ChoicesSerializer, HelperStudentSerializer

# 助っ人設定
class HelperSettingView(APIView):
  
  permission_classes = [IsAuthenticated]
  
  def get(self, request):
    user = request.user

    helpers_data = HelperStudent.objects.filter(student__teacher=user).order_by('content', 'sort_no')
    helpers = HelperStudentSerializer(helpers_data, many=True).data
    contents = ChoicesSerializer({}).data
    response = {
      'helpers': helpers,
      'contents': contents,
    }
    return JsonResponse(response, safe=False)
  
  def post(self, request):
    user = request.user
    
    try:
      requestData = json.loads(request.body)
      helper_data = requestData.get('helper', '')
    except json.JSONDecodeError:
      return Response({"error": "Invalid request data"}, status=400)
    
    student_data = helper_data.get('student')
    content_data = helper_data.get('content')
    sort_no_data = helper_data.get('sort_no')
    
    # 有効な生徒かを確認
    try:
      if not student_data or 'id' not in student_data:
        raise Student.DoesNotExist
      exist_student = Student.objects.get(id = student_data.get('id'))
      if exist_student.teacher != user:
        return Response({"error": "Invalid request data"}, status=400)
    except Student.DoesNotExist:
      HelperStudent.objects.filter(content=content_data, sort_no=sort_no_data).delete()
      return Response({"result": "success"}, status=200)
    
    HelperStudent.objects.filter(student=exist_student).delete()
    HelperStudent.objects.filter(content=content_data, sort_no=sort_no_data).delete()
    new_helper = HelperStudent(
      student=exist_student,
      content=content_data,
      sort_no=sort_no_data
    )
    new_helper.save()
    
    return Response({"result": "success"}, status=200)