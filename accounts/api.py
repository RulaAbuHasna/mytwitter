from rest_framework.response import Response
from rest_framework import generics,permissions
from knox.models import AuthToken
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer

class RegisterAPI(generics.GenericAPIView): #dont need to write a funcionality 
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        selializer = self.get_serializer(data=request.data)
        selializer.is_valid(raise_exception = True)
        user = selializer.save()
        return Response({
            "user" : UserSerializer(user, context = self.get_serializer_context()).data,
            'token' : AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        selializer = self.get_serializer(data=request.data)
        selializer.is_valid(raise_exception = True)
        user = selializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user" : UserSerializer(user, context = self.get_serializer_context()).data,
            'token' : token
        }, status=200)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
      permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user