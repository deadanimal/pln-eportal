from django.shortcuts import render
from django.conf import settings
from django.db.models import Q
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.template.loader import get_template, render_to_string

from datetime import datetime
from itertools import chain
from uuid import UUID
from weasyprint import default_url_fetcher, HTML, CSS
import tempfile
import json
import pytz

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from simulatorrides.models import (
    SimulatorRide,
    SimulatorRideTime,
    SimulatorRideBooking
)

from carts.models import (
    Cart
)

from invoicereceipts.models import (
    InvoiceReceipt
)

from simulatorrides.serializers import (
    SimulatorRideSerializer,
    SimulatorRideTimeSerializer,
    SimulatorRideTimeExtendedSerializer,
    SimulatorRideBookingSerializer,
    SimulatorRideBookingExtendedSerializer,
)


timezone_ = pytz.timezone('Asia/Kuala_Lumpur')

def get_ticket_category(ticket_type, ticket_category):

    if ticket_type == 'CZ':
        tickettype = 'MyKAD'
    elif ticket_type == 'NC':
        tickettype = 'Bukan Warganegara'

    if ticket_category == 'AD':
        ticketcategory = 'Dewasa'
    elif ticket_category == 'KD':
        ticketcategory = 'Kanak-kanak'
    elif ticket_category == 'OF':
        ticketcategory = 'Warga emas'
    elif ticket_category == 'SD':
        ticketcategory = 'Pelajar'
    elif ticket_category == 'OK':
        ticketcategory = 'OKU'

    if ticket_type is not None:
        return tickettype
    elif ticket_category is not None:
        return ticketcategory


class SimulatorRideViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SimulatorRide.objects.all()
    serializer_class = SimulatorRideSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['title', 'description', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = SimulatorRide.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = SimulatorRide.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset2 = SimulatorRideTime.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset3 = SimulatorRideBooking.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Kembara simulasi'
        for qs in queryset2:
            qs['history_model_name'] = 'Masa kembara simulasi'
        for qs in queryset3:
            qs['history_model_name'] = 'Tempahan kembara simulasi'
        return Response(chain(queryset1, queryset2, queryset3))


class SimulatorRideTimeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SimulatorRideTime.objects.all()
    serializer_class = SimulatorRideTimeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['day', 'time', 'round', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = SimulatorRideTime.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = SimulatorRideTime.objects.all()
        serializer_class = SimulatorRideTimeExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_timetable(self, request, *args, **kwargs):

        # To get today day
        days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        current_weekday = datetime.now(timezone_).weekday()

        # To get today timetable
        queryset = SimulatorRideTime.objects.filter(day=days[current_weekday]).order_by('time', 'round')

        array = []
        for data in queryset:

            queryset_booking = SimulatorRideBooking.objects.filter(simulator_ride_time_id=data.id, booking_date=datetime.today().strftime('%Y-%m-%d')).count()

            array.append({
                'date': datetime.now(timezone_).strftime("%Y-%m-%d"),
                'time': data.time,
                'day': data.get_day_display(),
                'round': data.get_round_display(),
                'booking': queryset_booking,
                'status': data.simulator_time_status
            })

        return Response(array)


class SimulatorRideBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SimulatorRideBooking.objects.all()
    serializer_class = SimulatorRideBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['simulator_ride_time_id', 'booking_date',
                        'ticket_type', 'ticket_category', 'ticket_free', 'user_id', 'status']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = SimulatorRideBooking.objects.all()
        return queryset

    def create(self, request):
        is_many = isinstance(request.data, list)

        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = SimulatorRideBooking.objects.all()
        simulator_ride_time_id = request.query_params.get(
            'simulator_ride_time_id', None)
        user_id = request.query_params.get('user_id', None)
        status = request.query_params.get('status', None)
        if simulator_ride_time_id is not None:
            queryset = queryset.filter(
                simulator_ride_time_id=simulator_ride_time_id)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        if status is not None:
            queryset = queryset.filter(status=status)

        serializer_class = SimulatorRideBookingExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def generate_ticket(self, request):

        # Model data
        simulator_ride_booking_id = request.query_params.get('id', None)

        queryset = SimulatorRideBooking.objects.all()
        if simulator_ride_booking_id is not None:
            queryset = queryset.filter(id=simulator_ride_booking_id)

        serializer_class = SimulatorRideBookingExtendedSerializer(
            queryset, many=True)

        items = serializer_class.data[0].items()

        # missing no tiket
        ticket_info = {}
        # to find invoice-receipt detail based on booking_id
        cart = Cart.objects.filter(
            simulator_ride_booking_id__id=simulator_ride_booking_id).values('id')
        invoicereceipt = InvoiceReceipt.objects.filter(
            cart_id__id=cart[0]['id']).values()

        if invoicereceipt:
            ticket_info['ticket_transaction_date'] = invoicereceipt[0]['payment_successful_datetime'].strftime(
                "%Y-%m-%d %H:%M")
            ticket_info['ticket_transaction_type'] = 'FPX'

        for key, value in items:
            # print(key, '=>', value)
            if key == 'ticket_number':
                ticket_info['ticket_number'] = value
            if key == 'booking_date':
                ticket_info['ticket_date'] = value
            if key == 'ticket_type':
                ticket_info['ticket_type'] = get_ticket_category(value, None)
            if key == 'ticket_category':
                ticket_info['ticket_category'] = get_ticket_category(
                    None, value)
            if key == 'price':
                ticket_info['ticket_price'] = value

            if key == 'simulator_ride_time_id':
                for key_simulator_ride_time, value_simulator_ride_time in value.items():
                    if key_simulator_ride_time == 'time':
                        ticket_info['ticket_time'] = value_simulator_ride_time

        # Rendered
        html_string = render_to_string(
            'ticket/simulator_ride_ticket.html', {'ticket_info': ticket_info})
        html = HTML(string=html_string, base_url=request.build_absolute_uri())
        result = html.write_pdf(
            stylesheets=[CSS(settings.STATIC_ROOT + '/css/bootstrap.css')])

        # Creating http response
        filename = 'Tiket_Planetarium_Negara.pdf'
        response = HttpResponse(result, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="'+filename+'"'
        response['Content-Transfer-Encoding'] = 'binary'
        # with tempfile.NamedTemporaryFile(delete=True) as output:
        #     output.write(result)
        #     output.flush()
        #     output = open(output.name, 'rb')
        #     response.write(output.read())

        return response

    @action(methods=['GET'], detail=False)
    def get_dashboard(self, request):

        queryset_simulator_ride = SimulatorRideBooking.objects.filter(
            booking_date=datetime.today()).values()

        data = {
            'queryset_simulator_ride': queryset_simulator_ride
        }

        return Response(data)

    @action(methods=['GET'], detail=False)
    def auto_change_status(self, request):
        print("initiate cron sim")
        days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        current_weekday = datetime.now(timezone_).weekday()
        queryset = SimulatorRideTime.objects.filter(day=days[current_weekday]).order_by('time', 'round')

        for data in queryset:

            queryset_booking = SimulatorRideBooking.objects.filter(simulator_ride_time_id=data.id, booking_date=datetime.today().strftime('%Y-%m-%d')).count()
            if queryset_booking == 2:
                simulator_ride = SimulatorRideTime.objects.get(id=data.id)
                simulator_ride.simulator_time_status = "Penuh"
                simulator_ride.save()


            current_time = datetime.now(timezone_)
            slot_time = datetime.now(timezone_).replace(hour=int(data.time.hour), minute=int(data.time.minute)) 
            time_elapsed_second = datetime.timestamp(current_time) - datetime.timestamp(slot_time)

            if time_elapsed_second >= 10*60:
                simulator_ride = SimulatorRideTime.objects.get(id=data.id)
                simulator_ride.simulator_time_status = "Tamat"
                simulator_ride.save()



        return Response({})
