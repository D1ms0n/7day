# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-03 18:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Advantage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256, verbose_name='\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435')),
                ('image', models.ImageField(blank=True, null=True, upload_to=b'', verbose_name='\u0424\u043e\u0442\u043e')),
                ('content', models.TextField(blank=True, verbose_name='\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435')),
            ],
        ),
    ]
