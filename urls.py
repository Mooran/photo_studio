#-*-coding=utf-8-*-
import os
from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
import photo_studio.views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^(?P<access_key>.*)$', 'photo_studio.views.index', name='index'),
    # url(r'^index$', 'photo_studio.views.index', name='index'),
    url(r'^photo/upload$', 'photo_studio.views.upload', name='photo.upload'),
    url(r'^photo/pick$', 'photo_studio.views.pick_photo', name='photo.pick'),
    # url(r'^photo_studio/', include('photo_studio.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    (r'^photo/(?P<path>.*)$', 'django.views.static.serve',{'document_root': '%sphoto/' % settings.MEDIA_ROOT}),
)
    