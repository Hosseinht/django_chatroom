from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

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
    description = models.CharField(max_length=300, null=True)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_owner")
    description = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super(Room, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
