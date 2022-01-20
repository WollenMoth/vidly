from django.contrib import admin
from django.conf import settings
from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    numberInStock = models.IntegerField()
    dailyRentalRate = models.FloatField()
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)


class Profile(models.Model):
    phone = models.CharField(max_length=10)
    birth_date = models.DateField(null=True, blank=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    @admin.display(ordering='user__first_name')
    def first_name(self):
        return self.user.first_name

    @admin.display(ordering='user__last_name')
    def last_name(self):
        return self.user.last_name

    @admin.display(ordering='user__username')
    def username(self):
        return self.user.username

    @admin.display(ordering='user__email')
    def email(self):
        return self.user.email

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
