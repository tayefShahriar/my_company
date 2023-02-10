from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register([BlogUser, Slider, AboutUs, Service, Portfolio, Team, Client, Post])