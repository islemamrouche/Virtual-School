from django.urls import path,include
from .views import *
from rest_framework.authtoken import views

urlpatterns = [
    path('register/',RegisterStudent.as_view(),name='registration'),
    path('show',show,name='name'),
    path('login/',LoginStudent.as_view(),name='login'),
    path('login_teacher',LoginTeacher,name='login_teacher'),
    # path('receit',SendReceit,name='start-study'),
    path('student-data/',StudentData.as_view(), name='student-data'),
    path('prof-data',ProfData,name='prof-data'),
    path('prof-groups',ProfGroups,name='prof-data'),
    path('posts/',PostView.as_view(), name= 'posts_list'),
    path('register_email/',RegisterEmail, name= 'register_email'),
    path('slide_show/',SlideShowView.as_view(), name= 'slideshow'),
    path('english_slideshow/',English_SlideShow.as_view(), name= 'english_slideshow'),
    path('services_slideshow/',Services_SlideShow.as_view(), name= 'services_slideshow'),
    path('training_slideshow/',Training_SlideShow.as_view(), name= 'training_slideshow'),
    path('english_cards/',EnglishCards.as_view(), name= 'english_cards'),
    path('services_cards/',ServicesCards.as_view(), name= 'services_cards'),
    path('training_cards/',TrainingCards.as_view(), name= 'training_cards'),
    path('lessons/',LessonsView.as_view(), name= 'lessons'),
    path('prof-lessons/',ProfLessons, name= 'prof-lessons'),
    path('lock-lesson/',LockLesson, name= 'lock-lesson'),
    path('unlock-lesson/',UnLockLesson, name= 'unlock-lesson'),
    path('passed_test/',passedTest, name= 'passed_test'),
    path('logout/blacklist/',BlacklistTokenUpdateView.as_view(), name= 'blacklist'),
]

