from rest_framework import serializers
from .models import Genre, Movie, Profile


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'numberInStock',
                  'dailyRentalRate', 'genre', 'liked']
        depth = 1


class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user_id', 'phone', 'birth_date']
        depth = 1
