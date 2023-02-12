from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from django.utils import timezone
from .models import *
from .serializers import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.

class SliderView(APIView):
    def get(self, request):
        slider_obj = Slider.objects.all()
        slider_serializer = SliderSerializer(
            slider_obj, many=True, context={'request': request}
        ).data
        return Response(slider_serializer)

class AboutView(APIView):
    def get(self, request):
        about_obj = AboutUs.objects.all().order_by('-date')[:1]
        about_serializer = AboutSerializer(
            about_obj, many=True, context={'request': request}
        ).data
        return Response(about_serializer)

class ServiceView(APIView):
    def get(self, request):
        service_obj = Service.objects.all().order_by('-id')
        service_serializer = ServiceSerializer(
            service_obj, many=True, context={'request': request}
        ).data
        return Response(service_serializer)

class SingleServiceView(APIView):
    def get(self, request, pk):
        service_obj = Service.objects.filter(id=pk)
        service_serializer = ServiceSerializer(
            service_obj, many=True, context={'request': request}
        ).data
        return Response(service_serializer)

class PortfolioView(APIView):
    def get(self, request):
        portfolio_obj = Portfolio.objects.all().order_by('-id')[:6]
        portfolio_serializer = PortfolioSerializer(
            portfolio_obj, many=True, context={'request': request}
        ).data
        return Response(portfolio_serializer)

class SinglePortfolioView(APIView):
    def get(self, request, pk):
        portfolio_obj = Portfolio.objects.filter(id=pk)
        portfolio_serializer = PortfolioSerializer(
            portfolio_obj, many=True, context={'request': request}
        ).data
        return Response(portfolio_serializer)

class ClientView(APIView):
    def get(self, request):
        client_obj = Client.objects.all().order_by('-id')
        client_serializer = ClientSerializer(
            client_obj, many=True, context={'request': request}
        ).data
        return Response(client_serializer)

class TeamView(APIView):
    def get(self, request):
        team_obj = Team.objects.all().order_by('-id')[:6]
        team_serializer = TeamSerializer(
            team_obj, many=True, context={'request': request}
        ).data
        return Response(team_serializer)

class PostView(ModelViewSet):
    # permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    queryset = Post.objects.all().order_by("-id")
    serializer_class = PostSerializer

class ProfileView(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def get(self, request):
        user = request.user
        pquery = BlogUser.objects.get(user=user)
        serializer = ProfileSerializer(pquery)
        return Response({
            "message": "Request is get",
            "userdata": serializer.data,
        })

class RegisterView(APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response({'error': False, 'message': "User Was Created!!"})
        return Response({'error': True, 'message': "User Was Not Crated!!"})

class UserDataUpdate(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        user = request.user
        data = request.data
        user_obj = User.objects.get(email=user)
        # print(user_obj, "$$$$$$$$$$$")
        user_obj.first_name = data['first_name']
        user_obj.last_name = data['last_name']
        user_obj.email = data['email']
        user_obj.save()
        return Response({"message": "user data is updated"})

class ProfileUpdate(APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        try:
            user = request.user
            query = BlogUser.objects.get(user=user)
            # print(request.data)
            serializer = ProfileSerializer(query, data=request.data, context={'request': request})
            serializer.is_valid()
            # print(serializer)
            serializer.save()
            respnse_msg = {"error": False, "message": "profile is updated"}
        except:
            respnse_msg = {"error": True, "message": "profile is not updated"}
        return Response(respnse_msg)

class SearchView(APIView):
    def get(self, request, q):
        data = {}
        posts_lookup = (Q(title__icontains = q) |
                        Q(text__icontains = q) )
        post_obj = Post.objects.filter(date__lte = timezone.now()).filter(posts_lookup)
        data['post'] = PostSerializer(post_obj, many=True, context={'request': request}).data
        service_lookup = (Q(title__icontains = q) |
                           Q(description__icontains = q) |
                           Q(features__icontains = q))
        service_obj = Service.objects.filter(service_lookup)
        data['service'] = ServiceSerializer(service_obj, many=True, context={'request': request}).data
        return Response(data)
