from django.db import models

class RankChoices(models.TextChoices):
  RANK_1 = '1', '★'
  RANK_2 = '2', '★★'
  RANK_3 = '3', '★★★'
  RANK_4 = '4', '★★★★'
  RANK_5 = '5', '★★★★★'
  UW_2 = '6', '固有★★'
  UW_3 = '7', '固有★★★'
  
class LevelRange:
  MIN = 1
  MAX = 90
  
class ExSkillRange:
  MIN = 1
  MAX = 5

class SkillRange:
  MIN = 0
  MAX = 10
  
class EquipRange:
  MIN = 0
  MAX = 9

class LimitRange:
  MIN = 0
  MAX = 25

class RelationshipRange:
  MIN = 1
  MAX = 100