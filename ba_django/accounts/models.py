from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinLengthValidator, MaxLengthValidator

class TeacherManager(BaseUserManager):
  def create_user(self, email, username, password=None, **extra_fields):
    if not email:
      raise ValueError('メールアドレスは必須です')
    if not username:
      raise ValueError('先生の名前は必須です')
    email = self.normalize_email(email)
    user = self.model(email=email, username=username, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def create_superuser(self, email, username, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, username, password, **extra_fields)
    
class Teacher(AbstractBaseUser, PermissionsMixin):
  
  objects = TeacherManager()
  
  email = models.EmailField(unique=True, verbose_name='メールアドレス')
  username = models.CharField(max_length=30, unique=False, verbose_name='先生の名前')
  friend_code = models.CharField(max_length=8, 
                                 validators=[
                                   MinLengthValidator(8, message='8桁のフレンドコードをご入力ください'),
                                   MaxLengthValidator(8, message='8桁のフレンドコードをご入力ください')
                                 ],
                                null=True, blank=True, verbose_name="フレンドコード")
  is_staff = models.BooleanField(default=False, verbose_name='スタッフフラグ')
  
  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["username"]
  
  def __str__(self) -> str:
    return self.username +'_' + self.email
  