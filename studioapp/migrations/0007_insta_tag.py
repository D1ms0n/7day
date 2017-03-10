# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-07-25 22:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studioapp', '0006_auto_20160107_1546'),
    ]

    operations = [
        migrations.CreateModel(
            name='Insta_tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag_id', models.CharField(max_length=256, verbose_name='Id')),
                ('tag_title', models.CharField(max_length=256, verbose_name='Title')),
                ('tag_images_count', models.TextField(blank=True, verbose_name='Image count')),
            ],
            options={
                'verbose_name': 'Tag',
                'verbose_name_plural': 'Tags',
            },
        ),
    ]
