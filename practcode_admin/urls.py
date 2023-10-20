from django.urls import path
from . import views
from rest_framework.authtoken import views as authtoken_views
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView
)

urlpatterns = [
    path('', views.admin, name='admin'),
    # API views urls
    path('add-course/',views.Admin_access.as_view()),
    path('fetch-all/<str:mode>',views.Admin_access.as_view()),
   
]
handler404 = 'codeGpt_students.views.error_page_not_found'