import requests
import random
import time
import datetime
import json
import atexit
import signal
import itertools
import sys




user_login    = 'look_its_dimson'
user_password = 'Nopasaran'
accept_language = 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4'
user_agent = ("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36")

url = 'https://www.instagram.com/'
url_tag = 'https://www.instagram.com/explore/tags/'
url_likes = 'https://www.instagram.com/web/likes/%s/like/'
url_unlike = 'https://www.instagram.com/web/likes/%s/unlike/'
url_comment = 'https://www.instagram.com/web/comments/%s/add/'
url_follow = 'https://www.instagram.com/web/friendships/%s/follow/'
url_unfollow = 'https://www.instagram.com/web/friendships/%s/unfollow/'
url_login = 'https://www.instagram.com/accounts/login/ajax/'
url_logout = 'https://www.instagram.com/accounts/logout/'
url_media_detail = 'https://www.instagram.com/p/%s/?__a=1'
url_user_detail = 'https://www.instagram.com/%s/?__a=1'


def login():
    s = requests.Session()
    s.cookies.update({'sessionid': '', 'mid': '', 'ig_pr': '1',
                           'ig_vw': '1920', 'csrftoken': '',
                           's_network': '', 'ds_user_id': ''})
    login_post = {'username': user_login,
                  'password': user_password}
    s.headers.update({'Accept-Encoding': 'gzip, deflate',
                           'Accept-Language': accept_language,
                           'Connection': 'keep-alive',
                           'Content-Length': '0',
                           'Host': 'www.instagram.com',
                           'Origin': 'https://www.instagram.com',
                           'Referer': 'https://www.instagram.com/',
                           'User-Agent': user_agent,
                           'X-Instagram-AJAX': '1',
                           'X-Requested-With': 'XMLHttpRequest'})
    r = s.get(url)
    s.headers.update({'X-CSRFToken': r.cookies['csrftoken']})
    time.sleep(5 * random.random())
    login = s.post(url_login, data=login_post,
                        allow_redirects=True)
    s.headers.update({'X-CSRFToken': login.cookies['csrftoken']})
    csrftoken = login.cookies['csrftoken']
    time.sleep(5 * random.random())

    if login.status_code == 200:
        r = s.get('https://www.instagram.com/')

        #https://www.instagram.com/web/likes/1410416813719788712/like/
        #https://www.instagram.com/web/likes/1402810290877667666/like/
        #l_url = 'https://www.instagram.com/web/likes/1365953820962013031/like/'
        url_test = 'https://www.instagram.com/query/'
        attr ={'q': "ig_user(1111130359)+{++followed_by.first(10)+{++++count,++++page_info+{++++++end_cursor,++++++has_next_page++++},++++nodes+{++++++id,++++++is_verified,++++++followed_by_viewer,++++++requested_by_viewer,++++++full_name,++++++profile_pic_url,++++++username++++}++}}",
                'ref':"relationships::follow_list",
                'query_id':"17845270936146575"}
        result = open('res', 'a')

        l_post = s.post(url_test,q="ig_user(1111130359)+{++followed_by.first(10)+{++++count,++++page_info+{++++++end_cursor,++++++has_next_page++++},++++nodes+{++++++id,++++++is_verified,++++++followed_by_viewer,++++++requested_by_viewer,++++++full_name,++++++profile_pic_url,++++++username++++}++}}",ref="relationships::follow_list",query_id="17845270936146575")        #l_get = s.post(url_test)
        #result.write(str(l_get.text))
        print l_post.text
        print '********************************'
        print s.cookies

login()