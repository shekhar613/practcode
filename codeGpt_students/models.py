from django.db import models

# Create your models here.
class Student(models.Model):
    username = models.CharField(default="-",max_length=15)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    contact = models.CharField(max_length=13)
    collegeName = models.CharField(max_length=150)
    courseName = models.CharField(max_length=100)
    year = models.CharField(max_length=10)
    token = models.JSONField(default=dict)
    device = models.JSONField(default=dict)
    _tempOTP = models.CharField(default="OTP",max_length=6)
    _isVarified = models.BooleanField(default=False)

class Students_Status(models.Model):
    refresnce_student_id = models.IntegerField(null=False)
    student_info = models.JSONField(default=dict)
    student_category = models.CharField(default="Basic",max_length=100)



class Question(models.Model):
    language = models.CharField(max_length=20)
    category = models.CharField(max_length=150)
    level = models.CharField(max_length=100)
    question = models.CharField(max_length=100)
    testcases = models.JSONField()
    expected = models.JSONField()
    example = models.CharField(max_length=100,default="")
    exp_inputs = models.CharField(max_length=100,default="")
    exp_outputs = models.CharField(max_length=100,default="")
    constraint = models.CharField(max_length=100,default=None)

class Course_overview(models.Model):
    courseImg = models.BinaryField()
    category = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    level = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    ratings = models.CharField(max_length=10,default="0")
    price = models.CharField(max_length=100,default="FREE")
    creator = models.CharField(max_length=20,default="Practcode")
    numberOfSections = models.IntegerField()
    description = models.CharField(max_length=200)
    # section data
    sectionData = models.JSONField(default=dict)
    sections_descriptions = models.CharField(default="Practcode",max_length=200) 

class quizes(models.Model):
    language = models.CharField(max_length=20)
    category = models.CharField(max_length=150)
    level = models.CharField(max_length=100)
    quiz_title = models.CharField(max_length=100)
    quizes = models.JSONField()
    

   


