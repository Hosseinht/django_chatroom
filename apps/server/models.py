from django.conf import settings
from django.db import models
from django.dispatch import receiver
from django.shortcuts import get_object_or_404

from .utils import (
    category_icon_upload_path,
    room_banner_upload_path,
    room_icon_upload_path,
)
from .validators import validate_icon_size, validate_image_file_type

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(
        upload_to=category_icon_upload_path,
        null=True,
        blank=True,
        validators=[validate_icon_size],
    )

    def save(self, *args, **kwargs):
        """
        Custom save method for updating and managing 'icon' files.
        """
        if self.id:
            current_category = get_object_or_404(Category, id=self.id)
            if current_category.icon != self.icon:
                current_category.icon.delete(save=False)
        super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Category")
    def category_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name


class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="server_owner"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="server_category"
    )
    description = models.CharField(max_length=300, null=True, blank=True)
    members = models.ManyToManyField(User)

    def __str__(self):
        return f"{self.id} - {self.name} "


class Room(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_owner")
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="room_server"
    )
    banner = models.ImageField(
        upload_to=room_banner_upload_path,
        null=True,
        blank=True,
        validators=[validate_image_file_type],
    )
    icon = models.ImageField(
        upload_to=room_icon_upload_path,
        null=True,
        blank=True,
        validators=[validate_icon_size, validate_image_file_type],
    )

    def save(self, *args, **kwargs):
        """
        Custom save method for updating and managing 'icon' files.
        """
        if self.id:
            current_room = get_object_or_404(Room, id=self.id)
            if current_room.icon != self.icon:
                current_room.icon.delete(save=False)
            if current_room.banner != self.banner:
                current_room.banner.delete(save=False)

        super(Room, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender="server.Room")
    def room_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == "icon" or field.name == "banner":
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)

    def __str__(self):
        return self.name
