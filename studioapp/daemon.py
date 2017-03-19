from logger import Logger
import time

logger = Logger('DAEMON')

while 1==1:
	time.sleep(10)
	t = time.strftime('%X %x').replace(' ', '_').replace('/', '_')
	logger.log(t)	