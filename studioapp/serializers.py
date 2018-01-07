import time

from rest_framework import serializers
from studioapp.models import Insta_user
from studioapp.models import Insta_bot_task
from studioapp.models import TaskArg
from studioapp.models import InstaMedia

from logger import Logger
logger = Logger('view')


class InstaUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insta_user
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


class TaskArgSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskArg
        fields = ('user_name',
                  'tag_name',
                  'photo_id')

class InstaBotTaskSerializer(serializers.ModelSerializer):

    #args = TaskArgSerializer(many = True)

    class Meta:
        model = Insta_bot_task
        fields = ('task_id',
                  'operation',
                  'username',
                  'create_time',
                  'status',
                  'args')

    #def create(self, validated_data):
    #    arg_data = validated_data.pop('args')
    #    task = Insta_bot_task.objects.create(**validated_data)

    #    for arg in arg_data:
    #        TaskArg.objects.create(task_id=task,**arg)
    #    return task


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