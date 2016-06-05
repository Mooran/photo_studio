#-*-coding=utf-8-*-
import os,sys
from django.db import models


class Order(models.Model):

    class Meta:
        db_table = 'order'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64,unique=True)
    order_num = models.CharField(max_length=64)
    customer_name = models.CharField(max_length=32)
    customer_phone = models.CharField(max_length=32)
    studio_name = models.CharField(max_length=64)
    studio_phone = models.CharField(max_length=32)
    scene_name = models.CharField(max_length=64)



class Product(models.Model):

    class Meta:
        db_table = 'product'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    product_id = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    num = models.IntegerField(default=1)
    unit_price = models.FloatField(default=0)

class Photo(models.Model):

    class Meta:
        db_table = 'photo'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    image = models.ImageField(upload_to='photo')
    name = models.CharField(max_length=64)
    scene_name = models.CharField(max_length=64)


class PhotoPick(models.Model):

    class Meta:
        db_table = 'photo_pick'

    id = models.AutoField(primary_key=True)
    unique_id = models.CharField(max_length=64)
    product = models.ForeignKey(Product)
    photo = models.ForeignKey(Photo)
    pick_num = models.IntegerField(default=1)
