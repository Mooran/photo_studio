#-*-coding=utf-8-*-
import os,sys
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext
from django.template.loader import get_template
from django.conf import settings


def index(request):
    print settings.STATIC_ROOT
    template = get_template('demo.html')
    variables = RequestContext(request,{'static_dir':settings.STATIC_ROOT})
    output = template.render(variables)
    return HttpResponse(output, content_type='text/html; charset=UTF-8')


def detail(request):
    template = get_template('detail.html')
    variables = RequestContext(request,{})
    output = template.render(variables)
    return HttpResponse(output, content_type='text/html; charset=UTF-8')