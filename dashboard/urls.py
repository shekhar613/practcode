from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    # API ENDPOINTS
    
    path('addQuestion/<str:id>/',views.addQuestions.as_view()),
]
