from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()
router.register('genres', views.GenreViewSet)
router.register('movies', views.MovieViewSet)

# URLConf
urlpatterns = router.urls
