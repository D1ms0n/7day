from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
import time
import re
import platform
from local_conf import *
#from logger import Logger

class selenium_webdriver(object):
    
    def __init__(self):
        ##self.logger = Logger('selenium_bot')
        if platform.system() == 'Winows':  
            self.binary = FirefoxBinary(r'C:\Program Files (x86)\Mozilla Firefox\firefox.exe')
            self.driver = webdriver.Firefox(firefox_binary=self.binary)
        else:
            self.driver = webdriver.PhantomJS(service_log_path='%sphantomlog' % path)
            self.driver.set_window_size(1120, 550)
        time.sleep(3)

    def login_user(self,  username, password):                                                                             #TO DO: SAVE and return cookie
        self.driver.get("https://www.instagram.com/accounts/login/")
        time.sleep(3)
        self.my_user_name = username
        self.driver.find_element_by_xpath("//input[@name='username']").send_keys(username)
        self.driver.find_element_by_xpath("//input[@name='password']").send_keys(password)
        self.driver.find_element_by_css_selector("button").click()
        #self.logger.log('login_user %s' % username)
        time.sleep(3)

    def make_screenshot(self):
        time_now        =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
        screenshot      = self.driver.get_screenshot_as_png()
        screenshot_file = open('%sscreen/%s_screen.png' % (path, time_now), 'a')
        screenshot_file.write(screenshot)
        screenshot_file.close()

    def get_follow_info(self, username, direction = 'followers' ,  max_value = 8):
        self.driver.get("https://www.instagram.com/%s/" % username)
        time.sleep(3)
        button = self.driver.find_element_by_xpath("//a[@href='/%s/%s/']" % (username, direction))
        time.sleep(3)
        button.click()
        time.sleep(3)
        follow_buttons_list = self.driver.find_elements_by_css_selector('button')
        
        #while len(follow_buttons_list) < max_value:
        #    old_len = len(follow_buttons_list)
        #    divs_followers = self.driver.find_elements_by_xpath("//div[text()='F%s']" % direction[1:])[0]                              
        #    divs = self.driver.find_elements_by_css_selector('div')
        #    div_to_scroll_index = divs.index(divs_followers) + 1  
        #    div_to_scroll_class = divs[div_to_scroll_index].get_attribute('class')
        #    time.sleep(1)
        #    try:
        #        self.driver.execute_script("document.getElementsByClassName('%s')[0].scrollTo(0, 300500)" % div_to_scroll_class)
        #    except:
        #        print 'SCROLL'
        #    time.sleep(1)
        #    follow_buttons_list = self.driver.find_elements_by_css_selector('button')
        #    new_len = len(follow_buttons_list)
        #    if new_len == old_len:
        #        break
        

    def get_follow_names(self, username, direction = 'followers' ,  max_value = 8):
        #self.logger.log('Try to get %d  %s for %s' % (max_value, direction, username))
        self.get_follow_info(username, direction,  max_value)
        follow_users_links = self.driver.find_elements_by_css_selector('a')
        regex = re.compile(r'https://www.instagram.com/([^/]+)/$')
        follow_names = []

        for link in follow_users_links:
            link_attr = link.get_attribute('href')
            print str(link)
            username_search = re.search(regex, link_attr)
            if username_search:
                username = username_search.group(1)
                if username not in follow_names and username != self.my_user_name:
                    follow_names.append(username)

        return follow_names

    def get_follow_buttons(self, username, direction = 'followers' ,  max_value = 8):
        self.get_follow_info(username, direction,  max_value)
        follow_buttons_list = self.driver.find_elements_by_css_selector('button')
        return follow_buttons_list

       
        ################################################################################### TESTS ###########################################################################
        
    def test_get_followers(self):
        self.login_user('studio7day', 'Nopasaran')
        print 'loggined'
        time.sleep(3)
        self.make_screenshot()
        followers = self.get_follow_names('fursty', 'followers',  100)
        print len(followers)
        self.make_screenshot()
        print str(followers)
        
    def test_get_following(self):
        self.login_user('studio7day', 'Nopasaran')
        print 'loggined'
        time.sleep(3)
        self.make_screenshot()
        following = self.get_follow_names('fursty', 'following',  100)
        print len(following)
        self.make_screenshot()
        print str(following)

