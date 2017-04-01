# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from .models import Insta_tag

import requests
import ast
import json
import re
import random
import time
import datetime
import atexit
import signal
import itertools
import sys
import time
import subprocess
import os
import threading

from local_conf import *
from selenium_bot import selenium_webdriver
from instabot import Bot
from logger import Logger


def start_thread(function):
    def wrapper(*args, **kwargs):
        
        # Create new threads
        thread = threading.Thread(target = function, args=args)
        thread.daemon = True  

        # Start new Threads
        thread.start()
    return wrapper

def get_base_dir():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

########################################################################################### INSTA_API ###########################################################################

@csrf_exempt    
def insta_api(request, target):
    logger = Logger('view')
    logger.log("VIEWS:insta_api: " + target)

    time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
    logger.log('VIEW:add_task: start ' + str(time_now))
    
    task_list_file    = open('%s/tasks' % os.path.join(get_base_dir(), 'studioapp', 'data') , 'r')
    task_list_lines = task_list_file.readlines()
    
    if task_list_lines:
        task_list_content = task_list_lines[0]
    else:
        task_list_content = '{lalala}'

    task_list_json    = json.loads(task_list_content)
    task_list_file.close() 


##################### GET ##################################
    
    # GET / get_list
    if request.method == 'GET' and target == 'get_tasks':
        return HttpResponse(task_list_content,
                            content_type="application/json")


#################### POST ##################################
    elif request.method == 'POST':
        request_json = json.loads(request.body)

        # POST / add_task
        if target == 'add_task':
            
            time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
            task_id  = abs(hash(time_now))
            
            # directions: following, followers, follow, unfollow
            direction    = request_json['direction']

            if direction in ['following', 'followers']:
                username     = request_json['username']
                
                if 'count' in request_json:
                    count = request_json['count']
                else:
                    count = 50

                    task_list_json[task_id] = {'username'    : username,
                                               'direction'   : direction, 
                                               'count'       : count,  
                                               'create_time' : time_now}
    
                get_follow_info(username, direction, task_id)

            elif direction in ['follow', 'unfollow']:
                user_names = request_json['user_names']

                task_list_json[task_id] = {'direction'   : direction,
                                           'user_names'  : user_names,
                                           'create_time' : time_now}
                
                change_relationships(user_names, direction, task_id)        
            

        # POST / del_task    
        elif target == 'del_task':
            id_to_del    = request_json['id']
            
            if id_to_del in task_list_json:
                task_list_json.pop(id_to_del)
    

        task_list_content = json.dumps(task_list_json)
        task_list_file = open('%s/tasks' % path , 'w')
        task_list_file.write(task_list_content)
        task_list_file.close()

        return HttpResponse(task_list_content,
                            content_type="application/json")    


@start_thread
def get_follow_info(username, direction, task_id = ''):
    
    logger = Logger('view')
    time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
    
    logger.log('VIEW:follow_info: POST ' + str(time_now) + str(task_id))
    
    result_file_name = '%s/%s' % (os.path.join(get_base_dir(), 'studioapp', 'results'), task_id)

    logger.log('VIEW:follow_info: Create result file %s' % result_file_name)

    result_file = open(result_file_name , 'w')
    result_file.write('[]')
    result_file.close()

    selenium_bot = selenium_webdriver()
    selenium_bot.login_user('studio7day', 'Nopasaran')
    
    user_names = selenium_bot.get_follow_names(username, direction,  15)

    bot = Bot()
    response = []

    for name in user_names[3:]:
        info = bot.get_info(name)
        response.append(info)
    
    selenium_bot.driver.close()
    
    result_file = open(result_file_name , 'w')
    result_file.write(str(response))
    result_file.close()
    
    logger.log('VIEW:selenium_bot: FINISH')

@start_thread
def change_relationships(user_names, direction, task_id):
    
    logger = Logger('view')
    time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
    
    result_file_name = '%s/%s' % (os.path.join(get_base_dir(), 'studioapp', 'results'), task_id)

    logger.log('VIEW:follow_info: Create result file %s' % result_file_name)

    result_file = open(result_file_name , 'w')
    result_file.write('[]')
    result_file.close()


    selenium_bot = selenium_webdriver()
    selenium_bot.login_user('studio7day', 'Nopasaran')
        
    done_list = []
    
    for user_name in user_names:
        selenium_bot.change_relationships(user_name)
        done_list.append(user_name)
    
    selenium_bot.driver.close()
    
    result_file = open(result_file_name , 'w')
    result_file.write(str(done_list))
    result_file.close()
    
    logger.log('VIEW:selenium_bot: FINISH')

