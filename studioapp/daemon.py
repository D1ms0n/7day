from logger import Logger
import time

logger = Logger('DAEMON')
print 'start'
while 1==1:
	print 'sleep'
	time.sleep(10)
	t = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
	print t
	logger.log(t)	