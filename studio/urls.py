
'''studio URL Configuration

The  list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
'''
from django.conf.urls import patterns, include,url
from django.contrib import admin
from .settings import MEDIA_ROOT
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    url(r'^$',                     'studioapp.views.main',                 name='home'),
    url(r'^admin/',                 admin.site.urls                                    ),
    
    #url(r'^test_front/$',          'studioapp.views.test_front',            name='test_front'),
    url(r'^insta_api/(?P<target>.+)$',          'studioapp.views.insta_api',            name='insta_api'),
    url(r'^follow_info/$',         'studioapp.views.follow_info',          name='follow_info'),
    url(r'^tasks/$',               'studioapp.views.tasks',                name='tasks'),
    url(r'^task/(?P<id>.+)$',      'studioapp.views.task',                name='task'),

    url(r'^follow_form/$',         'studioapp.views.follow_form',          name='follow_form'),
    url(r'^bot/$',                 'studioapp.views.bot',                  name='bot'),
    url(r'^bot_upload/$',          'studioapp.views.bot_upload',           name='bot_upload'),
    url(r'^insta/$',               'studioapp.views.insta',                name='insta'),
    url(r'^insta/tags/$',          'studioapp.views.insta_tags',           name='insta_tags'),
    url(r'^insta/users/$',         'studioapp.views.insta_users',          name='insta_users'),
    url(r'^insta/locations/$',     'studioapp.views.insta_tags',           name='insta_locations'),
    url(r'^insta/likephotos/$',    'studioapp.views.insta_like_photos',    name='insta_like_photos'),
    url(r'^insta/commentphotos/$', 'studioapp.views.insta_comment_photos', name='insta_comment_photos'),
    #url(r'^insta/api/$',           'studioapp.views.insta_api',            name='insta_api'),
    #url(r'^media/(?P<path>)$', 'django.views.static.serve', {'document_root': MEDIA_ROOT}),
    #url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': MEDIA_ROOT}),
    #url(r'^.*/static/(?P<path>)$', 'django.views.static.serve', {'document_root': STATIC_ROOT}),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
