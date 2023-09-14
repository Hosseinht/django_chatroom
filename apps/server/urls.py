from django.urls import path

from . import views

urlpatterns = [
    path("select/", views.ServerListAPIView.as_view()),
    path("category/", views.CategoryListView.as_view()),
    path("select/<int:pk>/", views.ServerDetailAPIView.as_view()),
]
