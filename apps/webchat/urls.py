from django.urls import path

from . import views

urlpatterns = [
    path("", views.MessageListAPIView.as_view()),
]
