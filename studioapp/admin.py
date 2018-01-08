from django.contrib import admin
from .models import InstaUser
from .models import InstaBotTask
from .models import Task_to_user_map
from .models import Relationship
from .models import InstaMedia
from .models import TaskTarget

# Register your models here.
admin.site.register(InstaUser)
admin.site.register(InstaBotTask)
admin.site.register(Task_to_user_map)
admin.site.register(Relationship)
admin.site.register(InstaMedia)
admin.site.register(TaskTarget)