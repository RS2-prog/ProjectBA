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
  
class DamageTypeChoices(models.TextChoices):
  TYPE_1 = '1', '爆発'
  TYPE_2 = '2', '貫通'
  TYPE_3 = '3', '神秘'
  TYPE_4 = '4', '振動'
  
class ArmorTypeChoices(models.TextChoices):
  TYPE_1 = '1', '軽装備'
  TYPE_2 = '2', '重装甲'
  TYPE_3 = '3', '特殊装甲'
  TYPE_4 = '4', '弾力装甲'
  
class PositionChoices(models.TextChoices):
  POS_1 = '1', 'FRONT'
  POS_2 = '2', 'MIDDLE'
  POS_3 = '3', 'BACK'
  
class RoleChoices(models.TextChoices):
  ROLE_1 = '1', 'アタッカー'
  ROLE_2 = '2', 'タンク'
  ROLE_3 = '3', 'ヒーラー'
  ROLE_4 = '4', 'サポーター'
  ROLE_5 = '5', 'T.S'
  
class ClassChoices(models.TextChoices):
  CLASS_1 = '1', 'STRIKER'
  CLASS_2 = '2', 'SPECIAL'
  
class SchoolChoices(models.TextChoices):
  SCHOOL_1 = '1', 'アビドス'
  SCHOOL_2 = '2', 'アリウス'
  SCHOOL_3 = '3', 'ヴァルキューレ'
  SCHOOL_4 = '4', 'ゲヘナ'
  SCHOOL_5 = '5', '山海経'
  SCHOOL_6 = '6', 'トリニティ'
  SCHOOL_7 = '7', '百鬼夜行'
  SCHOOL_8 = '8', 'ミレニアム'
  SCHOOL_9 = '9', 'レッドウィンター'
  SCHOOL_10 = '10', 'アビドス'
  SCHOOL_11 = '11', 'SRT'
  SCHOOL_99 = '99', 'その他'
  
