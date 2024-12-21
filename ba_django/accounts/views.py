from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from .models import Teacher
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class LoginView(APIView):
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')
    print(email, password)
    user = authenticate(username=email, password=password)
    
    if user is not None:
      refresh = RefreshToken.for_user(user)
      # アクセストークンをJSONで返す
      response = Response({
                'access': str(refresh.access_token), 
            }, status=200)
      # リフレッシュをCOOKIEで返す
      response.set_cookie(
                key='refresh_token', 
                value=str(refresh), 
                httponly=True, 
                secure=True,
                samesite='Strict', 
                max_age=7 * 24 * 60 * 60
            )
      return response
    else:
      return Response({'error': 'ログインに失敗しました。'}, status=401)

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh = request.COOKIES.get('refresh_token')
            if refresh is None:
                return Response({'error': 'リフレッシュトークンが見つかりません。'}, status=400)
            
            RefreshToken(refresh).blacklist()
            
            response = Response(status=200)
            response.delete_cookie('refresh_token')
            return response
        except Exception as e:
            return Response({'error': 'ログアウト中にエラーが発生しました。'}, status=400)

class RefreshTokenView(APIView):
    def post(self, request):
        try:
            refresh = request.COOKIES.get('refresh_token')
            if refresh is None:
                return Response({'error': 'リフレッシュトークンが見つかりません。'}, status=401)

            new_access_token = RefreshToken(refresh).access_token
            return Response({'access': str(new_access_token)}, status=200)
        except Exception as e:
            return Response({'error': 'トークンの更新中にエラーが発生しました。'}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    def post(self, request):
        data = request.data
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        
        try:
            user = Teacher.objects.create_user(
                email=email,
                username=username,
                password=password,
                confirm_password=confirm_password
            )
            return Response({'message': 'アカウントが作成されました'}, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:
            return Response({'errors': e.message_dict}, status=status.HTTP_400_BAD_REQUEST)