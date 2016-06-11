#-*-coding=utf-8-*-
import os,sys,json,hashlib,time
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
    pick_photo = PhotoPick.objects.filter(unique_id=unique_id)
    if pick_photo:
        pick_photo.delete()
    create_obj_list = []
    print product_photo_list
    for product_photo in product_photo_list:
        product_id = product_photo.get('product_id')
        for photo_id in product_photo['photo_list']:
            create_obj_list.append(PhotoPick(unique_id=unique_id,product_id=product_id,photo_id=photo_id))
    PhotoPick.objects.bulk_create(create_obj_list)
    return '保存成功'


@csrf_exempt
@jsonapi()
def upload(request):
    img_file = request.FILES['img']
    name = request.POST.get('img_name')
    scene_name = request.POST.get('scene_name')
    unique_id = request.POST.get('unique_id')
    existed_photo = Photo.objects.filter(unique_id=unique_id,name=name,scene_name=scene_name)
    if not existed_photo:
        file_obj = Photo(unique_id=unique_id,image=img_file,name=name,scene_name=scene_name)
    else:
        file_obj = existed_photo[0]
        file_obj.image = img_file
    file_obj.save()
    return '上传成功'


@csrf_exempt
@jsonapi()
def push_order(request):
    unique_id = request.POST.get('unique_id','')
    if not unique_id:
        raise ValueError,"缺少唯一标识"
    order_num = request.POST.get('order_num')
    if not order_num:
        raise ValueError,"缺少订单编号"
    customer_name = request.POST.get('customer_name','')
    customer_phone = request.POST.get('customer_phone','')
    studio_name = request.POST.get('studio_name','')
    studio_phone = request.POST.get('studio_phone','')
    scene_name = request.POST.get('scene_name','')
    pre_path_str = '%s%s' % (unique_id,int(time.time()))
    access_path = hashlib.md5(pre_path_str).hexdigest()
    Order(unique_id=unique_id,order_num=order_num,customer_name=customer_name,customer_phone=customer_phone,studio_name=studio_name,studio_phone=studio_phone,scene_name=scene_name,access_path=access_path).save()
    return '/index/%s' % access_path


@csrf_exempt
@jsonapi()
def push_product(request):
    unique_id = request.POST.get('unique_id','')
    if not unique_id:
        raise ValueError,"缺少唯一标识"

    product_list = request.POST.get('product_list','')
    if not product_list:
        raise ValueError,"缺少商品信息"
    try:
        product_list = json.loads(product_list)
    except:
        raise ValueError,"商品信息参数格式错误"

    create_obj_list = []
    for product in product_list:
        product_id = product.get('product_id','')
        if not product_id:
            raise ValueError,"缺少商品id"
        name = product.get('name','')
        if not name:
            raise ValueError,"缺少商品名称"
        num = product.get('num',0)
        if not num:
            raise ValueError,"缺少商品数量" 
        unit_price = product.get('unit_price',0)
        create_obj_list.append(Product(unique_id=unique_id,product_id=product_id,name=name,num=num,unit_price=unit_price))

    Product.objects.bulk_create(create_obj_list)
    return '商品信息上传成功'

@csrf_exempt
@jsonapi()
def get_customer_pick(request):
    access_path = request.POST.get('access_path','')
    if not access_path:
        raise ValueError,"缺少链接信息"
    access_path = access_path[access_path.rindex('/')+1:]
    order_object = Order.objects.filter(access_path=access_path)
    if not order_object:
        raise ValueError,"未找到订单信息"
    order_object = order_object[0]
    unique_id = order_object.unique_id
    pick_info_list = PhotoPick.objects.select_related().filter(unique_id=unique_id)
    result = []
    product_photo_dict = dict()
    for pick_info in pick_info_list:
        product_id = pick_info.product.product_id
        if product_id not in product_photo_dict:
            product_photo_dict[product_id] = {'photo_list':[],'name':pick_info.product.name,'num':pick_info.product.num}
        photo_name = '%s-%s' % (pick_info.photo.scene_name,pick_info.photo.name) if pick_info.photo.scene_name else pick_info.photo.name
        product_photo_dict[product_id]['photo_list'].append(photo_name)
        
    for product_id in product_photo_dict:
        temp_dict = {'product_id':product_id,
                     'name':product_photo_dict[product_id]['name'],
                     'num':product_photo_dict[product_id]['num'],
                     'photo_list':'|'.join(product_photo_dict[product_id]['photo_list'])
                    }
        result.append(temp_dict)
    return result
