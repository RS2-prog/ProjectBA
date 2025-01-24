from django.db import models
from accounts.models import Teacher
from .choices import RankChoices, LevelRange, ExSkillRange, SkillRange, EquipRange, LimitRange, RelationshipRange, DamageTypeChoices, ArmorTypeChoices, PositionChoices, RoleChoices, ClassChoices, SchoolChoices

class StudentDtl(models.Model):
  impl_order = models.CharField(unique=True, max_length=3)
  name = models.CharField(max_length=15, unique=True)
  wiki_link = models.CharField(max_length=240, null=True, blank=True)
  damage_type = models.CharField(max_length=1, choices=DamageTypeChoices, default='1')
  armor_type = models.CharField(max_length=1, choices=ArmorTypeChoices, default='1')
  position = models.CharField(max_length=1, choices=PositionChoices, default='1')
  role = models.CharField(max_length=1, choices=RoleChoices, default='1')
  s_class = models.CharField(max_length=1, choices=ClassChoices, default='1')
  school = models.CharField(max_length=2, choices=SchoolChoices, default='1')

  def __str__(self):
    return self.impl_order + ': ' + self.name

class Student(models.Model):
  teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher')
  detail = models.ForeignKey(StudentDtl, on_delete=models.CASCADE, related_name='detail')
  rank = models.CharField(max_length=1, choices=RankChoices, default=1)
  level = models.IntegerField(choices=[(i, str(i)) for i in range(LevelRange.MAX, LevelRange.MIN + 1)], default=1)
  ex = models.IntegerField(choices=[(i, str(i)) for i in range(ExSkillRange.MAX, ExSkillRange.MIN + 1)], default=1)
  ns = models.IntegerField(choices=[(i, str(i)) for i in range(SkillRange.MAX, SkillRange.MIN + 1)], default=0)
  ss = models.IntegerField(choices=[(i, str(i)) for i in range(SkillRange.MAX, SkillRange.MIN + 1)], default=0)
  ps = models.IntegerField(choices=[(i, str(i)) for i in range(SkillRange.MAX, SkillRange.MIN + 1)], default=0)
  equip_1 = models.IntegerField(choices=[(i, str(i)) for i in range(EquipRange.MAX, EquipRange.MIN + 1)], default=0)
  equip_2 = models.IntegerField(choices=[(i, str(i)) for i in range(EquipRange.MAX, EquipRange.MIN + 1)], default=0)
  equip_3 = models.IntegerField(choices=[(i, str(i)) for i in range(EquipRange.MAX, EquipRange.MIN + 1)], default=0)
  lim_health = models.IntegerField(choices=[(i, str(i)) for i in range(LimitRange.MAX, LimitRange.MIN + 1)], default=0)
  lim_attach = models.IntegerField(choices=[(i, str(i)) for i in range(LimitRange.MAX, LimitRange.MIN + 1)], default=0)
  lim_heal = models.IntegerField(choices=[(i, str(i)) for i in range(LimitRange.MAX, LimitRange.MIN + 1)], default=0)
  relationship = models.IntegerField(choices=[(i, str(i)) for i in range(RelationshipRange.MAX, RelationshipRange.MIN + 1)], default=1)
  isOwned = models.BooleanField(default=False)

  def __str__(self):
    return self.teacher.username + ':' + self.detail.name