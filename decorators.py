# -*- coding: utf-8 -*-
import json,time
from django.conf import settings
from django.http import HttpResponse

__author__ = 'allen.zhang'

def jsonapi():
    def _wrapper(_func):
        def _new_func(request,*args,**kwargs):
            r = {'status':0,'msg':'成功'}
            status = 0
            start_time = time.time()
            try:
                data = _func(request)
                r['data'] = data
            except Exception, e:
                r.update({'status':1,'msg':'失败','data':e})
            end_time = time.time()
            return HttpResponse(json.dumps(r), mimetype="application/json")
        return _new_func
    return _wrapper