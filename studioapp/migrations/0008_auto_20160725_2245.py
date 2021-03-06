# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-07-25 22:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studioapp', '0007_insta_tag'),
    ]

    operations = [
        migrations.CreateModel(
            name='Insta_image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_id', models.CharField(max_length=256, verbose_name='Id')),
                ('images_likes_count', models.TextField(blank=True, verbose_name='Likes count')),
            ],
            options={
                'verbose_name': 'Image',
                'verbose_name_plural': 'Images',
            },
        ),
        migrations.CreateModel(
            name='Insta_user',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_login', models.CharField(max_length=256, verbose_name='Id')),
                ('followers_count', models.CharField(max_length=256, verbose_name='Id')),
                ('follow_count', models.CharField(max_length=256, verbose_name='Id')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
        migrations.AddField(
            model_name='insta_image',
            name='image_author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studioapp.Insta_user'),
        ),
        migrations.AddField(
            model_name='insta_image',
            name='images_tags',
            field=models.ManyToManyField(to='studioapp.Insta_tag'),
        ),
    ]
