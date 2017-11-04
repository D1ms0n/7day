from rest_framework import serializers
from studioapp.models import Insta_user
from studioapp.models import Insta_bot_task

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


class InstaBotTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insta_bot_task
        fields = ('task_id',
                  'operation',
                  'username',
                  'create_time',
                  'args',
                  'status')
