from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from .views import *

route = routers.DefaultRouter()
route.register("", PostView, basename="home")
urlpatterns = [
    path('sliders/', SliderView.as_view()),
    path("posts/", include(route.urls)),
    path('about/', AboutView.as_view()),
    path('services/', ServiceView.as_view()),
    path('portfolios/', PortfolioView.as_view()),
    path('singleservices/<int:pk>/', SingleServiceView.as_view()),
    path('singleportfolio/<int:pk>/', SinglePortfolioView.as_view()),
    path('team/', TeamView.as_view()),
    path('client/', ClientView.as_view()),
    path("register/", RegisterView.as_view()),
    path("userdataupdate/", UserDataUpdate.as_view()),
    # path('posts/', PostView.as_view()),
    path("profile/", ProfileView.as_view()),
    path("profileupdate/", ProfileUpdate.as_view()),
    path("login/", obtain_auth_token),
]
