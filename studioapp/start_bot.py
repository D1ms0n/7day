#!/usr/bin/env python
# -*- coding: utf-8 -*-

from instabot import Bot
from local_conf import *
import re
import random
import time

follow_link   = 'https://www.instagram.com/web/friendships/%s/follow/'
unfollow_link = 'https://www.instagram.com/web/friendships/%s/unfollow/'

bot = Bot()
bot.login_user()

bot.logger('start at ' + str(time.strftime('%X %x %Z')))

def start_follow(count):

    input_follow_file   = open('%sfollow_ids' % path)
    input_unfollow_file = open('%sunfollow_ids' % path)

    follow_ids   = [user_id.strip() for user_id in input_follow_file.readlines()   if len(user_id) > 3]                   #change!!!!!!!!
    unfollow_ids = [user_id.strip() for user_id in input_unfollow_file.readlines() if len(user_id) > 3]

    input_follow_file.close()
    input_unfollow_file.close()

    new_follow_file   = open('%sfollow_ids' % path, 'w')
    new_follow_file_str = ''
    for user_id in follow_ids[count+1:]:
        new_follow_file_str += '\n' + user_id

    new_follow_file.write(new_follow_file_str)
    new_follow_file.close()




    for user_id in follow_ids[0:count+1]:
        bot.logger('Try to follow ' + user_id)
        r = bot.follow(user_id.strip())
        if r:
            if r.status_code != 200:
                bot.logger('FAILED: follow ' + user_id)
                break
            else:
                if user_id not in unfollow_ids:
                    bot.logger('ADDED ' + user_id + ' TO unfollow_ids')
                    new_unfollow_file = open('%sunfollow_ids' % path, 'a')
                    new_unfollow_file.write('\n' + user_id)
                    new_unfollow_file.close()
        else:
            bot.logger('FAILED CRITICAL: follow ' + user_id)


def start_unfollow(count):

    input_unfollow_file = open('%sunfollow_ids' % path)

    unfollow_ids = [user_id.strip() for user_id in input_unfollow_file.readlines() if len(user_id) > 3]
    input_unfollow_file.close()

    new_unfollow_file_str = ''
    new_unfollow_file = open('%sunfollow_ids' % path, 'w')
    for user_id in unfollow_ids[count+1:]:
        new_unfollow_file_str += '\n' + user_id

    new_unfollow_file.write(new_unfollow_file_str)
    new_unfollow_file.close()


    for user_id in unfollow_ids[0:count+1]:
        bot.logger('Try to unfollow ' + user_id)
        r = bot.unfollow(user_id.strip())
        if r:
            if r.status_code != 200:
                break




if time.gmtime().tm_min == 0 :
    start_follow(20)
elif time.gmtime().tm_min == 30:
    start_unfollow(20)