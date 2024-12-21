from rest_framework import serializers
from .models import Student, StudentDtl

class StudentDtlSerializer(serializers.ModelSerializer):
  class Meta:
    model = StudentDtl
    fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
  
  detail = StudentDtlSerializer(read_only=True)
  
  class Meta:
    model = Student 
    fields = '__all__'