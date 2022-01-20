from django.contrib import admin
from . import models


@admin.register(models.Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(models.Movie)
class MovieAdmin(admin.ModelAdmin):
    exclude = ['date_created']
    list_display = ['title', 'numberInStock', 'dailyRentalRate']


@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
    autocomplete_fields = ['user']
    list_display = ['first_name', 'last_name', 'username', 'email']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__first_name', 'user__last_name']
    search_fields = ['first_name__istartswith', 'last_name__istartswith']
