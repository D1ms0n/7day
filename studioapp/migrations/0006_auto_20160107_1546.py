# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-07 15:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studioapp', '0005_headerslide'),
    ]

    operations = [
        migrations.AlterField(
            model_name='headerslide',
            name='h2',
            field=models.CharField(blank=True, max_length=256, verbose_name='h2'),
        ),
    ]
