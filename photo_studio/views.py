#-*-coding=utf-8-*-
import os,sys,json
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.template.loader import get_template
from django.core.files.base import ContentFile
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.gzip import gzip_page
from decorators import jsonapi
from models.models import *



@gzip_page
def index(request,access_key):
    if not access_key:
        return HttpResponse('链接不存在',content_type='text/html; charset=UTF-8')

    order_object = Order.objects.filter(access_path=access_key)
    if not order_object:
        return HttpResponse('订单不存在',content_type='text/html; charset=UTF-8')
    unique_id = order_object[0].unique_id
    product_list = Product.objects.filter(unique_id=unique_id)
    temp_photo_list = Photo.objects.filter(unique_id=unique_id)
    photo_list = []
    for temp_photo in temp_photo_list:
        photo_name = '%s-%s' % (temp_photo.scene_name,temp_photo.name) if temp_photo.scene_name else temp_photo.name
        photo_list.append({'name':photo_name,'url':'/%s' % temp_photo.image.name,'id':temp_photo.id})
    data = locals()
    data['product_list'] = product_list
    data['unique_id'] = unique_id
    data['photo_list'] = photo_list
    print data
    template = get_template('detail.html')
    variables = RequestContext(request,data)
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


@csrf_exempt
@jsonapi()
def push_order(request):
    pass

@csrf_exempt
@jsonapi()
def push_product(request):
    pass
