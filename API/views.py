from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import *
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
import jwt, datetime
from rest_framework import generics

# Trying Image
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

from rest_framework.exceptions import AuthenticationFailed

@api_view(['POST'])
def RegisterEmail(request):
    if request.data:
        emails=Email.objects.filter(email=request.data)
        if len(emails)==0:
            email = Email.objects.create(email=request.data) 
            serializer=EmailSerializer(email, many=False)   
            return Response(serializer.data)    
        else:
            email = emails[0]
            serializer=EmailSerializer(email, many=False)   
            return Response(serializer.data)
    else:
        return Response({'err: Email not Registered ...'})


class RegisterStudent(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post (self, request, format='json'):
        if request.data:
            key = request.data['user']
            print("Thats the request data => ", request.data)
            userss = SignUpSerializer(data=request.data)
            if userss.is_valid():
                users = Account.objects.create_user(username=key['username'],email=key['email'],password=key['password'])
                Student = student.objects.create(user=users, first_name=key['first_name'], last_name=key['last_name'], phone_number=request.data['phone_number'])
                return Response({'user was created' })
            else:
                fname=key['first_name']
                return Response({f'err: user {fname} was not created'})

# @api_view(['POST'])
# def LoginStudent(request):
#     authentication_classes = [AllowAny]
#     students=student.objects.all()
#     IsStudent=False
#     for stud in students:
#         if stud.user.email==request.data['email']:
#             IsStudent=True
#     if (IsStudent):
#         user = authenticate(email=request.data['email'],password=request.data['password'])
#         if user is not None:
#             return Response({'user':True})
#         else:
#             return Response({'user':False})
#     else:
#         return Response("You are not a student")

class LoginStudent(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Account.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response

@api_view(['POST'])
def LoginTeacher(request):
    students=student.objects.all()
    IsStudent=False
    for stud in students:
        if stud.user.username==request.data['username']:
            IsStudent=True
    if (not IsStudent):     
        print("hahah login teacher ", request.data['username'])   
        user = authenticate(username=request.data['username'],password=request.data['password'])
        if user is not None:
            tkey = Token.objects.get(user=user).key
            return Response({'tkey':tkey,'user':True})
        else:
            return Response({'user':False})
    else:
        return Response("You are not a teacher")

# @api_view(['POST'])
# def SendReceit(request):
#     serializer=SubscriptionSrializer(data=request.data)
#     if 'Authorization' in request.headers:
#         tkn = request.headers['authorization'].split()[1]
#         user = Token.objects.get(key=tkn).user
#         if serializer.is_valid():
#             payment.objects.create( user=user,receit=request.data['cover'])
#             return HttpResponse({'message': 'Book created'}, status=200)
#         else:
#             return HttpResponse('Serializer not valid')
#         # Tuto
        
#         # return Response({'info':True})
#     else:
#         return Response({'info':False})

class StudentData(APIView):  
    permission_classes = [AllowAny]
    authentication_classes = ()

    def get(self, request):
        token= request.headers['authorization'].split()[1]
        print('MyToken ', f"'{token}'")
        payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
        StudentAc = Account.objects.get(id=payload['user_id'])
        print('studentAC ', StudentAc)
        students=student.objects.all()
        for stud in students :
            if stud.user==StudentAc:
                studentt=stud
        if studentt:
            serializer=SignUpSerializer(studentt, many=False)
            return Response(serializer.data)
        else:
            return Response("Can't find the student in Django")

    # if 'Authorization' in request.headers:
    #     tkn = request.headers['authorization'].split()[1]
    #     user = Token.objects.get(key=tkn).user
    #     students=student.objects.all()
    #     for stud in students :
    #         if stud.user==user:
    #             studentt=stud
    #     serializer=SignUpSerializer(studentt, many=False)
    #     return Response(serializer.data)
    # else:
    #     return Response("Can't find the student in Django")

@api_view(['GET'])
def ProfData(request):
    if 'Authorization' in request.headers:
        tkn = request.headers['Authorization'].split()[1]
        print("the token ", tkn)
        user = Token.objects.get(key=tkn).user
        profs=prof.objects.all()
        for pro in profs :
            if pro.user==user:
                proff=pro
        # print('Our student', student) 
        print('proff is', proff)
        serializer=ProfSerializer(proff, many=False)
        return Response(serializer.data)
    else:
        return Response("Can't find the student in Django")

@api_view(['GET'])
def ProfGroups(request):
    if 'Authorization' in request.headers:
        if request.headers['authorization'].split()[0]=='tkey':
            tkn = request.headers['authorization'].split()[1]
            user = Token.objects.get(key=tkn).user
            groups=Group.objects.all()
            GroupList=[]
            for group in groups:
                if group.teacher.user==user:
                    GroupList.append(group)
                
            serializer=GroupSerializer(GroupList, many=True)
            return Response(serializer.data)
        else:
         return Response("You are not a teacher")
    else:
        return Response("User unavailable")


@api_view(['GET'])
def show(request):
    students = student.objects.get(user__username='issou')
    serializers = SignUpSerializer(many=False,instance=students)
    return Response(serializers.data)


# Trying Images
class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        if 'Authorization' in request.headers:
            tkn = request.headers['authorization'].split()[1]
            user = Token.objects.get(key=tkn).user
            posts_serializer = PostSerializer(data=request.data)
            if posts_serializer.is_valid():
                # My Work
                Payment = payment.objects.create(user=user, receit=request.data['image'])

                posts_serializer.save()
                return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print('error', posts_serializer.errors)
                return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# class ProgramView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def get(self, request, *args, **kwargs):
#         programs = Program.objects.all().order_by('-id')
#         serializer = ProgramSerializer(programs, many=True)
#         return Response(serializer.data)

#     def post(self, request, *args, **kwargs):
#         programs_serializer = ProgramSerializer(data=request.data)
#         if programs_serializer.is_valid():
#             programs_serializer.save()
#             return Response(programs_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', programs_serializer.errors)
#             return Response(programs_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class SlideShowView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = Home_Slideshow.objects.all()
        serializer = Home_SlideshowSR(slides, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        slides_serializer = Home_SlideshowSR(data=request.data)
        if slides_serializer.is_valid():
            slides_serializer.save()
            return Response(slides_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', slides_serializer.errors)
            return Response(slides_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class English_SlideShow(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = English_Slideshow.objects.all()
        serializer = English_SlideshowSR(slides, many=True)
        return Response(serializer.data)

class Services_SlideShow(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = Services_Slideshow.objects.all()
        serializer = Services_SlideshowSR(slides, many=True)
        return Response(serializer.data)

class Training_SlideShow(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = Training_Slideshow.objects.all()
        serializer = Training_SlideshowSR(slides, many=True)
        return Response(serializer.data)

    # def post(self, request, *args, **kwargs):
    #     slides_serializer = Home_SlideshowSR(data=request.data)
    #     if slides_serializer.is_valid():
    #         slides_serializer.save()
    #         return Response(slides_serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         print('error', slides_serializer.errors)
    #         return Response(slides_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnglishCards(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = English_Cards.objects.all()
        serializer = EnglishCardsSR(slides, many=True)
        return Response(serializer.data)

class ServicesCards(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = Services_Cards.objects.all()
        serializer = ServicesCardsSR(slides, many=True)
        return Response(serializer.data)

class TrainingCards(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        slides = Training_Cards.objects.all()
        serializer = TrainingCardsSR(slides, many=True)
        return Response(serializer.data)











class LessonsView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        if 'Authorization' in request.headers:
            token= request.headers['authorization'].split()[1]
            print('MyToken ', f"'{token}'")
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user = Account.objects.get(id=payload['user_id'])

            groups=user.student.groups.all()
            lessons= Lesson.objects.all()
            LessonsList=[]
            for lesson in lessons:
                for group in groups:
                     LessonGroups=lesson.groups.all()
                     for LessonGroup in LessonGroups:
                         if LessonGroup==group:
                             LessonsList.append(lesson)
           
            serializer = LessonSerializer(LessonsList, many=True)
            return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        lessons_serializer = LessonSerializer(data=request.data)
        if lessons_serializer.is_valid():
            lessons_serializer.save()
            return Response(lessons_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', lessons_serializer.errors)
            return Response(lessons_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def ProfLessons(request):
    if 'Authorization' in request.headers:
        tkn = request.headers['Authorization'].split()[1]
        user = Token.objects.get(key=tkn).user
        GroupId=request.data['id']

        lessons= Lesson.objects.all()
        LessonsList=[]

        for lesson in lessons:
            LessonGroups=lesson.groups.all()
            for LessonGroup in LessonGroups:
                if LessonGroup.id==GroupId:
                    LessonsList.append(lesson)
        
        serializer = LessonSerializer(LessonsList, many=True)
        return Response(serializer.data)
    else:
        return Response("You're not authorized")

@api_view(['POST'])
def LockLesson(request):
    GroupId=request.data['group']['id']
    LessonId=request.data['program']['id']
    group=Group.objects.get(id=GroupId)
    lesson=Lesson.objects.get(id=LessonId)

    lesson.locked.add(group)
    print('hihihi gr ', group)
    print('hihihi pr ', lesson)
    return Response(request.data['group'])

@api_view(['POST'])
def UnLockLesson(request):
    GroupId=request.data['group']['id']
    LessonId=request.data['program']['id']
    group=Group.objects.get(id=GroupId)
    lesson=Lesson.objects.get(id=LessonId)

    lesson.locked.remove(group)
    print('hihihi gr ', group)
    print('hihihi pr ', lesson)
    return Response(request.data['group'])

@api_view(['POST'])
def passedTest(request):
    # email=Email.objects.filter(email=request.data['userName'])[0]
    passed_test=request.data['passedTest']

    if passed_test=='test1':
        upTest = Email.objects.filter(email=request.data['userName']).update(test1=True)
    elif passed_test=='test2':
        upTest = Email.objects.filter(email=request.data['userName']).update(test2=True)
    else:
        upTest = Email.objects.filter(email=request.data['userName']).update(test3=True)
    print('passed test for ', request.data['userName'], ' is ', passed_test)
    return Response(request.data['passedTest'])


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
