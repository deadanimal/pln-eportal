from django.shortcuts import render
from django.conf import settings
from django.db.models import Q
from django.forms.models import model_to_dict
from django.http import HttpResponse
from django.template.loader import get_template, render_to_string

from datetime import datetime
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

from .models import (
    Showing,
    Showtime,
    ShowTicket,
    ShowBooking
)

from carts.models import (
    Cart
)

from invoicereceipts.models import (
    InvoiceReceipt
)

from .serializers import (
    ShowingSerializer,
    ShowtimeSerializer,
    ShowtimeExtendedSerializer,
    ShowTicketSerializer,
    ShowTicketExtendedSerializer,
    ShowBookingSerializer,
    ShowBookingExtendedSerializer,
)


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


class ShowingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Showing.objects.all()
    serializer_class = ShowingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'genre', 'language',
                        'duration_hours', 'status', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Showing.objects.all()
        return queryset


class ShowtimeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Showtime.objects.all()
    serializer_class = ShowtimeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'showing_id',
                        'venue_id', 'created_date', 'show_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Showtime.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Showtime.objects.all()
        serializer_class = ShowtimeExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)

    
class ShowTicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ShowTicket.objects.all()
    serializer_class = ShowTicketSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'no_ticket',
        'ticket_price',
        'ticket_type',
        'created_date',
        'user_id',
        'showtime_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ShowTicket.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = ShowTicket.objects.all()
        serializer_class = ShowTicketExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)


class ShowBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ShowBooking.objects.all()
    serializer_class = ShowBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['showtime_id', 'user_id',
                        'show_id', 'ticket_seat', 'ticket_number', 'ticket_free', 'status']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ShowBooking.objects.all()
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

        queryset = ShowBooking.objects.all()
        showtime_id = request.query_params.get('showtime_id', None)
        user_id = request.query_params.get('user_id', None)
        status = request.query_params.get('status', None)
        if showtime_id is not None:
            queryset = queryset.filter(showtime_id=showtime_id)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        if status is not None:
            queryset = queryset.filter(status=status)

        serializer_class = ShowBookingExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def generate_ticket(self, request):

        # Model data
        show_booking_id = request.query_params.get('id', None)

        queryset = ShowBooking.objects.all()
        if show_booking_id is not None:
            queryset = queryset.filter(id=show_booking_id)

        serializer_class = ShowBookingExtendedSerializer(queryset, many=True)

        items = serializer_class.data[0].items()
        
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
        current_year = datetime.now(timezone_).year
        
        # Develop QR code string
        queryset = ShowBooking.objects.filter(id=show_booking_id).values('ticket_number', 'showtime_id', 'show_id', 'user_id')
        qr_code_array = [str('PLN{}'.format(current_year)), str(queryset[0]['ticket_number']), str(queryset[0]['showtime_id']), str(queryset[0]['show_id']), str(queryset[0]['user_id'])]
        qr_code_str = '|'.join(qr_code_array)

        # missing no tiket
        ticket_info = {}
        # to find invoice-receipt detail based on booking_id
        cart = Cart.objects.filter(
            show_booking_id__id=show_booking_id).values('id')
        invoicereceipt = InvoiceReceipt.objects.filter(
            cart_id__id=cart[0]['id']).values()

        ticket_info['ticket_qrcode'] = qr_code_str

        if invoicereceipt:
            ticket_info['ticket_transaction_date'] = invoicereceipt[0]['payment_successful_datetime'].strftime(
                "%Y-%m-%d %H:%M")
            ticket_transaction_type = ''
            if invoicereceipt[0]['type'] == 'T':
                ticket_transaction_type = 'Tunai / Cash'
            elif invoicereceipt[0]['type'] == 'F':
                ticket_transaction_type = 'FPX'
            elif invoicereceipt[0]['type'] == 'C':
                ticket_transaction_type = 'Kad Kredit / Credit Card'
            elif invoicereceipt[0]['type'] == 'D':
                ticket_transaction_type = 'Kad Debit / Debit Card'
            elif invoicereceipt[0]['type'] == 'Q':
                ticket_transaction_type = 'QR Pay'
            elif invoicereceipt[0]['type'] == 'K':
                ticket_transaction_type = 'Kad Kredit / Credit Card'
            ticket_info['ticket_transaction_type'] = ticket_transaction_type

        for key, value in items:
            # print(key, '=>', value)
            if key == 'ticket_number':
                ticket_info['ticket_number'] = value
            if key == 'ticket_type':
                ticket_info['ticket_type'] = get_ticket_category(value, None)
            if key == 'ticket_category':
                ticket_info['ticket_category'] = get_ticket_category(
                    None, value)
            if key == 'ticket_seat':
                ticket_info['ticket_seat'] = value
            if key == 'price':
                ticket_info['ticket_price'] = value

            if key == 'show_id':
                for key_show, value_show in value.items():
                    if key_show == 'title_ms':
                        ticket_info['ticket_title'] = value_show

            if key == 'showtime_id':
                for key_showtime, value_showtime in value.items():
                    if key_showtime == 'show_date':
                        ticket_info['ticket_date'] = value_showtime
                    if key_showtime == 'show_time':
                        ticket_info['ticket_time'] = value_showtime

        # Rendered
        html_string = render_to_string(
            'ticket/show_ticket.html', {'ticket_info': ticket_info})
        html = HTML(string=html_string, base_url=request.build_absolute_uri())
        result = html.write_pdf(
            stylesheets=[CSS(settings.STATIC_ROOT + '/css/bootstrap.css')])

        # Creating http response
        filename = 'Tiket_Planetarium_Negara_' + \
            ticket_info['ticket_number'] + '.pdf'
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

        queryset_showing = ShowBooking.objects.filter(
            showtime_id__show_date=datetime.today()).values()

        data = {
            'queryset_showing': queryset_showing
        }

        return Response(data)

    #@action(methods=['GET'], detail=False)
    #def update_available_seat(self, request, *args, **kwargs):
    #    invoice_receipt_id = request.query_params.get('id', None)
    #    carts = InvoiceReceipt.objects.filter(id=invoice_receipt_id).values_list('cart_id', flat=True)

    #    show_booking_ids = []
    #    for cart in carts:
    #        a = Cart.objects.filter(id=cart).values_list('show_booking_id', flat=True)
    #        print(a)
    #        #if len(a) > 0:
    #        #    show_booking_ids.append(a[0].values_list('show_booking_id', flat=True))

    #    print(show_booking_ids)
    #    for ids in show_booking_ids:
    #        booking = ShowBooking.objects.filter(id=ids)
    #        print(booking)
    #        if len(booking) > 0:

    #            schedule = Showtime.objects.filter(id=booking[0].showtime_id)
    #            schedule.available_ticket = schedule.available_ticket - booking.ticket_quantity
    #            schedule.save()

    #    return Response({"msg":"update seat available"})


