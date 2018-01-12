import time

from rest_framework import serializers
from studioapp.models import InstaUser
from studioapp.models import InstaBotTask
from studioapp.models import TaskTarget
from studioapp.models import InstaMedia
from .models import InstaShopItem

from logger import Logger
logger = Logger('view')


class InstaUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstaUser
        fields = ('user_id',
                  'user_name',
                  'user_full_name',
                  'followers_count',
                  'follow_count',
                  'profile_pic_url_hd',
                  'user_biography',
                  'user_external_url',
                  'follows_viewer',
                  'followed_by_viewer',
                  'has_requested_viewer',
                  'requested_by_viewer',
                  'has_blocked_viewer',
                  'blocked_by_viewer',
                  'is_private')


class TaskTargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskTarget
        fields = ('user_name',
                  'tag_name',
                  'photo_id')

class InstaBotTaskSerializer(serializers.ModelSerializer):

    targets = TaskTargetSerializer(many = True)

    class Meta:
        model = InstaBotTask
        fields = ('task_id',
                  'operation',
                  'username',
                  'create_time',
                  'status',
                  'count',
                  'targets',
                  )

    def create(self, validated_data):
        targets = validated_data.pop('targets')
        task = InstaBotTask.objects.create(**validated_data)

        for target in targets:
            TaskTarget.objects.create(task_id=task,**target)
        return task


class InstaMediaSerializer(serializers.ModelSerializer):
    image_author = InstaUserSerializer()

    class Meta:
        model = InstaMedia
        fields = ('image_id',
                  'display_src',
                  'caption',
                  'image_author',
                  'images_likes_count',
                  'code')

class InstaShopItemSerializer(serializers.ModelSerializer):
    media = InstaMediaSerializer()

    class Meta:
        model = InstaShopItem
        fields = ('media',
                  'price',
                  'description',
                  'category')