def follow_info(request):
    if request.method == 'GET':
        logger = Logger('view')

        time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        logger.log('VIEW:follow_info: GET ' + str(time_now))
        return render(request, 'studio/test_front.html', {})

def tasks(request):
    # Return empty tasks page.
    return render(request, 'studio/tasks.html', {})

def task(request, id):
    
    result = ''

    try:
        result_file = open('%s/%s' % (os.path.join(get_base_dir(), 'studioapp', 'results'), id))
        result = result_file.readlines()[0]
    except:
        result = '[]'
    
    return render(request, 'studio/task.html', {'result':result})


def logs(request):
    
    try:
        result_file = open('%s/LOG' % os.path.join(get_base_dir(), 'studioapp', 'logs'))
        log = result_file.readlines()
    except:
        log = []
    
    return render(request, 'studio/logs.html', {'log':log[-50:]})



  


        ################################################################################### FOLLOW_FORM ###########################################################################
"""
url(r'^follow_form/$')

GET: 
    return: studio/follow_form.html

POST:
    input: username, csrfmiddlewaretoken
    return: json
TODO:
    add Cookies   (save Cookies from selenium driver )
    add direction (following/followers) 


"""
def follow_form(request):
    if request.method == 'GET':
        if 'username' in request.GET:
            pass
        else:
            return render(request, 'studio/follow_form.html', {})

    elif request.method == 'POST':
        username = request.POST['username']
        direction = request.POST['direction']
        selenium_bot = selenium_webdriver()
        time.sleep(3)
        selenium_bot.login_user('studio7day', 'Nopasaran')
        time.sleep(3)
        user_names = selenium_bot.get_follow_names(username, direction,  5)
        
        bot = Bot()
        
        
        response = []
        for name in user_names[3:4]:
            info = bot.get_info(name)
            response.append(info)
        
        selenium_bot.driver.close()

        return HttpResponse(
                                json.dumps(response),
                                content_type="application/json"
                            )

        ################################################################################### END FOLLOW_FORM ###########################################################################

          

def bot(request):
    bot = Bot()

    if request.method == 'GET':
        class FollowForm(forms.Form):
            follow_list = forms.CharField(label      = 'List of users',
                                          widget = forms.Textarea
                                          )
        follow_form = FollowForm()
        return render(request, 'studio/bot.html', {'follow_form': follow_form}) 
    else:
        if 'follow_list' in request.POST:
            follow_users_ids = []
            follow_ids_file = open('%sfollow_ids' % path)
            follow_ids_content = follow_ids_file.readlines()
            for line in follow_ids_content:
                if len(line) > 1 and line.strip() not in follow_users_ids:
                    follow_users_ids.append(line.strip())
                    bot.logger('open follow_ids: ' +  str(follow_users_ids))
            follow_ids_file.close()

            follow_ids_file = open('%sfollow_ids' % path, 'a')

            follow_list = request.POST['follow_list'].replace(',', '\r\n').replace(' ', '\r\n').split('\r\n')
            follow_users_info = [];
            unfollow_users_info = [];
            
            for user in follow_list:
                user_info = bot.get_info(user)
                if user_info:
                    follow_users_info.append(user_info)
                    user_id = user_info['user']['id']
                    if user_id not in follow_users_ids:
                        follow_users_ids.append(user_id)
                        bot.logger(follow_users_ids)
                        follow_ids_file.write(user_info['user']['id'] + '\n')


            return render(request, 'studio/bot.html', {'follow_users_info'   : follow_users_info}) 
        else:
            follow_list = []
            for arg in request.POST:
                if 'follow_name' in arg:
                    follow_list.append(request.POST[arg])
            
            test = str(request.POST)
            follow_users_info = [];
            unfollow_users_info = [];

            for user in follow_list:
                user_info = bot.get_info(user)
                if user_info:
                    follow_users_info.append(user_info)
                
            return render(request, 'studio/bot.html', {'test' : test,
                                                       'follow_users_info'   : follow_users_info}) 
        
def bot_upload(request):

    class FollowForm(forms.Form):
        follow_list = forms.CharField(label      = 'List of users',
                                      widget = forms.Textarea
                                      )
    follow_form = FollowForm()

    if request.method == 'GET':
        return render(request, 'studio/bot_upload.html', {'follow_form': follow_form,})
    
    elif request.method == 'POST':

        follow_list = request.POST['follow_list'].replace(',', '\r\n').replace(' ', '\r\n').split('\r\n')
        #lst_file = open('%s' % path, 'a')
        
        #for name in unfollow_list:
        #    if len(name) > 1:
        #        lst_file.write('\n' + name)
                      
        return render(request, 'studio/bot_upload.html', {'follow_form'       : follow_form,
                                                          'follow_list': str(follow_list)
                                                          })       
    


    
