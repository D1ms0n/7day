import time
from studioapp.logger import Logger
from studioapp.selenium_bot import selenium_webdriver
from studioapp.instabot import Bot
#from studioapp.django_datastore import *


class BaseTask(object):
    def __init__(self, db_instance_json):     # TO DO: get attributes from db_instance
        #self.db_instance = db_instance

        self.login    = 'studio_7_day_2'
        self.password = 'Nopasaran'

        self.user_name   = db_instance_json.get('username')
        self.task_id     = db_instance_json.get('task_id')
        self.count       = db_instance_json.get('count')
        self.targets     = db_instance_json.get('targets')
        self.operation   = db_instance_json.get('operation')
        self.selenium_bot = None
        self.insta_bot    = None
        self.bots = []

        time_now = time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        self.logger = Logger('Task')


    def get_status(self):
        pass

    def get_targets_list(self):
        return self.targets_list

    def get_selenium_bot(self, login = None, password = None):

        if login and password:
            self.loggined_selenium_bot = selenium_webdriver()
            self.loggined_selenium_bot.login_user(login, password)
            self.bots.append(self.loggined_selenium_bot)
        else:
            self.selenium_bot = selenium_webdriver()
            self.bots.append(self.selenium_bot)

    def get_insta_bot(self, login, password):
        if login and password:
            self.loggined_insta_bot = Bot()
            self.insta_bot.login_user(login, password)
            self.bots.append(self.loggined_insta_bot)
        else:
            self.insta_bot = Bot()
            self.bots.append(self.insta_bot)

    def run(self):
        pass


    def run_task(self):
        self.logger.log('Run ' + str(type(self)))

        self.get_targets_list()
        self.run()

        for bot in self.bots:
            bot.close()

        self.logger.log('Done')


class SeleniumBotMixin(object):
    def create_bots(self):
        get_selenium_bot()

class InstaBotMixin(object):
    def create_bots(self):
        get_insta_bot()


class RelationsTask(BaseTask):

    def get_targets_list(self):
        self.get_rel_user_list()

    def get_rel_user_list(self):
        self.rel_user_list = [arg['user_name'] for arg in self.targets]

    def run(self):
        self.get_selenium_bot(self.login, self.password)

        if not self.rel_user_list:
            self.logger('Done: 0 users')

        for user in self.rel_user_list:
            self.loggined_selenium_bot.change_relationships(user, self.operation)




#class FollowTask(RelationsTask):
#    self.direction = 'follow'


#class UnfollowTask(RelationsTask):
#    self.direction = 'unfollow'





class GetFollowInfoTask(BaseTask):

    def get_targets_list(self):
        self.user_names = [arg['user_name'] for arg in self.targets]

    def get_follow_info(self):

        if not self.selenium_bot:
            self.get_selenium_bot(self.login, self.password)

        if not self.insta_bot:
            self.get_insta_bot()

        for username in self.user_names:
            follow_names = self.loggined_selenium_bot.get_follow_names(username, self.direction, self.count)

            # Get info about target user
            user_info = self.insta_bot.get_info(username)

            target_user = create_update_user(user_info)

            user_id = target_user.user_id

            for follow_name in follow_names:

                #Try to get user from database
                user = get_user_from_database(user_name = follow_name)

                if not user:
                    try:
                        full_info = self.insta_bot.get_info(username)
                    except Exception, e:
                        #logger.log('WORKER:Exception: %s' % e)
                        full_info = None
                        time.sleep(30)

                    if full_info and full_info['status_code'] == 200:
                        user = create_update_user(full_info)

                if not user:
                    continue


                if direction == 'following':
                    create_relationship(user_id = user_id, followed_user_id = user.user_id)

                elif direction == 'followers':
                    create_relationship(user_id = user.user_id, followed_user_id=user_id)

                create_task_to_user_map(task, user)  # TO DO  !!!!!

    def run(self):
        self.get_follow_info()


class GetFollowingTask(BaseTask):
    pass


class FollowFollowersOfUser(RelationsTask):

    def get_targets_list(self):
        self.selenium_bot.get_follow_names()
