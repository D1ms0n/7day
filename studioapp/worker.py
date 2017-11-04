import json
import time
import subprocess
import os
import threading

from local_conf import *
from selenium_bot import selenium_webdriver
from instabot import Bot
from logger import Logger
from django_datastore import create_update_user, create_relationship, create_task_to_user_map, get_task_from_database, create_update_task

from .models import Insta_user
from .models import Insta_bot_task
from .models import Task_to_user_map
from .models import Relationship
from .models import Insta_image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
logger = Logger('worker')

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

    def create_new_task(self, operation, username, args):
        task = create_update_task(operation = operation, username = username, args = args)

        logger.log('WORKER:create_new_task: ' + str(task.task_id))
        return task

    def run_task(self, task_id):
        task      = get_task_from_database(task_id)
        task_args = json.loads(task.args.replace("'", '"'))

        method_to_run = self.__getattribute__(task.operation)

        if method_to_run:
            method_to_run(username = task.username, task_args = task_args, task_id = task.task_id)
    
    #@start_thread
    def get_follow_info(self, username, task_args, task_id):

        time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        logger.log('WORKER:get_follow_info: ' + str(time_now) + str(task_id))

        count     = task_args['count']
        direction = task_args['direction']
        usernames = task_args['usernames']

        logger.log('WORKER:get_follow_info: Get task from database %s' % task_id)
        task = get_task_from_database(task_id)

        logger.log('WORKER:get_follow_info: Change task %s status to "In pogress"' % str(task_id))
        task.status = 'In pogress'
        task.save()

        selenium_bot = selenium_webdriver()
        selenium_bot.login_user(self.login, self.password)

        bot = Bot()
        bot.login_user(self.login, self.password)  # TO DO: SAVE COOKIES

        for username in usernames:
            follow_names = selenium_bot.get_follow_names(username, direction, count)

            user_info = bot.get_info(username)
            create_update_user(user_info)

            user_id = user_info[u'user']['id']


            for follow_name in follow_names:
                full_info = bot.get_info(follow_name)

                user = create_update_user(full_info)

                logger.log('WORKER:get_follow_info: Create new Relationship %s ' % full_info[u'user']['id'])

                if direction == 'following':
                    create_relationship(user_id = user_id, followed_user_id = full_info[u'user']['id'])

                elif direction == 'followers':
                    create_relationship(user_id=full_info[u'user']['id'], followed_user_id=user_id)


                logger.log('WORKER:get_follow_info: Create new Task_to_user_map')
                create_task_to_user_map(task, user)

        selenium_bot.driver.close()

        task.status = 'Finished'
        task.save()

        logger.log('VIEW:get_follow_info: FINISH')


    #@start_thread
    def change_relationships(self, user_names, direction, task_id):             # TO DO: update database after changing rel
        selenium_bot = selenium_webdriver()
        selenium_bot.login_user(self.login, self.password)

        for user_name in user_names:
            selenium_bot.change_relationships(user_name)

        selenium_bot.driver.close()

    ############################################################## OLD METHODS ##############################
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
        
