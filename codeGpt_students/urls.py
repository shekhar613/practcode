from django.urls import path
from . import views
from rest_framework.authtoken import views as authtoken_views
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.userlogin, name='userlogin'),
    path('sign-up', views.createUser, name='createUser'),
    path('forgetpassword', views.forgetPassword, name='forgetpassword'),
    path('dashboard', views.userDashboard, name='userDashboard'),
    path('testcase', views.testingCompiler, name='testingCompiler'),
    path('codeoutput', views.test_compilerCode, name='test_compilerCode'),
    path('mycourses', views.mycourses, name='mycourses'),

    path('course-details',views.course_details,name='course_details'),
    path('course/<int:id>',views.course_by_id,name='course_by_id'),
    path('services',views.services,name='services'),
    # API Views with authentications
    path('user/',views.Authenticateuser.as_view()),
    path('register/',views.Registeruser.as_view()), #token auhtentication
    path('Authlogin/',views.LoginAuth_token.as_view()),
    path('Email-check/recovery/',views.RecoverUser_Account.as_view()),
   
    #admin pannel
    path('practcode-admin-controls/', views.admin, name='admin'),
    # API views urls
    path('add-course/',views.Practcode_Courses.as_view()),
    path('admin-access/fetch-all/<str:mode>',views.Admin_access.as_view()),    




]
handler404 = 'codeGpt_students.views.error_page_not_found'