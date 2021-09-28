from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name','last_name','username', 'email','password']
        extra_kwargs={'password':{'write_only':True}}

class UserProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name','last_name']

class ProfSerializer(serializers.ModelSerializer):
    user = UserProfSerializer()
    class Meta:
        model = prof
        fields = ['user','phoneNumber']


class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username','password']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = '__all__'

class ModuleSerializer(serializers.ModelSerializer):
    prof = ProfSerializer(many=True)
    class Meta:
        model = module
        fields = ['name','prof']

class CategorySerializer(serializers.ModelSerializer):
    module = ModuleSerializer()
    class Meta:
        model = category
        fields = ['name','module']

class LevelSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = level
        fields = ['name','category']

class GroupSerializer(serializers.ModelSerializer):
    level=LevelSerializer()
    teacher=ProfSerializer()
    class Meta:
        model = Group
        fields = ['id', 'name', 'level', 'teacher']

class SignUpSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    groups = GroupSerializer(many=True)
    class Meta:
        model = student
        fields = ['user', 'first_name', 'last_name', 'phone_number', 'groups']

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model= Unit
        fields = ['name']

class LessonSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    unit = UnitSerializer()
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'content', 'video', 'date_created', 'locked', 'groups', 'unit']

class SubscriptionSrializer(serializers.ModelSerializer):
    class Meta:
        model = payment
        fields = ['user','receit']


# Trying Images
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

# class ProgramSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Program
#         fields = '__all__'

class Home_SlideshowSR(serializers.ModelSerializer):
    class Meta:
        model = Home_Slideshow
        fields = '__all__'

class English_SlideshowSR(serializers.ModelSerializer):
    class Meta:
        model = English_Slideshow
        fields = '__all__'

class Services_SlideshowSR(serializers.ModelSerializer):
    class Meta:
        model = English_Slideshow
        fields = '__all__'

class Training_SlideshowSR(serializers.ModelSerializer):
    class Meta:
        model = Training_Slideshow
        fields = '__all__'

class EnglishCardsSR(serializers.ModelSerializer):
    class Meta:
        model = English_Cards
        fields = '__all__'

class ServicesCardsSR(serializers.ModelSerializer):
    class Meta:
        model = Services_Cards
        fields = '__all__'

class TagSR(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class TrainingCardsSR(serializers.ModelSerializer):
    tag=TagSR()
    class Meta:
        model = Training_Cards
        fields = '__all__'
        
class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'
        


    