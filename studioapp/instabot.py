from local_conf import *
from logger import Logger
import requests
import json
import random
import time
import datetime
import re

follow_link   = 'https://www.instagram.com/web/friendships/%s/follow/'
unfollow_link = 'https://www.instagram.com/web/friendships/%s/unfollow/'

class Bot(object):
    def __init__(self):
        self.user_login    = 'look_its_dimson'
        self.user_password = 'Nopasaran'
        self.accept_language = 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4'
        self.user_agent = ("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36")

        self.url = 'https://www.instagram.com/'
        self.url_login = 'https://www.instagram.com/accounts/login/ajax/'
        self.logger = Logger('instabot')

#    def logger(self, text):
 #       log_file = open('%slog' % path, 'a')
 #       log_file.write('\n ' + str(text))

    def login_user(self):
        self.s = requests.Session()
        self.s.cookies.update({'sessionid': '', 'mid': '', 'ig_pr': '1',
                               'ig_vw': '1920', 'csrftoken': '',
                               's_network': '', 'ds_user_id': ''})
        self.login_post = {'username': self.user_login,
                      'password': self.user_password}
        self.s.headers.update({'Accept-Encoding': 'gzip, deflate',
                               'Accept-Language': self.accept_language,
                               'Connection': 'keep-alive',
                               'Content-Length': '0',
                               'Host': 'www.instagram.com',
                               'Origin': 'https://www.instagram.com',
                               'Referer': 'https://www.instagram.com/',
                               'User-Agent': self.user_agent,
                               'X-Instagram-AJAX': '1',
                               'X-Requested-With': 'XMLHttpRequest'})
        r = self.s.get(self.url)
        self.s.headers.update({'X-CSRFToken': r.cookies['csrftoken']})
        time.sleep(5 * random.random())
        login = self.s.post(self.url_login, data=self.login_post,
                            allow_redirects=True)
        self.s.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
        csrftoken = login.cookies['csrftoken']
        time.sleep(5 * random.random())

    def get_info(self, name):
        self.logger.log('Try to get info for %s' % name)
        link   = 'https://www.instagram.com/%s/?__a=1'
        answer = ''
        answer = requests.get(link % name).text
        #time.sleep(1)
        if answer:
            try:
                info = json.loads(answer)
            except:
                info = None
        if info== None:
            self.logger.log('DONE: %s is NONE' % name)
        else:
            self.logger.log('DONE: %s' % name)                
        return info


    def user_request(self, reqs, r_type = 'get'):
        answer = {}
        #self.logger.log('req' + str(reqs))
        if r_type == 'get':

            answer = self.s.get(reqs['link'] % reqs['id']).text
            return answer

        elif r_type == 'post':

            rst = self.s.post(reqs['link'] % reqs['id'])
            #self.logger.log(rst.status_code)
            answer =rst.text

            if rst.status_code != 200:
                #self.logger.log('bad' + reqs['link'] % reqs['id'])
                #self.logger.log('\nFAILED' + str(reqs['id']))
                return rst

            else:
                #self.logger.log('good ' + reqs['id'] +  str(time.strftime('%X %x %Z')))
                time.sleep(55 + random.randint(1, 5))

            return rst

    def unfollow(self, user_id):
        reqs = {'link': unfollow_link, 'id' : user_id}
        answer = self.user_request(reqs, 'post')
        return answer

    def follow(self, user_id):
        reqs = {'link': follow_link, 'id' : user_id}
        answer = self.user_request(reqs, 'post')
        return answer


    def parse_logins(self, file):
        follow_file_content = file.readlines()[-1]
        all_logins = re.findall(r'instagram\.com/(.+?)/', follow_file_content)
        logins = []
        logins_str = ''
        print len(all_logins)
        logins = [i for i in all_logins[::2] ]
        print len(logins)

        for i in logins:
            logins_str += ',' + i

        print logins_str
        return logins_str