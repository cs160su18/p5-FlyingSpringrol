from django.urls import path
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('refresh', views.refresh, name = 'refresh'),
    # path('activity/',views.activity, name='activity'),
]