#!/bin/bash
cd /home/dima/depl/7day/wsgi/studio
cp manage.py /mnt/hgfs/web/7day/
cp -r studio /mnt/hgfs/web/7day/
cp -r studioapp /mnt/hgfs/web/7day/
cp db.sqlite3 /mnt/hgfs/web/7day/

cd /home/dima/depl/7day/wsgi
cp -r media /mnt/hgfs/web/7day/
cp -r static /mnt/hgfs/web/7day/studioapp