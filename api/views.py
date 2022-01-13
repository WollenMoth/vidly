import imp
from rest_framework.viewsets import ModelViewSet
from .models import Genre, Movie
from .serializers import GenreSerializer, MovieSerializer


class GenreViewSet(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
