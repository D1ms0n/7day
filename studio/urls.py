
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
    url(r'^$',                      app_views.follow_info,                 name='home'),
    url(r'^admin/',                 admin.site.urls                                    ),
    
    url(r'^insta_api/(?P<target>[a-z_]+)(?:/(?P<request_id>\d+))?$',          app_views.insta_api,            name='insta_api'),
    url(r'^follow_info/$',         app_views.follow_info,          name='follow_info'),
#    url(r'^tasks/$',               app_views.tasks,                name='tasks'),
#    url(r'^task/(?P<id>.+)$',      app_views.task,                 name='task'),
    url(r'^logs/$',                app_views.logs,                 name='logs'),

    # REST API
    url(r'^api/users/$',                     app_views.InstaUserList.as_view(),      name='users'),
    url(r'^api/users/(?P<user_id>[0-9]+)/$', app_views.InstaUserDetail.as_view(),    name='user'),

    url(r'^api/tasks/$',                     app_views.InstaBotTaskList.as_view(),   name='tasks'),
    url(r'^api/tasks/(?P<task_id>[0-9]+)/$', app_views.InstaBotTaskDetail.as_view(), name='task'),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
