from django.urls import path 
from .views import HelperSettingView, HelperSearchView

app_name = "helpers"

urlpatterns = [
    path('setting/', HelperSettingView.as_view(), name='setting'),
    path('search', HelperSearchView.as_view(), name='search'),
]
