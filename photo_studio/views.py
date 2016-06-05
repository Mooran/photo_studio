#-*-coding=utf-8-*-
import os,sys,json
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.template.loader import get_template
from django.core.files.base import ContentFile
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from decorators import jsonapi
from models.models import *


def index(request):
    template = get_template('detail.html')
    variables = RequestContext(request,{})
    output = template.render(variables)
    return HttpResponse(output, content_type='text/html; charset=UTF-8')


@csrf_exempt
@jsonapi()
def pick_photo(request):
    unique_id = request.POST.get('unique_id')
    product_photo_list = request.POST.get('product_photo_list')
    product_photo_list = json.loads(product_photo_list)
    print product_photo_list,type(product_photo_list)
    pick_photo = PhotoPick.objects.filter(unique_id=unique_id)
    if pick_photo:
        pick_photo.delete()
    create_obj_list = []
    for product_photo in product_photo_list:
        product_id = product_photo.get('product_id')
        photo_id = product_photo.get('photo_id')
        create_obj_list.append(PhotoPick(unique_id=unique_id,product_id=product_id,photo_id=photo_id))
    PhotoPick.objects.bulk_create(create_obj_list)
    return '保存成功'


@csrf_exempt
def upload(request):
    img_file = request.FILES['img']
    name = request.POST.get('img_name')
    scene_name = request.POST.get('scene_name')
    unique_id = request.POST.get('unique_id')
    file_obj = Photo(unique_id=unique_id,image=img_file,name=name,scene_name=scene_name)
    file_obj.save()
    return HttpResponse('ok')
