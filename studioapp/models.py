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
	

class Usluga(models.Model):
	class Meta(object):
		verbose_name = u"Услуга"
		verbose_name_plural = u"Услуги"
	def __unicode__(self):
		return self.title

	title = models.CharField(max_length=256,
		blank=False,
		verbose_name=u"Название")

	image = models.ImageField(
		blank=True,
		verbose_name=u"Фото",
		null=True)

	option1 = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Характеристика 1")
	option2 = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Характеристика 2")
	option3 = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Характеристика 3")
	option4 = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Характеристика 4")
	option5 = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Характеристика 5")

	price = models.CharField(max_length=256,
		blank=True,
		verbose_name=u"Цена")

class Advantage(models.Model):
	class Meta(object):
		verbose_name = u"Преимущество"
		verbose_name_plural = u"Преимущества"
	def __unicode__(self):
		self.content_part=self.content[0:100]
		return u"%s : %s ..." % (self.title, self.content_part)

	title = models.CharField(max_length=256,
		blank=False,
		verbose_name=u"Название")

	image = models.ImageField(
		blank=True,
		verbose_name=u"Фото",
		null=True)

	content = models.TextField(blank=True,
		verbose_name=u"Описание")

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
		return u"%s..." % (self.title)

	user_login = models.CharField(max_length=256,
		blank=False,
		verbose_name=u"Id")

	followers = models.ManyToManyField('self',  null=True)
	follow = models.ManyToManyField('self',  null=True)
	followers_count = models.CharField(max_length=256,
									   blank=False,
									   verbose_name=u"Id")
	follow_count = models.CharField(max_length=256,
									   blank=False,
									   verbose_name=u"Id")

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

	#likes = models.ManyToManyField(Insta_user)

	images_tags =  models.ManyToManyField(Insta_tag)







	

	

	