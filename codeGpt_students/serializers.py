from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class Student_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Student  #model name defined in model.py
        # fields = ['name','email']
        fields = '__all__'

class Questions_Serializer(serializers.ModelSerializer):

    class Meta:
        model = Question #model name defined in model.py
        fields = '__all__'

# create user with tocken
class Createuser_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User  #model name defined in django.contrib.auth.models 
        fields = ['username','password','id']

    def create(self, validated_data):
        user = User.objects.create(username = validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user


# user Login and authentication

class Authuser_Serializer(serializers.ModelSerializer):
   pass



# admin
class add_Course_overview(serializers.ModelSerializer):
    class Meta:
        model = Course_overview
        fields = '__all__'



