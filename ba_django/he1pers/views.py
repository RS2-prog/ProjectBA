from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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