import time

from rest_framework import serializers
from studioapp.models import *


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

class _short_InstaUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstaUser
        fields = ('user_id',
                  'user_name',
                  'profile_pic_url_hd')


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


class InstaMediaSRCSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstaMediaSRC
        fields = ('media_src',)

class InstaMediaSerializer(serializers.ModelSerializer):
    image_author = _short_InstaUserSerializer()
    srcs         = InstaMediaSRCSerializer(many = True)

    class Meta:
        model = InstaMedia
        fields = ('image_id',
                  'srcs',
                  'caption',
                  'image_author',
                  'likes_count',
                  'code')


class _short_InstaMediaSerializer(serializers.ModelSerializer):
    srcs         = InstaMediaSRCSerializer(many = True)

    class Meta:
        model = InstaMedia
        fields = ('srcs',
                  'likes_count')

class InstaShopItemSerializer(serializers.ModelSerializer):
    media = _short_InstaMediaSerializer()

    class Meta:
        model = InstaShopItem
        fields = ('id',
                  'name',
                  'media',
                  'price',
                  'description',
                  'category')

class _OrderItemSerializer(serializers.ModelSerializer):
    shop_item = InstaShopItemSerializer()

    class Meta:
        model = OrderItem
        fields = ('shop_item',
                  'count')



class OrderSerializer(serializers.ModelSerializer):
    items =_OrderItemSerializer(many = True, required = False)
    class Meta:
        model = Order
        fields = ('id',
                  'name',
                  'mail',
                  'phone',
                  'address',
                  'comment',
                  'items')

#class OrderItemSerializer(serializers.ModelSerializer):
#    order = OrderSerializer()
#    shop_item = InstaShopItemSerializer()

#    class Meta:
#        model = OrderItem
#        fields = ('order',
#                  'shop_item',
#                  'count')