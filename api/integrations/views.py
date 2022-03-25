from django.shortcuts import render
from django.db.models import Q

from datetime import datetime, timedelta
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
    Integration,
    HeadCounter
)

from showings.models import ShowBooking

from .serializers import (
    IntegrationSerializer,
    HeadCounterSerializer
)


def change_str_to_date_plus8(day, month, year, time):

    month_ms = ['JANUARI', 'FEBRUARI', 'MAC', 'APRIL', 'MEI', 'JUN',
                'JULAI', 'OGOS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DISEMBER']
    day_ms = ['ISNIN', 'SELASA', 'RABU', 'KHAMIS', 'JUMAAT', 'SABTU', 'AHAD']

    date_str = day+'/'+month+'/'+year+' '+time
    format_str = '%d/%m/%Y %H:%M:%S'
    datetime_obj = datetime.strptime(date_str, format_str)

    hours = 8
    hours_added = timedelta(hours=hours)
    plus8_datetime = datetime_obj + hours_added

    return plus8_datetime


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
            fullurl = "s=" + s + "&g=" + g + "&sd=" + sd + "&sm=" + \
                sm + "&sy=" + sy + "&ed=" + ed + "&em=" + em + "&ey=" + ey

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

        print('post_head_counter_value')
        with open("integrations/head_counter_json.txt", mode="a", encoding="utf-8") as myfile:
            json_string = request.data
            utc_datetime = json_string['Source']['UtcTime']
            day = utc_datetime[8:10]
            month = utc_datetime[5:7]
            year = utc_datetime[0:4]
            time = utc_datetime[11:19]
            plus8_time = change_str_to_date_plus8(day, month, year, time)
            # to restrict only the data within 8 AM to 6 PM
            if (plus8_time.hour >= 8 and plus8_time.hour <= 18):
                myfile.write(str(json_string)+"\n")
            myfile.close()

        return Response(request.data)

    @action(methods=['GET'], detail=False)
    def get_head_counter_value(self, request):

        print('get_head_counter_value')
        with open("integrations/head_counter_json.txt", mode="r", encoding="utf-8") as myfile:
            mylist = myfile.read().splitlines()
            total_in = 0
            total_out = 0
            for line in mylist:
                json_line = json.loads(line.replace("\'", "\""))
                count_in = json_line['Data'][0]['CountingInfo'][0]['In']
                count_out = json_line['Data'][0]['CountingInfo'][0]['Out']
                total_in = total_in + count_in
                total_out = total_out + count_out

            data = {
                'total_in': total_in,
                'total_out': total_out
            }

            myfile.close()

        return Response(data)
    
    @action(methods=['POST'], detail=False)
    def get_flap_barrier_qr_code(self, request):
        
        print('get_flap_barrier_qr_code')
        data = json.loads(request.body)
        qr_code = data['QR_data']
        
        # QR code format = PLN<current_year>|<ticket_number>|<showtime_id>|<show_id>|<user_id>
        """
        QR code array
        [0]: PLN<current_year
        [1]: <ticket_number>
        [2]: <showtime_id>
        [3]: <show_id>
        [4]: <user_id>
        """
        
        # Get current date based on timezone
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        current_date = datetime.now(timezone_).strftime("%Y-%m-%d")
        
        qr_code_array = qr_code.split('|')
        queryset = ShowBooking.objects.filter(showtime_id__show_date=current_date, ticket_number=qr_code_array[1], showtime_id=qr_code_array[2], show_id=qr_code_array[3], user_id=qr_code_array[4], status='SB05').values('id')
        
        if queryset.count() > 0:
            # To update the status of QR code authentication
            queryset_save = ShowBooking.objects.get(id=queryset[0]['id'])
            queryset_save.status = 'SB08'
            queryset_save.save()
            
            # If QR code is valid
            data = {
                "authenticated": True,
                "ip_address": "http://192.168.1.80:5000/on",
                "message": "ON"
            }
        else:
            # If QR code is invalid
            data = {
                "authenticated": False,
                "ip_address": "http://192.168.1.80:5000/off",
                "message": "OFF"
            }
        
        return Response(data)


class HeadCounterViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = HeadCounter.objects.all()
    serializer_class = HeadCounterSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = HeadCounter.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def get_analytic_total_head_counter(self, request):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']

        queryset = HeadCounter.objects.filter(date__range=(start_date, end_date)).values(
            'total_in', 'total_out', 'total_stay', 'date').order_by('date')

        return Response(queryset)
