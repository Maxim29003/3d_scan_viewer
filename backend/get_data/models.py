from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from django.utils.html import format_html
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_delete
import os


class Project(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название проекта')
    slug = models.SlugField(unique=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Project, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('get_data:project_detail', args=[self.slug, self.id])

    def copy_link(self):
        url = self.get_absolute_url()
        url = settings.HOST_NAME + url
        return format_html('<button onclick="navigator.clipboard.writeText(\'{}\')">Копировать ссылку</button>', url)
    copy_link.short_description = 'Скопировать ссылку'

    def str(self):
        return self.name

class Room(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='rooms', verbose_name='Проект')
    name = models.CharField(max_length=255, verbose_name='Название комнаты')
    photo_file = models.ImageField(upload_to='files/images', verbose_name='Фото плана проекта')
    model_file = models.FileField(upload_to='files/3d_models', verbose_name='Файл с моделью')

    def get_image_absolute_url(self):
        path = self.photo_file.name
        filename = os.path.basename(path)
        return reverse('get_data:get_image', args=[filename])

    def get_3d_model_absolute_url(self):
        path = self.model_file.name
        filename = os.path.basename(path)
        return reverse('get_data:get_3d_model', args=[filename])

    def __str__(self):
        return self.name
    
@receiver(post_delete, sender=Room)
def delete_files(sender, instance, **kwargs):
    # Удаляем фото
    if instance.photo_file:
        photo_file_path = instance.photo_file.path
        if os.path.exists(photo_file_path):
            os.remove(photo_file_path)

    # Удаляем файл с моделью
    if instance.model_file:
        model_file_path = instance.model_file.path
        if os.path.exists(model_file_path):
            os.remove(model_file_path)