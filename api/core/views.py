
from django.core.mail import send_mail
from django.http import HttpResponse
import os

EMAIL_HOST_NAME = os.getenv("EMAIL_HOST_NAME")
TO_EMAIL_ADDRESS = os.getenv("TO_EMAIL_ADDRESS")

def hello(request):
    send_mail(
        subject='Hello from SparkPost',
        message='Woo hoo! Sent from Django!',
        from_email= f"test@{EMAIL_HOST_NAME}",
        
        recipient_list=[f"{TO_EMAIL_ADDRESS}"],
        html_message='<p>Hello Rock stars!</p>',
    )
    return HttpResponse("Hello, Django!")