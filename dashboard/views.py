from django.shortcuts import render
from rest_framework.views import APIView
from codeGpt_students.models import *
from rest_framework.response import Response
import json
# API ENDPOINTS


class addQuestions(APIView):
    def post(self,request,id):
          if request.data['mode']=='addQuestion':
               try:
                    print(id,request.data)
                   
                    my_model_instance = Question(language=request.data['overview'][0],
                         category=request.data['overview'][1],
                         level=request.data['overview'][2],
                         question=request.data['overview'][3],
                         testcases=request.data['overview'][4],
                         expected=request.data['overview'][5],
                         example=request.data['overview'][6],
                         exp_inputs=request.data['overview'][7],
                         exp_outputs=request.data['overview'][8],
                         constraint=request.data['overview'][9])
                    my_model_instance.save()

                    return Response({"status":"Done",'error':False})
               except Exception as AddcourseError:
                    print(AddcourseError)
                    return Response({"status":AddcourseError,"error":True})
              
          return Response({'data':request.data})
    
class quizes(APIView):
     def get(self,request,mode):
          if mode=='getquizes':
               with open('codeGpt_students/practcode-quiz-format.json','r') as quizes:
                    file_contents = json.loads(quizes.read())
               data = {}
               for quez in file_contents['quizes']:
                    data[quez]=[file_contents['quizes'][quez]['question'],file_contents['quizes'][quez]['options']]
               
               print(data)
               return Response({"quizes":data}  )
          
     def post(self,request,mode):
          if mode=='checktest':
               with open('codeGpt_students/practcode-quiz-format.json','r') as quizes:
                    file_contents = json.loads(quizes.read())
               percent = 0
               for quez in file_contents['quizes']:
                    if request.data[quez] == file_contents['quizes'][quez]['answer']:
                         percent+=1
               print(request.data)
               percent = (percent/5)*100
               return Response({"percent":percent}  )