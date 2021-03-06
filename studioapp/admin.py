from django.contrib import admin
from .models import InstaUser
from .models import InstaBotTask
from .models import Task_to_user_map
from .models import Relationship
from .models import InstaMedia
from .models import InstaMediaSRC
from .models import InstaShopItem
from .models import TaskTarget
from .models import Order
from .models import OrderItem

# Register your models here.
admin.site.register(InstaUser)
admin.site.register(InstaBotTask)
admin.site.register(Task_to_user_map)
admin.site.register(Relationship)
admin.site.register(InstaMedia)
admin.site.register(InstaMediaSRC)
admin.site.register(InstaShopItem)
admin.site.register(TaskTarget)
admin.site.register(Order)
admin.site.register(OrderItem)