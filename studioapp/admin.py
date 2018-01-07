from django.contrib import admin
from .models import Insta_user
from .models import Insta_bot_task
from .models import Task_to_user_map
from .models import Relationship
from .models import InstaMedia
from .models import TaskArg

# Register your models here.
admin.site.register(Insta_user)
admin.site.register(Insta_bot_task)
admin.site.register(Task_to_user_map)
admin.site.register(Relationship)
admin.site.register(InstaMedia)
admin.site.register(TaskArg)