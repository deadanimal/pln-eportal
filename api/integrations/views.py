from django.shortcuts import render
from django.db.models import Q

from datetime import datetime
import hashlib
import json
import requests
import pytz

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Integration
)

from .serializers import (
    IntegrationSerializer
)

class IntegrationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Integration.objects.all()
    serializer_class = IntegrationSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Integration.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def verify_recaptcha(self, request):

        print('verify_recaptcha')
        data = json.loads(request.body)
        response = data['response']
        secret = data['secret']

        captcha_verify_url = "https://www.google.com/recaptcha/api/siteverify"

        response = requests.post(captcha_verify_url, data=[
                                 ('secret', secret), ('response', response)])

        return Response(response.json())

    @action(methods=['GET'], detail=False)
    def get_statcounter(self, request):

        print('get_statcounter')
        url = 'http://api.statcounter.com/stats/'
        username = 'pipedevops'  # 'demo_user'
        password = 'pipeDev21@'  # 'statcounter'
        projectid = '12489369'  # '2292634'

        s = request.query_params.get('s', None)
        g = request.query_params.get('g', None)
        sd = request.query_params.get('sd', None)
        sm = request.query_params.get('sm', None)
        sy = request.query_params.get('sy', None)
        ed = request.query_params.get('ed', None)
        em = request.query_params.get('em', None)
        ey = request.query_params.get('ey', None)

        # Summary Stats - Daily
        # http://api.statcounter.com/stats/?vn=VERSION_NUMBER&s=summary&g=GRANULARITY&sd=START_DAY&sm=START_MONTH&sy=START_YEAR&ed=END_DAY&em=END_MONTH&ey=END_YEAR&pi=PROJECT_ID&t=TIME_OF_EXECUTION&u=USERNAME&f=FORMAT&sha1=SHA-1_TO_PROVE_IDENTITY

        if (sd is not None and sm is not None and sy is not None and ed is not None and em is not None and ey is not None):
            fullurl = "s=" + s + "&g=" + g + "&sd=" + sd + "&sm=" + sm + "&sy=" + sy + "&ed=" + ed + "&em=" + em + "&ey=" + ey

        # Summary Stats - Yearly
        # http://api.statcounter.com/stats/?vn=VERSION_NUMBER&s=summary&g=GRANULARITY&sy=START_YEAR&ey=END_YEAR&pi=PROJECT_ID&t=TIME_OF_EXECUTION&u=USERNAME&f=FORMAT&sha1=SHA-1_TO_PROVE_IDENTITY

        if (sd is None and sm is None and sy is not None and ed is None and em is None and ey is not None):
            fullurl = "s=" + s + "&g=" + g + "&sy=" + sy + "&ey=" + ey

        # current date and time
        now = datetime.now(pytz.timezone("Asia/Kuala_Lumpur"))
        current_unixtimestamp = str(int(datetime.timestamp(now)))

        # format for authorization
        # vn = version
        # format = json or xml
        # pi = project id
        # n = number of results
        # t = Unix timestamp
        # u = usernamepassword
        # example : '?vn=3&s=visitor&f=json&pi=1234567&n=10&t=1329142078&u=myusernamemypassword'
        request_url = '?vn=3&'+fullurl+'&f=json&pi='+projectid + \
            '&t='+current_unixtimestamp+'&u='+username
        before_sha1 = '?vn=3&'+fullurl+'&f=json&pi='+projectid + \
            '&t='+current_unixtimestamp+'&u='+username+password

        after_sha1 = hashlib.sha1(before_sha1.encode())

        response = requests.post(
            url+request_url+'&sha1='+after_sha1.hexdigest())

        return Response(response.json())

    @action(methods=['POST'], detail=False)
    def post_head_counter_value(self, request):

        with open("integrations/head_counter_json.txt", mode="a", encoding="utf-8") as myfile:
            json_string = request.data
            myfile.write(str(json_string)+"\n")
            myfile.close()

        return Response(request.data)
