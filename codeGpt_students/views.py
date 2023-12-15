from django.shortcuts import render
from django.http import HttpResponse
import json
from codeGpt_students import compiler ,testcase,verifyAccount_djmail
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
# utilities
from codeGpt_students._utilities import test_case_process

def index(request):


    return render(request,"home.html")

def userlogin(request):
    return render(request,"useraccount/login.html")

def createUser(request):
    return render(request,"useraccount/signup.html")

def forgetPassword(request):
    return render(request,"useraccount/forgetpassword.html")

def userDashboard(request):
    return render(request,"user_dashboard.html")

def testingCompiler(request):
    Questions_objs = Question.objects.all()
    serializer = Questions_Serializer(Questions_objs,many=True)
    data = {}
    questionData = {}
   
    for i in range(len(serializer.data)):
        data[i] = [serializer.data[i]["question"],serializer.data[i]["id"]]
        questionData[serializer.data[i]['id']] = [serializer.data[i]["example"], serializer.data[i]["exp_inputs"] , serializer.data[i]["exp_outputs"],serializer.data[i]["constraint"]]
       
    return render(request,"newcompiler.html",{'ExamplesQuestion': json.dumps(dict(questionData)),'testcases':data ,'totalQues':len(serializer.data)})

def test_compilerCode(request):
    try:
        if request.method == "POST":

            # For Test the user code
            if(json.loads(request.body)["mode"]=="Testcode"):
                print("-"*15)
                Questions_objs = Question.objects.get(id=json.loads(request.body)["questionId"])
                serializer = Questions_Serializer(Questions_objs)
                
                print()
                print(str(json.loads(request.body)["code"]))
                
                testCaseStatus = testcase.play({
                    'id': json.loads(request.body)["questionId"],
                    'question': str(json.loads(request.body)["code"]),
                    'test_cases':json.loads(serializer.data['testcases'])['Public'], 'expected_outputs': json.loads(serializer.data['expected'])['Public'],
                    'language': json.loads(request.body)["language"]
                    })
                
                return JsonResponse(testCaseStatus)
            # For Submit the user code and retrun private testcases result
            else:
                pass

        else:

            return render(request,"home.html")
    except Exception as TestcaseError:
        print(TestcaseError)

def mycourses(request):
    return render(request,"mycourses.html")

def course_details(request):
    return render(request,"courses/All_courses.html")

def course_by_id(request,id):
    print(id)
    return render(request,"courses/course_details.html")

def services(request):
    return render(request,"services.html")

def error_page_not_found(request,exception):
    return render(request,'404.html') 

def quiz(request):
    
    return render(request,'quiz/check_new_user.html')


def take_course(request):
    # load all the topics from the json file
    with open('codeGpt_students/c-course-sample-data.json','r') as quizes:
        file_contents = json.loads(quizes.read())
        data={}
    for d in file_contents:
        data[d]=[]
        for i in file_contents[d]:
            data[d].append(i)
    
    return render(request,'courses/take_course.html',{"data":data})

def profile(request,data):
    return render(request,'student/profile.html')

# django JWT
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import IsAuthenticated

def check_user_exists(email):
    try:
        user = Student.objects.get(email=email)
        return True
    except Exception as E:
        return False

# create user account and return token
class Registeruser(APIView):
    
    def post(self,request):
        if request.data['action']=="createUser":
            print(request.data)
            try:
                _checkeMail = check_user_exists(request.data['email'])
                if _checkeMail:
                    _checkeMail = True
                else:
                    _checkeMail = False
            except Exception as e:
                _checkeMail = False
            
            if len(request.data)!=0 and _checkeMail ==False:
               
                # creating user in user model of django with token
                user_serializer = Createuser_Serializer(data =request.data)
                if not user_serializer.is_valid():
                    print(user_serializer.errors)
                    return Response({"error":user_serializer.errors,"key":"username"})
                
                user_serializer.save()
                
                
                # Token generation and store
                user = User.objects.get(username = user_serializer.data['username'])
                refresh = RefreshToken.for_user(user)

                # Storeing other data of student  
                request.data['token']={'refresh': str(refresh),'access': str(refresh.access_token)}
                request.data["_tempOTP"]=verifyAccount_djmail.userVarification_email([request.data['email']])
                
                Student_dataserializer = Student_Serializer(data=request.data)
                if not Student_dataserializer.is_valid():
                        er = dict((Student_dataserializer.errors))
                        print(er.keys())
                        User.objects.get(username = user_serializer.data['username']).delete()
                    
                        return Response({"error":Student_dataserializer.errors,"key":er.keys()})
                
                Student_dataserializer.save()  

                return Response({"token":{
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'username':Student_dataserializer.data['username']
                        }
                        
                        },status=200
                    )
            else:
                if _checkeMail:
                    return Response({"error":"Email already exist","key":"email"})
                
                return Response({"error":"No data posted"})
        if request.data['action']=="userEmailVarification":
            try:
                return Response({'OTP': verifyAccount_djmail.Varify_user(request.data['email'],request.data['VarificationCode'])})
            except Exception as OTPerror:
                print(f"Form error : {OTPerror}\n")
                return Response({'OTP': False,"Error":OTPerror}) 


