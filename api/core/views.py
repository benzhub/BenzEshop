# from django.shortcuts import render
# from django.core.mail import send_mail
# from django.http import HttpResponse
# from sparkpost import SparkPost
# import os

# def hello(request):
#     # send_mail('Using SparkPost with Django', 'This is a message from Django using SparkPost!', 'django-sparkpost@sparkpostbox.com',
#     # ['test@gmail.com'], fail_silently=False)
#     # print(os.getenv("EMAIL_HOST_PASSWORD"))
#     sparkpost = SparkPost(os.getenv("EMAIL_HOST_PASSWORD"))

#     response = sparkpost.transmissions.send(
#         recipients=['test@gmail.com'],
#         html='<p>Hello, SparkPost!</p>',
#         from_email='test1234@electechpro.com ',
#         subject='Test Email'
#     )

#     print(response)
#     return HttpResponse("Hello, Django!")

from django.core.mail import send_mail
from django.http import HttpResponse

def hello(request):
    send_mail(
        subject='Hello from SparkPost',
        message='Woo hoo! Sent from Django!',
        from_email='tets@electechpro.com',
        recipient_list=['test@gmail.com'],
        html_message='<p>Hello Rock stars!</p>',
    )
    return HttpResponse("Hello, Django!")