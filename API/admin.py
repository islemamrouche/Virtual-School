from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from rest_framework_simplejwt.token_blacklist import models
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin


class NewOutstandingTokenAdmin(OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True


admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)

class AccountAdmin(UserAdmin):
  list_display=('username', 'email', 'is_admin', 'is_staff')
  search_fields=('email', 'username')
  readonly_fields=('id',)

  filter_horizontal=()
  list_filter=()
  fieldsets=()
admin.site.register(Account, AccountAdmin)


  

admin.site.register(prof)
admin.site.register(module)
admin.site.register(event)
admin.site.register(category)
admin.site.register(level)
admin.site.register(student)
admin.site.register(Email)
admin.site.register(Group)
admin.site.register(payment)
admin.site.register(Home_Slideshow)
admin.site.register(English_Slideshow)
admin.site.register(Services_Slideshow)
admin.site.register(Training_Slideshow)
admin.site.register(English_Cards)
admin.site.register(Services_Cards)
admin.site.register(Training_Cards)
admin.site.register(Tag)
admin.site.register(Lesson)
admin.site.register(Unit)

admin.site.register(Post)

admin.site.site_header = "E-MAS Learning Administration"
admin.site.site_title = "E-MAS Learning Administration"