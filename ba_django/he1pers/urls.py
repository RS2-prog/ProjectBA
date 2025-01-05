from django.urls import path 
from .views import HelperSettingView

app_name = "helpers"

urlpatterns = [
    path('setting/', HelperSettingView.as_view(), name='setting'),
]
