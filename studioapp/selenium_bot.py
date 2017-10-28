# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
import time
import re
import platform
from local_conf import *
import os
from logger import Logger
import json

from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

# Path:
BASE_DIR       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cookies_path   = os.path.join(BASE_DIR, 'studioapp', 'cookies/cookie_')
logs_dir       = os.path.join(BASE_DIR, 'studioapp', 'logs')
screenshot_dir = os.path.join(BASE_DIR, 'studioapp', 'scr')

#Links:
insta_main_link  = "https://www.instagram.com/"
insta_login_link = "https://www.instagram.com/accounts/login/"
insta_user_link  = "https://www.instagram.com/%s/"   # % username

filtered_names = ['developer', 'explore']

class selenium_webdriver(object):
    
    def __init__(self):
        self.logger = Logger('selenium_bot')
        self.logger.log('SELENIUM_BOT:init: Create selenium_bot')
        if platform.system() == 'Windows':  
            self.binary = FirefoxBinary(r'C:\Program Files (x86)\Mozilla Firefox\firefox.exe')
            self.driver = webdriver.Firefox(firefox_binary=self.binary)
        else:
            path = logs_dir
            dcap = dict(DesiredCapabilities.PHANTOMJS)
            dcap["phantomjs.page.settings.userAgent"] = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/53 "    "(KHTML, like Gecko) Chrome/15.0.87")
            
            self.driver = webdriver.PhantomJS(service_log_path='%s/phantom' % path, desired_capabilities=dcap,  service_args=['--ignore-ssl-errors=true', '--ssl-protocol=any', '--web-security=false'])
            #self.driver = webdriver.PhantomJS(desired_capabilities=dcap)
            
            self.driver.set_window_size(1280, 960)
            #page.settings.userAgent 
            #self.driver.desired_capabilities['userAgent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:55.0) Gecko/20100101 Firefox/55.0'
            #print self.driver.desired_capabilities

        self.logger.log('SELENIUM_BOT:init: DONE')
        time.sleep(3)


    def login_user(self,  username, password):                                                                             
        self.my_user_name = username
#        self.logger.log('SELENIUM_BOT:login_user: try to use cookies ')
        
#        self.driver.get(insta_main_link)

#        try:
#            old_cookies = json.loads(open(cookies_path + username).readlines()[0])
            
#        except:
#            pass

#        for num in [0,1,2,3,4,7]:
#            try:
#                self.logger.log('SELENIUM_BOT:login_user: try cookie %d ' % num)
#                self.logger.log('SELENIUM_BOT:login_user: cookie #%d ---> %s' % (num,  str(old_cookies[num])))
#                self.driver.add_cookie(old_cookies[num])

#                self.logger.log('SELENIUM_BOT:login_user: cookies uploaded ')
#            except:
#                self.logger.log('SELENIUM_BOT:login_user: bad cookies ')

#        self.driver.get(insta_main_link)
#        time.sleep(3)
        #self.driver.get(insta_user_link % username)

 #       element = self.driver.find_elements_by_class_name('coreSpriteDesktopNavProfile')
 #       self.make_screenshot()
#        

#        debug_elements = self.driver.find_elements_by_name('a')
#        print str(debug_elements)

#        if len(element) != 0:
#            self.logger.log('SELENIUM_BOT:login_user: COOKIE WORKS!!!')

