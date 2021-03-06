from local_conf import *
import time
import datetime
import os

class Logger(object):
    def __init__(self, name):
        self.name = name

    def log(self, text):
    	BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    	path = os.path.join(BASE_DIR, 'studioapp', 'logs')
        log_file = open('%s/%s' % (path, "LOG") , 'a')
        log_file.write('\n ' + self.name +': ' + str(text))
        log_file.close()

