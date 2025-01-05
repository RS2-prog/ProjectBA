from rest_framework import serializers
from .models import HelperStudent
from .choices import ContentChoices
from students.serializers import StudentSerializer

class HelperStudentSerializer(serializers.ModelSerializer):
  
  student = StudentSerializer(read_only=True)
  
  class Meta:
    model = HelperStudent
    fields = '__all__'
    
class ChoicesSerializer(serializers.Serializer):
  content_choices = serializers.SerializerMethodField()
  
  def get_content_choices(self, obj):
    return [{"value": choice.value, "label": choice.label} for choice in ContentChoices]