#        else:
        
        cookies = ''
        self.logger.log('SELENIUM_BOT:login_user: Try to get login page')


        self.driver.get(insta_login_link)
        time.sleep(3)

        self.driver.find_element_by_xpath("//input[@name='username']").send_keys(username)
        self.driver.find_element_by_xpath("//input[@name='password']").send_keys(password)
        
        self.logger.log('SELENIUM_BOT:login_user: Try to login %s' % username )
        self.driver.find_element_by_css_selector("button").click()
        time.sleep(3)

        self.driver.get(insta_main_link)
        time.sleep(3)

        #cookies     = self.driver.get_cookies()
        #cookies_str = json.dumps(cookies)

        #self.logger.log('SELENIUM_BOT:login_user: cookies: %s' % cookies_str )

        #cookies_file = open(cookies_path  + username, 'w')
        #cookies_file.write(cookies_str)
        #cookies_file.close()
        
        self.logger.log('SELENIUM_BOT:login_user: %s loggined' % username )

    def make_screenshot(self):
        time_now        =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')

        screenshot      = self.driver.get_screenshot_as_png()
        screenshot_file = open('%s/%s_screen.png' % (screenshot_dir , time_now), 'a')
        
        screenshot_file.write(screenshot)
        screenshot_file.close()


    def get_follow_names(self, username, direction = 'followers' ,  max_value = 30):
        
        direction_ru = {'followers': 'Подписчики',
                        'following': 'Ваши подписки'}

        self.logger.log('SELENIUM_BOT:get_follow_names: Try to get %d  %s for %s' % (max_value, direction, username))
        
        self.logger.log('SELENIUM_BOT:get_follow_names: Try to get user page')
        self.driver.get(insta_user_link % username)
        time.sleep(3)

        self.logger.log('SELENIUM_BOT:get_follow_names: Try to find button')
        button = self.driver.find_element_by_xpath("//a[@href='/%s/%s/']" % (username.lower(), direction))
 
        self.logger.log('SELENIUM_BOT:get_follow_names: Try to click button')        
        button.click()
        time.sleep(3)
        
        # SCROLL

        follow_buttons_list = self.driver.find_elements_by_css_selector('button')
        
        scroll_value = 900500

        while len(follow_buttons_list) < max_value:
            old_len = len(follow_buttons_list)

            divs_followers_list = self.driver.find_elements_by_xpath("//div[text()='F%s']" % direction[1:])                              
        
            if  not divs_followers_list:
                divs_followers_list = self.driver.find_elements_by_xpath("//div[text()='%s']" % direction_ru[direction])

            divs_followers = divs_followers_list[0]    

            divs = self.driver.find_elements_by_css_selector('div')
            div_to_scroll_index = divs.index(divs_followers) + 1  
            div_to_scroll_class = divs[div_to_scroll_index].get_attribute('class')
            time.sleep(1)

            try:
                #self.driver.execute_script("document.getElementsByClassName('%s')[0].scrollTo(0, %d)" % (div_to_scroll_class, scroll_value))
                self.driver.execute_script("document.getElementsByClassName('%s')[0].scrollTop=10000" % div_to_scroll_class)
                time.sleep(3)

            except Exception, e:
                self.logger.log('SELENIUM_BOT:Exception: %s' % e)

            time.sleep(1)
            follow_buttons_list = self.driver.find_elements_by_css_selector('button')
            new_len = len(follow_buttons_list)

            if new_len == old_len:
                self.logger.log('SELENIUM_BOT:Scroll: BREAK')
                break

            #scroll_value = scroll_value * 2

        self.logger.log('SELENIUM_BOT:get_follow_names: Try to get follow_users_links')
        follow_users_links = self.driver.find_elements_by_css_selector('a')

        follow_users_links = list(set(follow_users_links))

        regex = re.compile(r'https://www\.instagram\.com/([^/]+)/$')
        follow_names = []

        for link in follow_users_links:
            link_attr = ''
            link_attr = link.get_attribute('href')
            #self.logger.log('SELENIUM_BOT:get_follow_names: Try %s' % link_attr)
            
            if link_attr:
                username_search = re.search(regex, link_attr)
                if username_search and username_search.group(1):
                    username = username_search.group(1)
                    if username not in follow_names and username != self.my_user_name and username not in filtered_names:
                        follow_names.append(username)

        self.logger.log('SELENIUM_BOT:get_follow_names: Got [%s] ' % str(follow_names))
        self.logger.log('SELENIUM_BOT:get_follow_names: Got %s user_names' % str(len(follow_names)))
        return follow_names

    def change_relationships(self, username, direction = None):
        self.logger.log('SELENIUM_BOT:change_relationships: try to get page %s ' % insta_user_link % username)
        self.driver.get(insta_user_link % username)
        self.logger.log('SELENIUM_BOT:change_relationships: try to follow %s ' % username)
        time.sleep(3)

        buttons = self.driver.find_elements_by_css_selector('button')
        try:
            self.logger.log(username + ' button: ' + buttons[0].text)
            if direction == 'follow' and buttons[0].text == 'Follow':
                buttons[0].click()
            elif direction == 'unfollow' and buttons[0].text == 'Following':
                buttons[0].click()
            else:
                self.logger.log('ERROR: ' + username + ' button: ' + buttons[0].text)
        except Exception, e:
            self.logger.log('SELENIUM_BOT:change_relationships: FAILED %s ' % str(e))

        time.sleep(3)

        return direction + 'ed'

        ################################################################################### TESTS ###########################################################################
     
    def close_bot(self):
        self.driver.close()
        self.logger.log('SELENIUM_BOT: closed')

    def test_get_followers(self):
        self.login_user('studio7day', 'Nopasaran')
        print 'loggined'
        time.sleep(3)
        followers = self.get_follow_names('fursty', 'followers',  100)

        print str(followers)
        
    def test_get_following(self):
        self.login_user('studio7day', 'Nopasaran')
        print 'loggined'
        time.sleep(3)

        following = self.get_follow_names('fursty', 'following',  100)
        print len(following)
        self.make_screenshot()
        print str(following)

