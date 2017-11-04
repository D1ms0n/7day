import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "studio.settings")
django.setup()

from studioapp.worker import *

time_now =  time.strftime('%X %x').replace(' ', '_').replace('/', '_').replace(':', '_')
worker = Worker('studio_7_day_2','Nopasaran')


task = worker.create_new_task(operation = 'get_follow_info', username = 'test_user', args = {'usernames' : ['fursty'], 'count': 15,  'direction': 'following'})

task_id = task.task_id

worker.run_task(task_id)
