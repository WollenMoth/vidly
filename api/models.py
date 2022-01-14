from django.db import models
from django.utils import timezone


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
