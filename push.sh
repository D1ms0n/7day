#!/bin/bash
cd /mnt/hgfs/web/7day

	cp -r studio /home/dima/depl/7day/wsgi/studio
	cp -r studioapp /home/dima/depl/7day/wsgi/studio
	cp manage.py /home/dima/depl/7day/wsgi/studio
	cp -r media /home/dima/depl/7day/wsgi/studio
	cp db.sqlite3 /home/dima/depl/7day/wsgi/studio
	
cd /mnt/hgfs/web/7day/studioapp
	cp -r static /home/dima/depl/7day/wsgi/