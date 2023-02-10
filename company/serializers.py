from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = "__all__"
    
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(logo)

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Portfolio
        fields = "__all__"

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(logo)

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"
    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {"write_only": True, 'required': True}, }

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        user = super().create(validated_data)
        # user = User.objects.create(**validated_data)
        return user




# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id', 'password', 'email')
#         extra_kwargs = {'password': {'write_only': True, 'required': True}}
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         Token.objects.create(user=user)
#         BlogUser.objects.create(user=user)
#         return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogUser
        fields = "__all__"
        read_only_fields = ['user']

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        print(attrs['user'])
        return attrs

    def to_representation(self, instance):
        response = super().to_representation(instance)
        # print(response)
        response['user'] = UserSerializer(instance.user).data
        return response

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['user']

    def getimage(self, *args, **kwargs):
        request = self.context.get('request')
        return request.url(image)
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = ProfileSerializer(instance.user.bloguser).data
        return response

    def validate(self, obj):
        obj['user'] = self.context['request'].user
        return obj


