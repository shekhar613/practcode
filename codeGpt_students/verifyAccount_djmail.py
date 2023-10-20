from django.core.mail import send_mail
from django.conf import settings
import random
from .models import Student
from .serializers import Student_Serializer

def otp_varification_email(email,username):
    email_from = settings.EMAIL_HOST
    otp = random.randint(100000,999999)
    subject = "Account Recovery OTP - Please verify your identity"
    message = f""" Dear {username},

We have received a request to recover your account. To ensure the security of your account, please verify your identity by entering the One-Time Password (OTP) provided below:

OTP: {otp}

This OTP is valid for a limited time and can only be used once. Please do not share this OTP with anyone for your own account security.

If you did not request this account recovery, please disregard this message. Your account remains secure, and no further action is required.

Thank you for your cooperation.

Best regards,
Team Practcode
    """

    send_mail(subject,message,email_from,email)
    return otp

def userVarification_email(email):
    email_from = settings.EMAIL_HOST
    otp = random.randint(100000,999999)
    subject = "Account Recovery OTP - Please verify your identity"
    message =f"Varification code : {otp} "

    send_mail(subject,message,email_from,email)
    return otp

def Varify_user(email,code):
    user = Student.objects.get(email=email)
    serializer = Student_Serializer(user)
    if serializer.data['_tempOTP'] == code:
        serializer = Student_Serializer(user,data={"_isVarified":True},partial=True)
        if  serializer.is_valid():
            serializer.save()
        return True
    else:
        return False