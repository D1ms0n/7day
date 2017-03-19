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
	a = open('studioapp/data/tasks', 'r')
	b = open('studioapp/data/tasks2', 'a')
	line = a.readlines()[0]
	print line
	logger.log(line)
	b.write(line + '\n')
	b.close()
	print 'sleep2'
	time.sleep(1)
	try:
		c = open('studioapp/data/tasks2', 'r')
		print(c.readlines()[0])
	except:
		pass
