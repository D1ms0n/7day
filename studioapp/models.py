# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.db import models

# Create your models here.

class HeaderSlide(models.Model):
    class Meta(object):
        verbose_name = u"Слайд шапки"
        verbose_name_plural = u"Слайды шапки"
    def __unicode__(self):
        return self.h1

    h1 = models.CharField(max_length=256,
        blank=False,
        verbose_name=u"Название")

    h2 = models.CharField(max_length=256,
        blank=True,
        verbose_name=u"h2")

    image = models.ImageField(
        blank=True,
        verbose_name=u"Фото",
        null=True)
    



# ----------------------------------------- INSTA ---------------------------------------------------

class Insta_tag(models.Model):
    class Meta(object):
        verbose_name = u"Tag"
        verbose_name_plural = u"Tags"
    def __unicode__(self):
        #self.content_part=self.tag_title[0:100]
        return u"%s..." % (self.tag_title)

    tag_id = models.CharField(max_length=256,
        blank=False,
        verbose_name=u"Id")

    tag_title = models.CharField(max_length=256,
        blank=False,
        verbose_name=u"Title")

    tag_images_count = models.IntegerField(blank=True,
        verbose_name=u"Image count")

class Insta_user(models.Model):
    class Meta(object):
        verbose_name = u"User"
        verbose_name_plural = u"Users"
    def __unicode__(self):
        #self.content_part=self.content[0:100]
        return u"%s..." % (self.user_name)

    user_id =  models.CharField(max_length=256,
                                blank=True,
                                verbose_name=u"Id",
                                primary_key=True)

    user_name = models.CharField(max_length=256,
                                 blank=False,
                                 verbose_name=u"User_login",null= True)

    user_full_name =  models.CharField(max_length=256,                              
                                       verbose_name=u"User_full_name",null= True)
    
    followers_count = models.IntegerField(blank=False,null= True)

    follow_count    = models.IntegerField(blank=False,null= True)

    profile_pic_url_hd =  models.CharField(max_length=256, blank=False,null= True)

    user_biography  =  models.CharField(max_length=256,
                                       blank=False,
                                       null= True)
    user_external_url = models.CharField(max_length=256, blank=False,null= True)
    follows_viewer =  models.CharField(max_length=256, blank=False,null= True)
    followed_by_viewer =  models.CharField(max_length=256, blank=False,null= True)
    has_requested_viewer =  models.CharField(max_length=256, blank=False,null= True)
    requested_by_viewer =  models.CharField(max_length=256, blank=False,null= True)
    has_blocked_viewer =  models.CharField(max_length=256, blank=False,null= True)
    blocked_by_viewer =  models.CharField(max_length=256, blank=False,null= True)
    is_private =  models.CharField(max_length=256, blank=False,null= True)




class Insta_image(models.Model):
    class Meta(object):
        verbose_name = u"Image"
        verbose_name_plural = u"Images"
    def __unicode__(self):
        #self.content_part=self.image_id[0:100]
        return u"%s..." % (self.image_id)

    image_id = models.CharField(max_length=256,
        blank=False,
        verbose_name=u"Id")

    image_author = models.ForeignKey(Insta_user, on_delete=models.CASCADE)

    images_likes_count = models.TextField(blank=True,
        verbose_name=u"Likes count")


    images_tags =  models.ManyToManyField(Insta_tag)







    

    

    