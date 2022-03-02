from django.urls import path, include, re_path

from .views import HomePageView, AboutPageView, return_to_view_collection, return_to_view_element, site_contacts_collection, site_contacts_element

urlpatterns = [
    #path("about/", AboutPageView, name="about"),
    #path("", homePageView, name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("", HomePageView.as_view(), name="home"),

     # api
    re_path(r'^api/v1/returntoview/$', return_to_view_collection),
    re_path(r'^api/v1/sitecontacts/$', site_contacts_collection),
    re_path(r'^api/v1/returntoview/(?P<pk>[a-zA-Z0-9-]+)$', return_to_view_element),
    re_path(r'^api/v1/sitecontacts/(?P<pk>[a-zA-Z0-9-]+)$', site_contacts_element)
]