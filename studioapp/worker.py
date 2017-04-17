import json
import time
import subprocess
import os
import threading

from local_conf import *
from selenium_bot import selenium_webdriver
from instabot import Bot
from logger import Logger


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def start_thread(function):
    def wrapper(*args, **kwargs):
    
        # Create new threads
        thread = threading.Thread(target = function, args=args)
        thread.daemon = True  

        # Start new Threads
        thread.start()
    return wrapper

class Worker(object):
    def __init__(self):
        logger = Logger('worker')
        logger.log("WORKER: CREATED")

    @start_thread
    def get_follow_info(self, username, direction, count,  task_id = ''):
        
        my_username = 'studio_7_day_2'
        my_password = 'Nopasaran'
        
        logger = Logger('worker')
        time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        
        logger.log('WORKER:follow_info: POST ' + str(time_now) + str(task_id))
        
        task_result = {'info':{}, 'result':[]}

        task_result['info'] = {'user_name': username,
                               'direction': direction,
                               'count'    : count,
                               'task_id'  : task_id}

        result_file_name = '%s/%s' % (os.path.join(BASE_DIR, 'studioapp', 'results'), task_id)
        

        logger.log('WORKER:follow_info: Create result file %s' % result_file_name)

        result_file = open(result_file_name , 'w')
        result_file.write(json.dumps(task_result))
        result_file.close()

        selenium_bot = selenium_webdriver()
        selenium_bot.login_user(my_username, my_password)

        user_names = selenium_bot.get_follow_names(username, direction,  15)
        selenium_bot.driver.close()

        bot = Bot()
        bot.login_user(my_username, my_password)
        for name in user_names[3:]:
            full_info = bot.get_info(name)

            info={'user':{}}

            attrs = ['id',
                     'username',
                     'full_name',
                     'profile_pic_url_hd',
                     'biography',
                     'external_url',
                     'follows_viewer',
                     'followed_by_viewer',
                     'has_requested_viewer',
                     'requested_by_viewer',
                     'has_blocked_viewer',
                     'blocked_by_viewer',
                     'is_private',]

            for attr in attrs:
                info['user'][attr] = full_info[u'user'][attr]

            info['user']['media'] = {}
            info['user']['followed_by'] ={}
            info['user']['follows'] = {}

            info['user']['media']['count'] = full_info['user']['media']['count']
            info['user']['followed_by']['count'] = full_info['user']['followed_by']['count']
            info['user']['follows']['count'] = full_info['user']['follows']['count']
            

            task_result['result'].append(info)
        
            
        result_file = open(result_file_name , 'w')
        result_file.write(json.dumps(task_result))
        result_file.close()
        
        logger.log('VIEW:selenium_bot: FINISH')


    @start_thread
    def change_relationships(self, user_names, direction, task_id):
    
        logger = Logger('worker')
        time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        
        result_file_name = '%s/%s' % (os.path.join(BASE_DIR, 'studioapp', 'results'), task_id)

        logger.log('WORKER:change_relationships: Create result file %s' % result_file_name)

        task_result = {'info':{}, 'result':[]}

        task_result['info'] = {'user_names': user_names,
                               'direction': direction,
                               'count'    : len(user_names),
                               'task_id'  : task_id}


        result_file = open(result_file_name , 'w')
        result_file.write(json.dumps(task_result))
        result_file.close()


        selenium_bot = selenium_webdriver()
        selenium_bot.login_user('studio_7_day_2', 'Nopasaran')
        logger.log('WORKER:change_relationships: TRY to follow %s' % str(user_names))

        for user_name in user_names:
            logger.log('WORKER:change_relationships: TRY to follow %s' % str(user_name))            
            selenium_bot.change_relationships(user_name)
            task_result['result'].append(user_name)
        
        selenium_bot.driver.close()
        
        result_file = open(result_file_name , 'w')
        result_file.write(json.dumps(task_result))
        result_file.close()
        
        logger.log('WORKER:change_relationships: FINISH')