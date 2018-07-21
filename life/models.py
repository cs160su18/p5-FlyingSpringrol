from django.db import models

class Group(models.Model):
	established = models.DateTimeField(auto_now_add=True)
	name = models.CharField(max_length=50)
  
class Pin(models.Model):
  name = models.CharField(max_length=50)
  note = models.CharField(max_length=400)
  lat = models.FloatField()
  long = models.FloatField()
  pin_id = models.IntegerField()
  
class Users(models.Model):
  email = models.CharField(max_length=200)
  password = models.CharField(max_length=200)
  u_id = models.IntegerField()
  
class Map(models.Model):
  name = models.CharField(max_length = 200)
  description = models.TextField()
  map_id = models.IntegerField()
  
class PinGroup(models.Model):
  pg_id = models.IntegerField()
  map_id = models.IntegerField()
  pin_id = models.IntegerField()
  
  

  