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
    url(r'^index/(?P<access_key>.*)$', 'photo_studio.views.index', name='index'),
    # url(r'^index$', 'photo_studio.views.index', name='index'),
    url(r'^photo/list$', 'photo_studio.views.photo_list', name='photo.list'),
    url(r'^product/list$', 'photo_studio.views.product_list', name='product.list'),
    url(r'^photo/upload$', 'photo_studio.views.upload', name='photo.upload'),
    url(r'^photo/pick$', 'photo_studio.views.pick_photo', name='photo.pick'),
    url(r'^order/push$', 'photo_studio.views.push_order', name='order.push'),
    url(r'^product/push$', 'photo_studio.views.push_product', name='product.push'),
    url(r'^order/get_customer_pick$', 'photo_studio.views.get_customer_pick', name='order.pick'),
    # url(r'^photo_studio/', include('photo_studio.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    (r'^photo/(?P<path>.*)$', 'django.views.static.serve',{'document_root': '%sphoto/' % settings.MEDIA_ROOT}),
)
    