############################################################ INSTA API (official) ############################################################
def check_login(fu):
    def wraper(request, *args, **kwargs):
        CLIENT_ID                  = "18578012dd9841f3862ae0eac13c92d9"
        CLIENT_SECRET              = '8e741d1daa9b403a8f46f6dce639f93b'
        AUTHORIZATION_REDIRECT_URI = "http://192.168.0.103/insta"
        
        #AUTHORIZATION_REDIRECT_URI = "http://studio7day.com/insta"
        #CLIENT_ID                  = "d27e8d04639047b79ce70852e07204d7"
        #CLIENT_SECRET              = 'bd3bab8a3a674ac4b9fde9bc1e4222da'
        
        if not 'code' in request.session.keys():
            code = request.GET.get('code', '')
            
            if not code:
                # https://api.instagram.com/oauth/authorize/?client_id=18578012dd9841f3862ae0eac13c92d9&redirect_uri=http://192.168.0.103/insta&response_type=code&scope=public_content+comments+likes+follower_list
                authorize_url = 'https://api.instagram.com/oauth/authorize/?client_id={0}&redirect_uri={1}&response_type=code&scope=public_content+comments+likes+follower_list'.format(CLIENT_ID, AUTHORIZATION_REDIRECT_URI )
                return redirect(authorize_url)
            request.session['code'] = code


        if not 'token' in request.session.keys():
            code = request.session['code']
            answer_json = ast.literal_eval(requests.post("https://api.instagram.com/oauth/access_token", {'client_id'     : CLIENT_ID,
                                                                                                          'client_secret' : CLIENT_SECRET,
                                                                                                          'grant_type'    : 'authorization_code',
                                                                                                          'redirect_uri'  : AUTHORIZATION_REDIRECT_URI,
                                                                                                          'code'          :code
                                                                                                         }).text)

            
            request.session['token']    = answer_json['access_token']
            request.session['logo_url'] = answer_json['user']['profile_picture']
            request.session['username'] = answer_json['user']['username']
        
        return fu(request, *args, **kwargs)
    return wraper

def find_users_by_name(name, token):
    users_founded = json.loads(requests.get('https://api.instagram.com/v1/users/search?q={0}&access_token={1}'.format(name, token)).text)
    return users_founded

def find_media_by_user(user_id, token):
    media_founded = json.loads(requests.get('https://api.instagram.com/v1/users/{0}/media/recent/?access_token={1}'.format(user_id, token)).text)
    return media_founded

def find_media_by_tag(tag_name, token):
    media_founded = json.loads(requests.get('https://api.instagram.com/v1/tags/{0}/media/recent?access_token={1}'.format(tag_name, token)).text)
    return media_founded

def like_photo(photo, token):
    result = json.loads( requests.post("https://api.instagram.com/v1/media/{}/likes".format(photo), {'access_token' : token}).text)

def comment_photo(media_id, token, comment_text):
    result = json.loads( requests.post("https://api.instagram.com/v1/media/{}/comments".format(media_id), {'access_token' : token,
                                                                                                           'text'         : comment_text}).text)

@check_login    
def insta(request):
    my_images_json = json.loads(requests.get('https://api.instagram.com/v1/users/self/media/recent/?access_token={0}'.format(request.session['token'])).text)
    return render(request, 'studio/insta.html', {'logo_url'      : request.session['logo_url'],
                                                 'username'      : request.session['username'],
                                                 'my_images_json': my_images_json,
                                                })
