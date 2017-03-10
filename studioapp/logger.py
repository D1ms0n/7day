from local_conf import *
import time
import datetime


class Logger(object):
    def __init__(self, name):
        self.name = name

    def log(self, text):
        log_file = open('%s/logs/%s_log' % (path, self.name) , 'a')
        log_file.write('\n ' + str(text))