# check authenticated user and send response
@permission_classes([IsAuthenticated]) #this will check that Token is provided or not 
class Authenticateuser(APIView):
    authentication_classes = [JWTAuthentication] #authenticat the token 
    def get(self,request):
        Student_objs = Student.objects.all()
        serializer = Student_Serializer(Student_objs,many=True)
        return Response({"payload":serializer.data},status=200)

    def post(self,request):
        data = request.data
        serializer = Student_Serializer(data=request.data)

        if not serializer.is_valid():
            print("Invalid data")
            return Response({"status":404,"message":"Invalid data","error":serializer.errors})
    
        serializer.save()
        print("testing in api_view")
        return Response({"status":"created!! at JWT"})
    
    def patch(self,request):
        try:
            student_obj = Student.objects.get(id= request.data['id'])
            serializer = Student_Serializer(student_obj,data=request.data,partial=True)
            if not serializer.is_valid():
                print(serializer.errors)
                return Response({"status":403,"error":serializer.errors})

            serializer.save()
            return Response({"status":200,"payload":serializer.data})
    
        except Exception as e:
            return Response({"status":403,"message":"invalid id"})

# create new token and login

class LoginAuth_token(APIView):
    def post(self,request):
        username = request.data['username']
        password = request.data['password']
       # Get the username and password from the request
    

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Authentication successful
            login(request, user)
            r = User.objects.get(username = username)
            refresh = RefreshToken.for_user(r)

            

            return Response({"error":False,'message': 'Login successful','username':username,'token':str(refresh.access_token)})
        
        else:
            # Authentication failed
            return Response({"error":True, 'message': 'Invalid username or password'})
            
class RecoverUser_Account(APIView):
    def post(self,request):
        if request.data['action']=="Email Varify":
            email = request.data['email']
            try:
                user = Student.objects.get(email=email)
                serializer = Student_Serializer(user)
                
                #generat the OTP and send email 
                OTP={"_tempOTP":verifyAccount_djmail.otp_varification_email([email],serializer.data['username'])}
                # saving otp 
                serializer = Student_Serializer(user,data=OTP,partial=True)
                if not serializer.is_valid():
                    print(serializer.errors)
                    return Response({"status":403,"error":serializer.errors})
                serializer.save()



                return Response({'isValid':True,'email':email})
            except Student.DoesNotExist:
            
                return Response({'isValid': False,'email':email})
        if request.data['action']=="OTP Varify":
            try:
                return Response({'OTP': verifyAccount_djmail.Varify_user(request.data['email'],request.data['OTP'])})
            except Exception as OTPerror:
                print(f"Form error : {OTPerror}\n")
                return Response({'OTP': False,"Error":OTPerror}) 
        if request.data['action']=="Reset Newpswd":
            email = request.data['email']
            try:
                _user = Student.objects.get(email=email)
                user_serializer = Student_Serializer(_user)
                _username=user_serializer.data['username']

                user = User.objects.get(username=_username)
                new_password = request.data['Newpswd']
                user.set_password(new_password)
                user.save()
                return Response({"status":200,"Msg":"Password Updated successfully !"})
            
            except Exception as ResetPwsdError:

                return Response({"status":403,"error":ResetPwsdError})

# -----------------------------------------------------------------------------------------------------------
# Admin panels

# Create your views here.
def admin(request):
      
      return render(request,"Admin_controls/admin-index.html",)

# API VIEWS TO HANDLE REQUESTS

class Practcode_Courses(APIView):
    def post(self,request):
            if request.data['mode']=='addCourse':
                try:
                    # saving Course data
                   
                    my_model_instance = Course_overview(category=request.data['overview'][1],
                                                        title=request.data['overview'][0],
                                                        level=request.data['overview'][2],
                                                        duration=request.data['overview'][3],
                                                        price=request.data['overview'][4],
                                                        numberOfSections=request.data['overview'][6],
                                                        sectionData=request.data['section_data'])
                    my_model_instance.save()

                    return Response({"status":"Done",'error':False})
                except Exception as AddcourseError:
                        print(AddcourseError)
                        return Response({"status":AddcourseError,"error":True})

class Admin_access(APIView):
  
    def get(self,request,mode):
        
        if mode=='view_courses':
                Course_overview_objs = Course_overview.objects.all()
                serializer = add_Course_overview(Course_overview_objs,many=True)
                return Response(serializer.data,status=200)
        return Response({"payload":"Invalid request"},status=404)

class send_course_content(APIView):
    def post(self,request):
        # load all the topics from the json file
        with open('codeGpt_students/c-course-sample-data.json','r') as quizes:
            file_contents = json.loads(quizes.read())
        data=file_contents[request.data['heading']][request.data['key']]
        if type(data) ==str:
         
            jsondata = {
            "heading":{
                "value": "",
                "children": [
      	                { 
                        "subHeading" : {
                        "value": "",
                        "children": [
                            {
                            "paragraph": {
                                "value": data
                                }
                            }
                        ]}
                    }]
            }
        }
            
        else:
            if 'Quiz' in str(request.data['key']):
                data.pop('ans')
                return Response(["quize",{request.data['key']:data}],status=200)
            elif 'Question' in str(request.data['key']):
                data.pop('answer')
                return Response(["question",{request.data['key']:data}],status=200) 
            else:
                jsondata = {
                    "heading":{
                        "value": "",
                        "children": [
                                ]
                    }
                }
            
                for i in data:
                
                    d={
                        "subHeading" : {
                                "value": i,
                                "children": [
                                    {
                                    "paragraph": {
                                        "value": data[i]
                                        }
                                    }
                                ]}
                    }
                    jsondata['heading']['children'].append(d)
            
       

        return Response([jsondata],status=200)

class course_question_testCase(APIView):
    def post(self,request):
        try:
            # load all the topics from the json file
            with open('codeGpt_students/c-course-sample-data.json','r') as quizes:
                file_contents = json.loads(quizes.read())
            Testcases=file_contents[request.data['heading']][request.data['key']]


            status=test_case_process.C_testcase.test(testcases=Testcases['public'],code=request.data['code'],expected_ans=Testcases['answer']['public'])
           
        except Exception as Err:
            status="Syntax Error !"
            
        
        return Response({"status":status})