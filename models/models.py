#-*-coding=utf-8-*-
import os,sys
from django.db import models




def save_photo(instance,file_name):
    if instance.scene_name:
        return 'photo/%s/%s/%s' % (str(instance.unique_id),str(instance.scene_name),str(instance.name))
    return 'photo/%s/%s' % (str(instance.unique_id),str(instance.name))


class Order(models.Model):

    class Meta:
        db_table = 'order'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64,unique=True)
    order_num = models.CharField(max_length=64,blank=True)
    customer_name = models.CharField(max_length=32,blank=True)
    customer_phone = models.CharField(max_length=32,blank=True)
    studio_name = models.CharField(max_length=64,blank=True)
    studio_phone = models.CharField(max_length=32,blank=True)
    scene_name = models.CharField(max_length=64,blank=True)
    access_path = models.CharField(max_length=64,blank=True)
    modify_note = models.CharField(max_length=1024,blank=True,null=True,default='')



class Product(models.Model):

    class Meta:
        db_table = 'product'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    product_id = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    num = models.IntegerField(default=1)
    unit_price = models.FloatField(default=0,blank=True)

class Photo(models.Model):

    class Meta:
        db_table = 'photo'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    image = models.ImageField(upload_to=save_photo)
    # image = models.ImageField(upload_to='photo')
    name = models.CharField(max_length=64)
    scene_name = models.CharField(max_length=64,blank=True,null=True)


class PhotoPick(models.Model):

    class Meta:
        db_table = 'photo_pick'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    product = models.ForeignKey(Product)
    photo = models.ForeignKey(Photo)
    pick_num = models.IntegerField(default=1)
    last_modify_time = models.DateTimeField()


class SamplePick(models.Model):

    class Meta:
        db_table = 'sample_pick'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    photo = models.ForeignKey(Photo)
    modify = models.IntegerField(default=1)
    modify_note = models.CharField(max_length=1024,blank=True,null=True,default='')
    last_modify_time = models.DateTimeField(auto_now_add=True)



