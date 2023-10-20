from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import add_Course_overview
from codeGpt_students import models

# Create your views here.
def admin(request):
      
      return render(request,"admin-index.html",)



# API VIEWS TO HANDLE REQUESTS
class Admin_access(APIView):
      def post(self,request):
            # saving Course data
            data = {'title':request.data['overview'][0],
                    'category':request.data['overview'][1],
                    'level':request.data['overview'][2],
                    'duration':request.data['overview'][3],
                    'price':request.data['overview'][4],
                    'description':request.data['overview'][5],
                    'numberOfSections':request.data['overview'][6],
                    'sectionData':request.data['section_data']
                  }
            
            print(data)
            overview = add_Course_overview(data =data)
            if not overview.is_valid():
                  print(overview.errors)
                  return Response({"payload":overview.errors,"error":True})
                
            overview.save()

            return Response({"status":"Done",'error':False})
      
      def get(self,request,mode):
           
            if mode=='view_courses':
                  Course_overview_objs = models.Course_overview.objects.all()
                  serializer = add_Course_overview(Course_overview_objs,many=True)
                  return Response(serializer.data,status=200)
            return Response({"payload":"Invalid request"},status=404)