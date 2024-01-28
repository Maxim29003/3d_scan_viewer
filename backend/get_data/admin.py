from django.contrib import admin
from .models import Project, Room

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'copy_link')
    prepopulated_fields = {'slug': ('name', )}


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    pass