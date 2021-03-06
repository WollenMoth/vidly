from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('genres', views.GenreViewSet)
router.register('movies', views.MovieViewSet)
router.register('profiles', views.ProfileViewSet)

# URLConf
urlpatterns = router.urls
