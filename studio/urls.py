
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
from django.conf.urls import include,url
from django.contrib import admin
from .settings import MEDIA_ROOT
from django.conf import settings
from django.conf.urls.static import static

from studioapp import views as app_views

urlpatterns = [
    url(r'^admin/',   admin.site.urls),

    url(r'^$',        app_views.main, name='home'),
    url(r'^search/$', app_views.main, name='home'),
    url(r'^tasks/$',  app_views.main, name='home'),
    url(r'^home/$',   app_views.main, name='home'),

    url(r'^react_app/$',  app_views.react_app,  name='react_app'),
    url(r'^insta_shop/$', app_views.insta_shop, name='insta_shop'),
    url(r'^api_test/$',   app_views.api_test,   name='api_test'),
    url(r'^logs/$',       app_views.logs,       name='logs'),

    # REST API
    url(r'^api/users/$',                              app_views.InstaUserList.as_view(),      name='users'),
    url(r'^api/users/(?P<user_id>[0-9]+)/$',          app_views.InstaUserDetail.as_view(),    name='user'),

    url(r'^api/users/(?P<user_id>[0-9]+)/followers$', app_views.InstaUserFollowers.as_view(),    name='user_followers'),
    url(r'^api/users/(?P<user_id>[0-9]+)/following$', app_views.InstaUserFollowedBy.as_view(),    name='user_following'),

    url(r'^api/tasks/$',                              app_views.InstaBotTaskList.as_view(),   name='tasks'),
    url(r'^api/tasks/(?P<task_id>[0-9]+)/$',          app_views.InstaBotTaskDetail.as_view(), name='task'),
    url(r'^api/tasks/(?P<task_id>[0-9]+)/run$',       app_views.run_task ,                    name='run_task'),

    url(r'^api/medias/$',                              app_views.InstaMediaList.as_view(),   name='medias'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
