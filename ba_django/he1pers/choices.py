from django.db import models

class ContentChoices(models.TextChoices):
  Content_1 = '1', '総力戦/大決戦'
  Content_2 = '2', '合同火力演習'
  Content_3 = '3', '占領戦'
  Content_4 = '4', '制約解除決戦'
