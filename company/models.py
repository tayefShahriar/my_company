from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from sorl.thumbnail import ImageField, get_thumbnail
from PIL import Image
from django_resized import ResizedImageField
# Create your models here.

User = get_user_model()

class BlogUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, blank=True, null=True)
    mobile = models.CharField(max_length=16, null=True, blank=True)
    address = models.TextField(blank=True, null=True)
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    image = models.ImageField(upload_to="profile", default='profile/default.jpg', null=True, blank=True)
    def __str__(self):
        return self.user.email
    
@receiver(post_save, sender=User)
def createBlogUser(sender, instance, created, *args, **kwargs):
    if created:
        BlogUser.objects.create(user=instance)
        Token.objects.create(user=instance)

@receiver(post_save, sender=BlogUser)
def createUsername(sender, instance, created, *args, **kwargs):
    if created:
        instance.username = f"blogUser{instance.id}"
        instance.save()

class Slider(models.Model):
    name = models.CharField(max_length=200)
    details = models.TextField()
    image = ResizedImageField(size=[1920, 1080], upload_to='slider')
    url = models.TextField(default='#')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class AboutUs(models.Model):
    description = models.TextField()
    image = ResizedImageField(size=[1024, 768], upload_to='aboutus')
    date = models.DateTimeField(auto_now_add=True)

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    features = models.TextField()
    logo = ResizedImageField(size=[100, 100], upload_to='logo')

    def __str__(self):
        return self.title

class Portfolio(models.Model):
    title = models.CharField(max_length=200)
    details = models.TextField()
    image = ResizedImageField(size=[1197, 777], upload_to='portfolio')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Client(models.Model):
    name = models.CharField(max_length=100)
    details = models.TextField()
    logo = ResizedImageField(size=[1197, 777], upload_to = 'client')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(null=True, blank=True, max_length=200)
    qualification = models.TextField()
    email = models.EmailField()
    image = ResizedImageField(size=[1197, 777], upload_to = 'team')

    def __str__(self):
        return self.name
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, max_length=100)
    title = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateField(auto_now_add=True)
    image = models.ImageField(upload_to="post", null=True, blank=True)

    def __str__(self):
        return self.title


    
    
