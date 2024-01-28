from django.shortcuts import render
from .models import Project
from django.http import JsonResponse, HttpResponse, FileResponse, HttpResponseNotFound
from django.conf import settings

def project_detail(request, slug, id):
    project = Project.objects.get(slug=slug, id=id)

    rooms = project.rooms.all()

    data = {
         'id': project.id,
         'name': project.name,
         'rooms': [{'id': room.id,'name': room.name, 'photo_file': settings.HOST_NAME+room.get_image_absolute_url(), 'model_file': settings.HOST_NAME+room.get_3d_model_absolute_url()} for room in rooms]
    }
    
    return JsonResponse(data, json_dumps_params={'ensure_ascii': False})

def get_image(request, name):
    file_path = str(settings.BASE_DIR) + f'/files/images/{name}'
    try:    
        with open(file_path, 'rb') as f:
           file_data = f.read()

        response = HttpResponse(file_data, content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = f'attachment; filename="{name}"'

    except IOError:
        response = HttpResponseNotFound('<h1>File not exist</h1>')
    return response


def get_3d_model(request, name):
    file_path = str(settings.BASE_DIR) + f'/files/3d_models/{name}'
    try:    
        with open(file_path, 'rb') as f:
           file_data = f.read()

        response = HttpResponse(file_data, content_type='application/vnd.ms-excel')
        response['Content-Disposition'] = f'attachment; filename="{name}"'

    except IOError:
        response = HttpResponseNotFound('<h1>File not exist</h1>')
    return response
