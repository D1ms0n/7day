# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt, csrf_protect

import json
import time
import os

from logger import Logger
from worker import Worker

from .models import Insta_user
from .models import Insta_bot_task
from .serializers import InstaUserSerializer
from .serializers import InstaBotTaskSerializer
from rest_framework import generics

login = 'studio_7_day_2'
password = 'Nopasaran'


def get_base_dir():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


worker = Worker(login, password)
logger = Logger('view')
time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')


class InstaUserList(generics.ListCreateAPIView):
    serializer_class = InstaUserSerializer
    renderer_classes = (JSONRenderer,)

    def get_queryset(self):
        queryset = worker.get_users_from_database(self.request.query_params)
        return queryset

class InstaUserDetail(generics.RetrieveAPIView):
    queryset = Insta_user.objects.all()
    renderer_classes = (JSONRenderer,)
    serializer_class = InstaUserSerializer
    lookup_field = 'user_id'

class InstaBotTaskList(generics.ListCreateAPIView):
    serializer_class = InstaBotTaskSerializer
    renderer_classes = (JSONRenderer,)

    def get_queryset(self):
        return worker.get_tasks()

class InstaBotTaskDetail(generics.RetrieveAPIView):
        queryset         = Insta_bot_task.objects.all()
        serializer_class = InstaBotTaskSerializer
        renderer_classes = (JSONRenderer,)
        lookup_field     = 'task_id'


########################################################################################### INSTA_API ###########################################################################

@csrf_exempt
def insta_api(request, target, request_id='', **kwargs):
    logger.log('VIEW:insta_api: start at %s %s/%s' % (str(time_now), target, request_id))

    ##################### GET ##################################

    # GET / get_list
    if request.method == 'GET':

        if target == 'get_tasks':
            task_list = worker.get_tasks()
            return HttpResponse(json.dumps(task_list),
                                content_type="application/json")

        elif target == 'get_task_result':
            result = worker.get_task_result(task_id=request_id)
            return HttpResponse(json.dumps(result),
                                content_type="application/json")

    #################### POST ################################## 
    elif request.method == 'POST':
        request_json = json.loads(request.body)

        # POST / add_task
        if target == 'add_task':
            time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
            task_id = abs(hash(time_now))
            direction = request_json['direction']

            if direction in ['following', 'followers']:
                username = request_json['username']
                if 'count' in request_json:
                    count = request_json['count']
                else:
                    count = 50

                worker.create_new_task(task_id=task_id, direction=direction, username=username, count=count,
                                       create_time=time_now)
                worker.get_follow_info(username, direction, count, task_id)  # TODO: queue for tasks

            elif direction in ['follow', 'unfollow']:
                user_names = request_json['user_names']
                worker.create_new_task(task_id=task_id, direction=direction, username='None', count='None',
                                       create_time=time_now)
                worker.change_relationships(user_names, direction, task_id)

            task_list = worker.get_tasks()
            return HttpResponse(json.dumps(task_list),
                                content_type="application/json")

def follow_info(request):
    return render(request, 'studio/test_front.html', {})


def tasks(request):
    return render(request, 'studio/tasks.html', {})


def task(request, id):
    return render(request, 'studio/task.html', {})


def logs(request):
    try:
        result_file = open('%s/LOG' % os.path.join(get_base_dir(), 'studioapp', 'logs'))
        log = result_file.readlines()
    except:
        log = []

    return render(request, 'studio/logs.html', {'log': log[-50:]})


def users_table(request):
    users = Insta_user.objects.all()
    return render(request, 'studio/Insta_users.html', {'users': users})
