from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('', views.index, name='index'),
    path('news', views.get_news, name='get_news'),
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
]
