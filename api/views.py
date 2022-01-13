import imp
from rest_framework.viewsets import ModelViewSet
from .models import Genre, Movie
from .serializers import GenreSerializer, MovieSerializer


class GenreViewSet(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.select_related('genre').all()

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            MovieSerializer.Meta.depth = 0
        else:
            MovieSerializer.Meta.depth = 1
        return MovieSerializer
