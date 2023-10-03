from django.urls import path

from . import views

urlpatterns = [
    path("", views.UserRetrieveView.as_view()),
    path("logout/", views.LogoutAPIView.as_view()),
]
