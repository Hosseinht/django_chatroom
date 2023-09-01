from django.contrib import admin

from .models import Category, Room, Server

admin.site.register(Category)
admin.site.register(Room)
admin.site.register(Server)
