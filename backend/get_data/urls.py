from django.urls import path
from . import views

app_name = 'get_data'

urlpatterns = [
    path('project/<slug:slug>-id-<int:id>/', views.project_detail, name='project_detail'),
    path('get_image/<str:name>/', views.get_image, name='get_image'),
    path('get_3d_model/<str:name>/', views.get_3d_model, name='get_3d_model'),
]