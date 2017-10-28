import json
import time
import subprocess
import os
import threading

from local_conf import *
from selenium_bot import selenium_webdriver
from instabot import Bot
from logger import Logger

from .models import Insta_user
from .models import Insta_bot_task
from .models import Task_to_user_map
from .models import Relationship
from .models import Insta_image

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
    def __init__(self, login, password):
        logger = Logger('worker')
        self.login    = login
        self.password = password
        logger.log("WORKER: CREATED for %s" % login)

    def get_tasks(self):

        task_list_from_db = Insta_bot_task.objects.all()
        task_list = []
        for task in task_list_from_db:
            task_dict= task.__dict__
            task_dict['_state'] = ''
            task_list.append(task_dict)
        return task_list

    def get_task_result(self, task_id):
        task_to_user_maps = Task_to_user_map.objects.filter(task_id = task_id)
        users_from_task_list = []
        for task_to_user_map in task_to_user_maps:
            user_id= task_to_user_map.__dict__['user_id_id']
            user = Insta_user.objects.get(user_id = user_id)
            user_dict = user.__dict__
            user_dict['_state'] = ''
            users_from_task_list.append(user_dict)
        return users_from_task_list

    def create_new_task(self, task_id, direction, username, count, create_time):
        new_task = Insta_bot_task(task_id, direction, username, count, create_time)
        new_task.save()

    def run_task(self, task_id):
        pass                                                                                        # TO DO

    
    def filter_userrs(self, users, filter_by, filter_value):
        return users.filter()

    def get_users_from_database(self, filter_by = {}, order_by = None):                                                  # TO DO
        users_from_database_list = []
        
        users_from_database = Insta_user.objects.all()

        if 'followers_count__gte' in filter_by:
            users_from_database =  users_from_database.filter(followers_count__gte = filter_by['followers_count__gte'])

        if 'followers_count__lte' in filter_by:
            users_from_database =  users_from_database.filter(followers_count__lte = filter_by['followers_count__lte'])
                
        if 'follow_count__gte' in filter_by:
            users_from_database =  users_from_database.filter(follow_count__gte = filter_by['follow_count__gte'])

        if 'follow_count__lte' in filter_by:
            users_from_database =  users_from_database.filter(follow_count__lte = filter_by['follow_count__lte'])

        if 'follows_viewer' in filter_by:
            users_from_database =  users_from_database.filter(follows_viewer = filter_by['follows_viewer'])

        if 'followed_by_viewer' in filter_by:
            users_from_database =  users_from_database.filter(followed_by_viewer = filter_by['followed_by_viewer'])
                                                                                                                            # TO DO filter "follow_other_user"
        if order_by:
            users_from_database = users_from_database.order_by(order_by)

        users_from_database_list = []

        for user in users_from_database:
            user_dict= user.__dict__
            user_dict['_state'] = ''
            users_from_database_list.append(user_dict)

        return users_from_database_list


    #@start_thread
    def get_follow_info(self, username, direction, count,  task_id = ''):
        
        logger = Logger('worker')
        time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        
        logger.log('WORKER:get_follow_info: ' + str(time_now) + str(task_id))
        
        #task_result = {'info':{}, 'result':[]}
        #task_result['info'] = {'user_name': username,
        #                       'direction': direction,
        #                       'count'    : count,
        #                       'task_id'  : task_id}
        #result_file_name = '%s/%s' % (os.path.join(BASE_DIR, 'studioapp', 'results'), task_id)
        #logger.log('WORKER:get_follow_info: Create result file %s' % result_file_name)
        #result_file = open(result_file_name , 'w')
        #result_file.write(json.dumps(task_result))
        #result_file.close()

        selenium_bot = selenium_webdriver()
        selenium_bot.login_user(self.login, self.password)

        user_names = selenium_bot.get_follow_names(username, direction,  15)
        selenium_bot.driver.close()

        bot = Bot()
        bot.login_user(self.login, self.password)                                           #TO DO: SAVE COOKIES
        
        self_user_info = bot.get_info(username)
        self_user_id = self_user_info[u'user']['id']

        logger.log('WORKER:get_follow_info: Get task from database %s' % task_id)
        task = Insta_bot_task.objects.get(task_id = task_id)

        for name in user_names:
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

            #for attr in attrs:
            #    info['user'][attr] = full_info[u'user'][attr]

            #info['user']['media'] = {}
            #info['user']['followed_by'] ={}
            #info['user']['follows'] = {}

            #info['user']['media']['count'] = full_info['user']['media']['count']
            #info['user']['followed_by']['count'] = full_info['user']['followed_by']['count']
            #info['user']['follows']['count'] = full_info['user']['follows']['count']
            
            try:
                old_user = Insta_user.objects.get(user_id = full_info[u'user']['id'])
            except:
                old_user = None

            if not old_user:
                logger.log('WORKER:get_follow_info: Create new User %s ' % full_info[u'user']['id'])

                new_user = Insta_user(user_id              = full_info[u'user']['id'],
                                      user_name            = full_info[u'user']['username'],
                                      user_full_name       = full_info[u'user']['full_name'],
                                      followers_count      = int(full_info['user']['followed_by']['count']),
                                      follow_count         = int(full_info['user']['follows']['count']),
                                      profile_pic_url_hd   = full_info[u'user']['profile_pic_url_hd'],
                                      user_biography       = full_info[u'user']['biography'],
                                      user_external_url    = full_info[u'user']['external_url'],
                                      follows_viewer       = full_info[u'user']['follows_viewer'],
                                      followed_by_viewer   = full_info[u'user']['followed_by_viewer'],
                                      has_requested_viewer = full_info[u'user']['has_requested_viewer'],
                                      requested_by_viewer  = full_info[u'user']['requested_by_viewer'],
                                      has_blocked_viewer   = full_info[u'user']['has_blocked_viewer'],
                                      blocked_by_viewer    = full_info[u'user']['blocked_by_viewer'],
                                      is_private           = full_info[u'user']['is_private'])
                new_user.save()
            else:
                logger.log('WORKER:get_follow_info: Update old User %s ' % full_info[u'user']['id'])

                old_user.user_name  = full_info[u'user']['username'],
                old_user.user_full_name       = full_info[u'user']['full_name'],
                old_user.followers_count      = int(full_info['user']['followed_by']['count'])
                old_user.follow_count         = int(full_info['user']['follows']['count'])
                old_user.profile_pic_url_hd   = full_info[u'user']['profile_pic_url_hd']
                old_user.user_biography       = full_info[u'user']['biography']
                old_user.user_external_url    = full_info[u'user']['external_url']
                old_user.follows_viewer       = full_info[u'user']['follows_viewer']
                old_user.followed_by_viewer   = full_info[u'user']['followed_by_viewer']
                old_user.has_requested_viewer = full_info[u'user']['has_requested_viewer']
                old_user.requested_by_viewer  = full_info[u'user']['requested_by_viewer']
                old_user.has_blocked_viewer   = full_info[u'user']['has_blocked_viewer']
                old_user.blocked_by_viewer    = full_info[u'user']['blocked_by_viewer']
                old_user.is_private           = full_info[u'user']['is_private']

                old_user.save()
                new_user = old_user
            logger.log('WORKER:get_follow_info: Create new Relationship %s ' % full_info[u'user']['id'])                                        
            
            old_relationship = Relationship.objects.filter(followed_user_id = full_info[u'user']['id'],
                                                           user_id = self_user_id)
            
                
            if direction == 'following':
                if not old_relationship:
                    relationship = Relationship(followed_user_id = full_info[u'user']['id'],
                                                user_id = self_user_id)
                    relationship.save()
                else:
                    logger.log('WORKER:get_follow_info: We already know this following rel %s %d ' % (full_info[u'user']['id'], self_user_id))

            elif direction == 'followers':
                if not old_relationship:
                    relationship = Relationship(user_id = full_info[u'user']['id'],
                                                followed_user_id = self_user_id)
                    relationship.save()
                else:
                    logger.log('WORKER:get_follow_info: We already know this followers rel %s %d ' % (full_info[u'user']['id'], self_user_id))

            logger.log('WORKER:get_follow_info: Create new Task_to_user_map')
            task_to_user_map = Task_to_user_map(task_id = task,
                                                user_id = new_user)

            task_to_user_map.save()

            #task_result['result'].append(info)
        
            
        #result_file = open(result_file_name , 'w')
        #result_file.write(json.dumps(task_result))
        #result_file.close()
        
        logger.log('VIEW:selenium_bot: FINISH')


    #@start_thread
    def change_relationships(self, user_names, direction, task_id):             # TO DO: update database after changing rel
        selenium_bot = selenium_webdriver()
        selenium_bot.login_user(self.login, self.password)
        
        for user_name in user_names:
            selenium_bot.change_relationships(user_name)

        selenium_bot.driver.close()
        
        
