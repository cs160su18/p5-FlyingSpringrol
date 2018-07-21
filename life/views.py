from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize 
from .models import *

import json

def index(request):
    return render(request, 'life/index.html')
   
@csrf_exempt
def postnote(request):
    parsed = request.body.decode('utf-8')
    j = json.loads(parsed)
    count = 0
    p = Pin(note = j['note'], pin_id = count, long = j['long'], lat = j['lat'])
    p.save()
    return HttpResponse('300')
  
def refresh(request):
    pins = Pin.objects.all()
    response = serialize('json', pins)
    return HttpResponse(response, content_type = "application/json")