from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from vidly.permissions import DeleteAdminOrIsAuthenticatedOrReadOnly
from .models import Genre, Movie, Profile
from .serializers import GenreSerializer, MovieSerializer, ProfileSerializer


class GenreViewSet(ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [DeleteAdminOrIsAuthenticatedOrReadOnly]


class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.select_related('genre').all()
    permission_classes = [DeleteAdminOrIsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            MovieSerializer.Meta.depth = 0
        else:
            MovieSerializer.Meta.depth = 1
        return MovieSerializer


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[IsAuthenticated])
    def me(self, request):
        profile = Profile.objects.get(user_id=request.user.id)
        if request.method == 'GET':
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
