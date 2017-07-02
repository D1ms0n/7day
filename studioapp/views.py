# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect

import json
import time
import sys
import os

from logger import Logger
from worker import Worker

login = 'studio_7_day_2'
password = 'Nopasaran'

def get_base_dir():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

########################################################################################### INSTA_API ###########################################################################

@csrf_exempt    
def insta_api(request, target, request_id = '',  **kwargs):
    worker = Worker(login, password)
    logger = Logger('view')
    time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
    logger.log('VIEW:insta_api: start at %s %s/%s' % (str(time_now), target, request_id))

    ##################### GET ##################################
    
    # GET / get_list
    if request.method == 'GET': 
        
        if target == 'get_tasks':
            task_list = worker.get_tasks()
            return HttpResponse(json.dumps(task_list),
                                content_type="application/json")

        elif target == 'get_task_result':
            result = worker.get_task_result(task_id = request_id)
            return HttpResponse(json.dumps(result),
                                content_type="application/json")

    #################### POST ################################## 
    elif request.method == 'POST':
        request_json = json.loads(request.body)

        # POST / add_task
        if target == 'add_task':
            time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
            task_id  = abs(hash(time_now))
            direction    = request_json['direction']

            if direction in ['following', 'followers']:
                username     = request_json['username']
                if 'count' in request_json:
                    count = request_json['count']
                else:
                    count = 50

                worker.create_new_task(task_id = task_id, direction = direction, username = username, count = count, create_time = time_now)
                worker.get_follow_info(username, direction, count, task_id)                                                                                   # TODO: queue for tasks

            elif direction in ['follow', 'unfollow']:
                user_names = request_json['user_names']
                worker.create_new_task(task_id = task_id, direction = direction, username = 'None', count = 'None', create_time = time_now)
                worker.change_relationships(user_names, direction, task_id)        

            task_list = worker.get_tasks()
            return HttpResponse(json.dumps(task_list),
                                content_type="application/json")

        # POST / del_task    
        #elif target == 'del_task':
        #    id_to_del    = request_json['id']
        #    if id_to_del in task_list_json:
        #        task_list_json.pop(id_to_del)

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
    
    return render(request, 'studio/logs.html', {'log':log[-50:]})