@check_login
def insta_tags(request):
    
    class SearchTagForm(forms.Form):
        search_tag = forms.CharField(label      = 'Search tags',
                                     max_length = 100
                                    )
    search_form = SearchTagForm()

    if request.method == 'GET':
        return render(request, 'studio/insta_tags.html', {'token'      : request.session['token'],
                                                          'search_form': search_form,})
    elif request.method == 'POST':

        search_request     = request.POST['search_tag']
        search_request     = search_request.replace(',', ' ')
        search_tag_list    = search_request.split(' ')
        req_count          = len(search_tag_list)
        best_list          = []
        tags_to_copy       = ''
        tags_count_to_copy = 0

        for tag_requested in search_tag_list:
            tag_requested    = tag_requested.strip().strip('#')
            tags_founded     = json.loads(requests.get('https://api.instagram.com/v1/tags/search?q={0}&access_token={1}'.format(tag_requested, request.session['token'])).text)
            logger(tags_founded)
            tags_list_sorted = []
        
            for tag in tags_founded['data']:

                new_tag = Insta_tag(tag_title        = tag['name'],
                                    tag_images_count = tag['media_count'],
                                    tag_id           = tag_requested
                                   )
                new_tag.save()

            for item in Insta_tag.objects.filter(tag_id = tag_requested).order_by('tag_images_count').reverse()[0:30/req_count]:
                item.tag_id  = item.tag_id + ' (added)'
                tags_to_copy =  tags_to_copy + '#' + item.tag_title + ' '
                item.save()
                tags_count_to_copy +=1
       

        tags_list_sorted = Insta_tag.objects.all().order_by('tag_images_count').reverse()

        for t in tags_list_sorted:
            t.delete()
      
        return render(request, 'studio/insta_tags.html', {'tags_founded'      : tags_list_sorted,                                                      
                                                          'token'             : request.session['token'],
                                                          'tags_list'         : tags_list_sorted,
                                                          'search_form'       : search_form,
                                                          'tags_to_copy'      : tags_to_copy,
                                                          'tags_count_to_copy': tags_count_to_copy
                                                          })    

@check_login        
def insta_users(request):
    class SearchUserForm(forms.Form):
        search_user = forms.CharField(label='Search users', max_length=100)
    search_form = SearchUserForm()

    if request.method == 'GET':
        return render(request, 'studio/insta_users.html', {'token'       : request.session['token'],
                                                           'search_form' : search_form
                                                          })

    elif request.method == 'POST':
        
        search_request =  request.POST['search_user']
        search_request = search_request.strip()

        users_founded = find_users_by_name(search_request, request.session['token'])['data']

        return render(request, 'studio/insta_users.html', {'users_founded': users_founded,                                                      
                                                           'token'        : request.session['token'],
                                                           'search_form'  : search_form,
                                                          })    
    

@check_login
def insta_like_photos(request):
    
    class LikePhotosForm(forms.Form):
        search_tag  = forms.CharField(label      = 'Search photos by tag',
                                     max_length = 100
                                    )
        search_user = forms.CharField(label      = 'Search photos by user',
                                      max_length = 100
                                     )
    search_form = LikePhotosForm()

    token = request.session['token']
    
    if request.method == 'GET':
        return render(request, 'studio/insta_like_photos.html', {'search_form': search_form})
    
    else:
        if request.POST['search_tag']:
            tag_name    = request.POST['search_tag']
            photos_json = find_media_by_tag(tag_name, token)
        elif request.POST['search_user']:
            user_name    = request.POST['search_user']
            user         = find_users_by_name(user_name, token)['data'][0]['id']
            photos_json  = find_media_by_user(user, token)
            
        for media in photos_json['data'][0:13]:
            result = like_photo(media['id'], token)
        
        return render(request, 'studio/insta_like_photos.html', {'search_form': search_form,
                                                                 'photos_json': photos_json,
                                                                 'result'     : result})


@check_login
def insta_comment_photos(request):
    
    class CommentPhotosForm(forms.Form):
        search_tag  = forms.CharField(label='Search photos by tag', max_length=100)
        search_user = forms.CharField(label='Search photos by user', max_length=100)
    search_form = CommentPhotosForm()

    token = request.session['token']
    
    if request.method == 'GET':
        return render(request, 'studio/insta_comment_photos.html', {'search_form': search_form})
    
    else:
        if request.POST['search_tag']:
            tag_name    = request.POST['search_tag']
            photos_json = find_media_by_tag(tag_name, token)
        elif request.POST['search_user']:
            user_name    = request.POST['search_user']
            user         = find_users_by_name(user_name, token)['data'][0]['id']
            photos_json  = find_media_by_user(user, token)

        comments_list = ['cool', 'great', 'Hello my name is @studio7day', 'awesome', 'nice', 'I like it!']            
        i = 0
        for media in photos_json['data'][0:6]:
            res = requests.post("https://api.instagram.com/v1/media/{}/comments".format(media['id']), {'access_token' : token,
                                                                                                       'text'         : comments_list[i]}).text
            result = json.loads(res)
            i += 1
        
        return render(request, 'studio/insta_comment_photos.html', {'search_form': search_form,
                                                                    'photos_json': photos_json,
                                                                    'result'     : res})


@check_login
def insta_locations(request):
    return render(request, 'studio/insta_tags.html', {})


