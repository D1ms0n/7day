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


def get_base_dir():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

########################################################################################### INSTA_API ###########################################################################

@csrf_exempt    
def insta_api(request, target, request_id = '',  **kwargs):
    logger = Logger('view')
    time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')

    logger.log('VIEW:insta_api: start at %s %s/%s' % (str(time_now), target, request_id))

    try:
        task_list_file    = open('%s/tasks' % os.path.join(get_base_dir(), 'studioapp', 'data') , 'r')
        task_list_lines = task_list_file.readlines()
    except:
        task_list_lines = []
    
    if task_list_lines:
        task_list_content = task_list_lines[0]
        task_list_json    = json.loads(task_list_content)
        task_list_file.close() 

    else:
        task_list_json = {}


    ##################### GET ##################################
    
    # GET / get_list
    if request.method == 'GET': 
        
        if target == 'get_tasks':
            task_list = []
            for task_id in task_list_json:
                new_task = {'task_id': task_id}
                for item in task_list_json[task_id]:
                    new_task[item] = task_list_json[task_id][item]
                task_list.append(new_task)
            return HttpResponse(json.dumps(task_list),
                                content_type="application/json")

        elif target == 'get_task_result':
            result = 'Not ready'
            try:
                result_file = open('%s/%s' % (os.path.join(get_base_dir(), 'studioapp', 'results'), request_id))
                result = result_file.readlines()[0]
            except:
                result = 'Bad request_id'
            return HttpResponse(result,
                                content_type="application/json")


    #################### POST ##################################
    elif request.method == 'POST':
        request_json = json.loads(request.body)
        worker = Worker()

        # POST / add_task
        if target == 'add_task':
            time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
            task_id  = abs(hash(time_now))
            task_list_json[task_id] = request_json
            task_list_json[task_id]['create_time'] = time_now
            direction    = request_json['direction']

            if direction in ['following', 'followers']:
                username     = request_json['username']
                if 'count' in request_json:
                    count = request_json['count']
                else:
                    count = 50
                worker.get_follow_info(username, direction, count, task_id)

            elif direction in ['follow', 'unfollow']:
                user_names = request_json['user_names']
                worker.change_relationships(user_names, direction, task_id)        
            

        # POST / del_task    
        elif target == 'del_task':
            id_to_del    = request_json['id']
            if id_to_del in task_list_json:
                task_list_json.pop(id_to_del)


        task_list_file = open( '%s/tasks' % os.path.join(get_base_dir(), 'studioapp', 'data') , 'w')
        task_list_file.write(json.dumps(task_list_json))
        task_list_file.close()

        return HttpResponse(json.dumps(task_list_json),
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
    
    return render(request, 'studio/logs.html', {'log':log[-50:]})