from django.urls import path
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('refresh', views.refresh, name = 'refresh'),
    path('postnote', views.postnote, name = 'postnote'),
    # path('activity/',views.activity, name='activity'),
]