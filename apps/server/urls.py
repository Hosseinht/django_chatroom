from django.urls import path

from . import views

urlpatterns = [
    path("select/", views.ServerListAPIView.as_view()),
]
