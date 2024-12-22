from rest_framework import serializers
from .models import Student, StudentDtl
from .choices import RankChoices, LevelRange, SkillRange, EquipRange, ExSkillRange, LimitRange, RelationshipRange

class StudentDtlSerializer(serializers.ModelSerializer):
  class Meta:
    model = StudentDtl
    fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
  
  detail = StudentDtlSerializer(read_only=True)
  
  class Meta:
    model = Student 
    fields = '__all__'
    
class ChoicesSerializer(serializers.Serializer):
    rank_choices = serializers.SerializerMethodField()
    level_range = serializers.SerializerMethodField()
    ex_skill_range = serializers.SerializerMethodField()
    skill_range = serializers.SerializerMethodField()
    equip_range = serializers.SerializerMethodField()
    limit_range = serializers.SerializerMethodField()
    relationship_range = serializers.SerializerMethodField()

    def get_rank_choices(self, obj):
        return [{"value": choice.value, "label": choice.label} for choice in RankChoices]

    def get_level_range(self, obj):
        return {"min": LevelRange.MIN, "max": LevelRange.MAX}

    def get_ex_skill_range(self, obj):
        return {"min": ExSkillRange.MIN, "max": ExSkillRange.MAX}

    def get_skill_range(self, obj):
        return {"min": SkillRange.MIN, "max": SkillRange.MAX}

    def get_equip_range(self, obj):
        return {"min": EquipRange.MIN, "max": EquipRange.MAX}

    def get_limit_range(self, obj):
        return {"min": LimitRange.MIN, "max": LimitRange.MAX}

    def get_relationship_range(self, obj):
        return {"min": RelationshipRange.MIN, "max": RelationshipRange.MAX}