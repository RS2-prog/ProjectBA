from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.core.exceptions import ValidationError

class TeacherManager(BaseUserManager):
  def create_user(self, email, username, password=None, confirm_password=None, **extra_fields):
    
    # 必須フィールドチェック
    if not email:
      raise ValidationError({'email': 'メールアドレスは必須です'})
    if not username:
      raise ValidationError({'username': '先生の名前は必須です'})
    if not password:
      raise ValidationError({'password': 'パスワードは必須です'})
    
    # 既存ユーザーチェック
    if Teacher.objects.filter(email=email).exists():
      raise ValidationError({'email': '既に使用されているメールアドレスです'})
    
    # パスワード一致チェック
    if password != confirm_password:
      raise ValidationError({'password': 'パスワードが一致しません'})
    
    email = self.normalize_email(email)
    user = self.model(email=email, username=username, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def create_superuser(self, email, username, password=None, confirm_password=None, **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, username, password, confirm_password, **extra_fields)
    
class Teacher(AbstractBaseUser, PermissionsMixin):
  
  email = models.EmailField(unique=True, verbose_name='メールアドレス')
  username = models.CharField(max_length=30, unique=False, verbose_name='先生の名前')
  friend_code = models.CharField(max_length=8, 
                                 validators=[
                                   MinLengthValidator(8, message='8桁のフレンドコードをご入力ください'),
                                   MaxLengthValidator(8, message='8桁のフレンドコードをご入力ください')
                                 ],
                                null=True, blank=True, verbose_name="フレンドコード")
  is_staff = models.BooleanField(default=False, verbose_name='スタッフフラグ')
  friend_code = models.CharField(max_length=8, null=True, blank=True)
  
  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ["username"]
  
  def __str__(self) -> str:
    return self.username +'_' + self.email
  
  objects = TeacherManager()  