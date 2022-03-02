from django.contrib import admin
from django.urls import path, include

#views from different projects
from pages.views import HomePageView, AboutPageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("pages.urls")),
    #path("about/", AboutPageView.as_view(), name="about"),
    #path("", HomePageView.as_view(), name="home"),
]
