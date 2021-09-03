from django.shortcuts import render
from django.conf import settings
from django.db import connection
from django.db.models import Q, Count, Sum
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template, render_to_string

from datetime import datetime, timedelta
from weasyprint import default_url_fetcher, HTML, CSS
from itertools import chain
import itertools
import json

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    InvoiceReceipt
)

from carts.models import (
    Cart
)

from cashtransactions.models import (
    CashTransaction
)

from showings.models import (
    ShowBooking
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from venues.models import (
    FacilityBooking
)

from .serializers import (
    InvoiceReceiptSerializer,
    InvoiceReceiptExtendedSerializer
)


class InvoiceReceiptViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = InvoiceReceipt.objects.all()
    serializer_class = InvoiceReceiptSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'user', 'status', 'type',
                        'cart_id', 'fpx_transaction_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = InvoiceReceipt.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = InvoiceReceipt.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Invois & resit'
        return Response(chain(queryset1))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = InvoiceReceipt.objects.all()
        id = request.query_params.get('id', None)
        status = request.query_params.get('status', None)
        user = request.query_params.get('user', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if status is not None:
            queryset = queryset.filter(status=status)
        if user is not None:
            queryset = queryset.filter(user=user)

        serializer_class = InvoiceReceiptExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['POST'], detail=False)
    def delete_invoice_receipt(self, request, *args, **kwargs):

        invoice_receipt_id = request.data['id']
        cart_id = request.data['cart_id']
        show_booking_id = request.data['show_booking_id']
        simulator_ride_booking_id = request.data['simulator_ride_booking_id']
        facility_booking_id = request.data['facility_booking_id']
        cash_transaction_id = request.data['cash_transaction_id']

        InvoiceReceipt.objects.filter(id=invoice_receipt_id).delete()

        if len(cart_id) > 0:
            for cart in cart_id:
                Cart.objects.filter(id=cart).delete()

        if len(show_booking_id) > 0:
            for show_booking in show_booking_id:
                ShowBooking.objects.filter(id=show_booking).delete()

        if len(simulator_ride_booking_id) > 0:
            for simulator_ride_booking in simulator_ride_booking_id:
                SimulatorRideBooking.objects.filter(
                    id=simulator_ride_booking).delete()

        if len(facility_booking_id) > 0:
            for facility_booking in facility_booking_id:
                FacilityBooking.objects.filter(
                    id=facility_booking).delete()

        if len(cash_transaction_id) > 0:
            for cash_transaction in cash_transaction_id:
                CashTransaction.objects.filter(id=cash_transaction).delete()

        return Response(status=status.HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def generate_receipt(self, request):

        # Model data
        invoice_receipt_id = request.query_params.get('id', None)

        queryset = InvoiceReceipt.objects.all()
        if invoice_receipt_id is not None:
            queryset = queryset.filter(id=invoice_receipt_id)

        serializer_class = InvoiceReceiptExtendedSerializer(
            queryset, many=True)

        items = serializer_class.data[0].items()

        receipt_info = {}
        receipt_info['receipt_generated_date'] = datetime.now().strftime(
            "%d.%m.%Y")
        receipt_info['receipt_generated_year'] = datetime.now().strftime("%Y")

        payment_info = {}
        for key, value in items:
            # print(key, '=>', value)
            if key == 'user':
                for key_user, value_user in value.items():
                    if key_user == 'full_name':
                        receipt_info['receipt_full_name'] = value_user
            if key == 'receipt_running_no':
                receipt_info['receipt_running_no'] = value
            if key == 'total_price_after_voucher':
                receipt_info['receipt_total_price_after_voucher'] = value
            if key == 'total_price_before_voucher':
                receipt_info['receipt_total_price_before_voucher'] = value
            if key == 'total_voucher':
                receipt_info['receipt_total_voucher'] = value

            # Cart
            if key == 'cart_id':
                for x in range(0, len(value)):
                    for key_cart, value_cart in value[x].items():
                        # print('cart', key_cart, '=>', value_cart)
                        if key_cart == 'simulator_ride_booking_id':
                            total = 0.00
                            for i in range(0, len(value_cart)):

                                for key_simulator_ride_booking, value_simulator_ride_booking in value_cart[i].items():
                                    if key_simulator_ride_booking == 'total_price':
                                        total = total + \
                                            float(value_simulator_ride_booking)

                                payment_info['simulator_ride_booking'] = {
                                    'detail': 'Kembara Simulasi',
                                    'amount': "{:.2f}".format(total)
                                }

                        if key_cart == 'show_booking_id':
                            total = 0.00
                            for i in range(0, len(value_cart)):

                                for key_show_booking_booking, value_show_booking_booking in value_cart[i].items():
                                    if key_show_booking_booking == 'total_price':
                                        total = total + \
                                            float(value_show_booking_booking)

                                payment_info['show_booking'] = {
                                    'detail': 'Tayangan Planetarium',
                                    'amount': "{:.2f}".format(total)
                                }

                        if key_cart == 'facility_booking_id':
                            total = 0.00
                            for i in range(0, len(value_cart)):

                                for key_facility_booking_booking, value_facility_booking_booking in value_cart[i].items():
                                    if key_facility_booking_booking == 'total_price':
                                        total = total + \
                                            float(
                                                value_facility_booking_booking)

                                payment_info['facility_booking'] = {
                                    'detail': 'Tayangan Planetarium',
                                    'amount': "{:.2f}".format(total)
                                }

        # Rendered
        html_string = render_to_string(
            'receipt/official_receipt.html', {'receipt_info': receipt_info, 'payment_info': payment_info})
        html = HTML(string=html_string, base_url=request.build_absolute_uri())
        result = html.write_pdf(
            stylesheets=[CSS(settings.STATIC_ROOT + '/css/bootstrap.css')])

        # Creating http response
        filename = 'Resit_Rasmi_Planetarium_Negara_' + \
            receipt_info['receipt_running_no'] + '.pdf'
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
    def generate_summarized_transaction_report(self, request):

        # Model data
        queryset = InvoiceReceipt.objects.exclude(receipt_running_no__exact='').values(
            'receipt_running_no', 'receipt_created_datetime', 'total_price_before_voucher', 'total_voucher', 'total_price_after_voucher')

        # to find grand total of all transaction
        total = 0
        for q in queryset:
            total = total + q['total_price_after_voucher']

        # Rendered
        html_string = render_to_string(
            'reports/summarized_transaction.html', {'receipt_info': queryset, 'total': total})
        html = HTML(string=html_string, base_url=request.build_absolute_uri())
        result = html.write_pdf(
            stylesheets=[CSS(settings.STATIC_ROOT + '/css/bootstrap.css')])

        # Creating http response
        filename = 'Ringkasan_Laporan_Transaksi_Planetarium_Negara.pdf'
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

        current_year = datetime.today().year
        current_month = datetime.today().month
        current_day = datetime.today().day

        # Kaunter = [T, D, Q, K]
        # Online = [F, C]
        sales_category = self.request.query_params['sales_category']
        if sales_category == 'Kaunter':
            type_in = ['T', 'D', 'Q', 'K']
        elif sales_category == 'Online':
            type_in = ['F', 'C']

        queryset_showing = InvoiceReceipt.objects.filter(type__in=type_in, cart_id__show_booking_id__isnull=False, payment_successful_datetime__day=current_day,
                                                         payment_successful_datetime__month=current_month, payment_successful_datetime__year=current_year).values()
        queryset_simulator_ride = InvoiceReceipt.objects.filter(type__in=type_in, cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__day=current_day,
                                                                payment_successful_datetime__month=current_month, payment_successful_datetime__year=current_year).values()

        data = {
            'queryset_showing': queryset_showing,
            'queryset_simulator_ride': queryset_simulator_ride
        }

        return Response(data)

    @action(methods=['GET'], detail=False)
    def get_dashboard_2(self, request):

        data = []
        for x in range(7):

            current_date = datetime.now()
            last7_date = current_date - timedelta(days=(7 - x))

            current_year = last7_date.year
            current_month = last7_date.month
            current_day = last7_date.day

            queryset_showing = InvoiceReceipt.objects.filter(cart_id__show_booking_id__isnull=False, payment_successful_datetime__day=current_day,
                                                             payment_successful_datetime__month=current_month, payment_successful_datetime__year=current_year).values('id', 'total_price_after_voucher')
            # to remove duplicates which is same key and value (objects)
            new_queryset_showing = [
                dict(t) for t in {tuple(d.items()) for d in queryset_showing}]

            queryset_simulator_ride = InvoiceReceipt.objects.filter(cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__day=current_day,
                                                                    payment_successful_datetime__month=current_month, payment_successful_datetime__year=current_year).values('id', 'total_price_after_voucher')
            # to remove duplicates which is same key and value (objects)
            new_queryset_simulator_ride = [
                dict(t) for t in {tuple(d.items()) for d in queryset_simulator_ride}]

            queryset_facility = InvoiceReceipt.objects.filter(cart_id__facility_booking_id__isnull=False, payment_successful_datetime__day=current_day,
                                                              payment_successful_datetime__month=current_month, payment_successful_datetime__year=current_year).values('id', 'total_price_after_voucher')
            # to remove duplicates which is same key and value (objects)
            new_queryset_facility = [
                dict(t) for t in {tuple(d.items()) for d in queryset_facility}]

            total_sales_showing = 0
            for showing in new_queryset_showing:
                total_sales_showing += showing['total_price_after_voucher']

            total_sales_simulator_ride = 0
            for simulator_ride in new_queryset_simulator_ride:
                total_sales_simulator_ride += simulator_ride['total_price_after_voucher']

            total_sales_facility = 0
            for facility in new_queryset_facility:
                total_sales_facility += facility['total_price_after_voucher']

            data_per_date = {
                'date': last7_date.date(),
                'total_sales_showing': total_sales_showing,
                'total_sales_simulator_ride': total_sales_simulator_ride,
                'total_sales_facility': total_sales_facility
            }
            data.append(data_per_date)

        return Response(data)

    @action(methods=['POST'], detail=False)
    def get_analytic_daily_quote_sales_rm(self, request):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']
        category = data['category']

        if category == 'Tayangan':
            queryset = InvoiceReceipt.objects.filter(payment_successful_datetime__range=(
                start_date, end_date), cart_id__show_booking_id__isnull=False).values('id', 'payment_successful_datetime__date', 'cart_id')

        elif category == 'Kembara Simulasi':
            queryset = InvoiceReceipt.objects.filter(payment_successful_datetime__range=(
                start_date, end_date), cart_id__simulator_ride_booking_id__isnull=False).values('id', 'payment_successful_datetime__date', 'cart_id').order_by('payment_successful_datetime__date')

        elif category == 'Fasiliti':
            queryset = InvoiceReceipt.objects.filter(payment_successful_datetime__range=(
                start_date, end_date), cart_id__facility_booking_id__isnull=False).values('id', 'payment_successful_datetime__date', 'cart_id')

        # to remove duplicates which is same key and value (objects)
        new_queryset = [dict(t) for t in {tuple(d.items()) for d in queryset}]

        unsortedData = []
        for qs in new_queryset:
            if category == 'Tayangan':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Sum('show_booking_id__total_price'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_price': queryset['show_booking_id__total_price__sum']
                }
                unsortedData.append(obj)

            elif category == 'Kembara Simulasi':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Sum('simulator_ride_booking_id__total_price'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_price': queryset['simulator_ride_booking_id__total_price__sum']
                }
                unsortedData.append(obj)

            elif category == 'Fasiliti':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Sum('facility_booking_id__total_price'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_price': queryset['facility_booking_id__total_price__sum']
                }
                unsortedData.append(obj)

        data = []
        for k, g in itertools.groupby(sorted(unsortedData, key=lambda x: x['payment_successful_datetime']), key=lambda x: x['payment_successful_datetime']):
            l = list(g)
            data.append(
                {'payment_successful_datetime': k, 'total_price': str(sum([int(x['total_price']) for x in l]))})

        return Response(data)

    @action(methods=['POST'], detail=False)
    def get_analytic_daily_quote_sales_ticket(self, request):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']
        category = data['category']

        # Kaunter = [T, D, Q, K]
        # Online = [F, C]

        if category == 'Tayangan':
            queryset_counter = InvoiceReceipt.objects.filter(type__in=(
                'T', 'D', 'Q', 'K'), cart_id__show_booking_id__isnull=False, payment_successful_datetime__range=(start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')
            queryset_online = InvoiceReceipt.objects.filter(type__in=(
                'F', 'C'), cart_id__show_booking_id__isnull=False, payment_successful_datetime__range=(start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')

        elif category == 'Kembara Simulasi':
            queryset_counter = InvoiceReceipt.objects.filter(type__in=(
                'T', 'D', 'Q', 'K'), cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__range=(start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')
            queryset_online = InvoiceReceipt.objects.filter(type__in=(
                'F', 'C'), cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__range=(start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')

        # to remove duplicates which is same key and value (objects)
        new_queryset_counter = [
            dict(t) for t in {tuple(d.items()) for d in queryset_counter}]
        new_queryset_online = [
            dict(t) for t in {tuple(d.items()) for d in queryset_online}]

        data_counter = []
        for qs in new_queryset_counter:
            if category == 'Tayangan':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Count('show_booking_id__id'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_ticket': queryset['show_booking_id__id__count']
                }
                data_counter.append(obj)

            elif category == 'Kembara Simulasi':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Count('simulator_ride_booking_id__id'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_ticket': queryset['simulator_ride_booking_id__id__count']
                }
                data_counter.append(obj)

        data_online = []
        for qs in new_queryset_online:
            if category == 'Tayangan':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Count('show_booking_id__id'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_ticket': queryset['show_booking_id__id__count']
                }
                data_online.append(obj)

            elif category == 'Kembara Simulasi':
                queryset = Cart.objects.filter(id=qs['cart_id']).aggregate(
                    Count('simulator_ride_booking_id__id'))

                obj = {
                    'payment_successful_datetime': qs['payment_successful_datetime__date'],
                    'total_ticket': queryset['simulator_ride_booking_id__id__count']
                }
                data_online.append(obj)

        sortedData_counter = []
        for k, g in itertools.groupby(sorted(data_counter, key=lambda x: x['payment_successful_datetime']), key=lambda x: x['payment_successful_datetime']):
            l = list(g)
            sortedData_counter.append(
                {'payment_successful_datetime': k, 'total_ticket': str(sum([int(x['total_ticket']) for x in l]))})

        sortedData_online = []
        for k, g in itertools.groupby(sorted(data_online, key=lambda x: x['payment_successful_datetime']), key=lambda x: x['payment_successful_datetime']):
            l = list(g)
            sortedData_online.append(
                {'payment_successful_datetime': k, 'total_ticket': str(sum([int(x['total_ticket']) for x in l]))})

        data = {
            'queryset_counter': sortedData_counter,
            'queryset_online': sortedData_online
        }

        return Response(data)

    @action(methods=['POST'], detail=False)
    def get_analytic_daily_quote_sales_ticket_category(self, request):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']
        category = data['category']

        # Warganegara = CZ : Warganegara, NC : Bukan Warganegara
        # Kategori = AD : Dewasa, KD : Kanak-kanak, OF : Warga Emas, SD : Pelajar, OK : OKU

        if category == 'Tayangan':
            queryset_citizen = InvoiceReceipt.objects.filter(cart_id__show_booking_id__ticket_type='CZ', cart_id__show_booking_id__isnull=False, payment_successful_datetime__range=(
                start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')
            queryset_noncitizen = InvoiceReceipt.objects.filter(cart_id__show_booking_id__ticket_type='NC', cart_id__show_booking_id__isnull=False, payment_successful_datetime__range=(
                start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')

        elif category == 'Kembara Simulasi':
            queryset_citizen = InvoiceReceipt.objects.filter(cart_id__simulator_ride_booking_id__ticket_type='CZ', cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__range=(
                start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')
            queryset_noncitizen = InvoiceReceipt.objects.filter(cart_id__simulator_ride_booking_id__ticket_type='NC', cart_id__simulator_ride_booking_id__isnull=False, payment_successful_datetime__range=(
                start_date, end_date)).values('id', 'payment_successful_datetime__date', 'cart_id')

        # to remove duplicates which is same key and value (objects)
        new_queryset_citizen = [
            dict(t) for t in {tuple(d.items()) for d in queryset_citizen}]
        new_queryset_noncitizen = [
            dict(t) for t in {tuple(d.items()) for d in queryset_noncitizen}]

        data_citizen = []
        for qs in new_queryset_citizen:
            if category == 'Tayangan':
                queryset = Cart.objects.filter(id=qs['cart_id']).values('show_booking_id__ticket_category').annotate(
                    total_ticket_category=Count('show_booking_id__ticket_category'))

                for qset in queryset:
                    obj = {
                        'payment_successful_datetime': qs['payment_successful_datetime__date'],
                        'ticket_category': qset['show_booking_id__ticket_category'],
                        'total_ticket_category': qset['total_ticket_category']
                    }
                    data_citizen.append(obj)

            elif category == 'Kembara Simulasi':
                queryset = Cart.objects.filter(id=qs['cart_id']).values('simulator_ride_booking_id__ticket_category').annotate(
                    total_ticket_category=Count('simulator_ride_booking_id__ticket_category'))

                for qset in queryset:
                    obj = {
                        'payment_successful_datetime': qs['payment_successful_datetime__date'],
                        'ticket_category': qset['simulator_ride_booking_id__ticket_category'],
                        'total_ticket_category': qset['total_ticket_category']
                    }
                    data_citizen.append(obj)

        data_noncitizen = []
        for qs in new_queryset_noncitizen:
            if category == 'Tayangan':
                queryset = Cart.objects.filter(id=qs['cart_id']).values('show_booking_id__ticket_category').annotate(
                    total_ticket_category=Count('show_booking_id__ticket_category'))

                for qset in queryset:
                    obj = {
                        'payment_successful_datetime': qs['payment_successful_datetime__date'],
                        'ticket_category': qset['show_booking_id__ticket_category'],
                        'total_ticket_category': qset['total_ticket_category']
                    }
                    data_noncitizen.append(obj)

            elif category == 'Kembara Simulasi':
                queryset = Cart.objects.filter(id=qs['cart_id']).values('simulator_ride_booking_id__ticket_category').annotate(
                    total_ticket_category=Count('simulator_ride_booking_id__ticket_category'))

                for qset in queryset:
                    obj = {
                        'payment_successful_datetime': qs['payment_successful_datetime__date'],
                        'ticket_category': qset['simulator_ride_booking_id__ticket_category'],
                        'total_ticket_category': qset['total_ticket_category']
                    }
                    data_noncitizen.append(obj)

        sortedData_citizen = []
        for k, g in itertools.groupby(sorted(data_citizen, key=lambda x: x['payment_successful_datetime']), key=lambda x: (x['payment_successful_datetime'], x['ticket_category'])):
            l = list(g)
            sortedData_citizen.append(
                {'type': 'CZ', 'payment_successful_datetime': k[0], 'ticket_category': k[1], 'total_ticket_category': str(sum([int(x['total_ticket_category']) for x in l]))})

        sortedData_noncitizen = []
        for k, g in itertools.groupby(sorted(data_noncitizen, key=lambda x: x['payment_successful_datetime']), key=lambda x: (x['payment_successful_datetime'], x['ticket_category'])):
            l = list(g)
            sortedData_noncitizen.append(
                {'type': 'NC', 'payment_successful_datetime': k[0], 'ticket_category': k[1], 'total_ticket_category': str(sum([int(x['total_ticket_category']) for x in l]))})

        data = {
            'queryset_citizen': sortedData_citizen,
            'queryset_noncitizen': sortedData_noncitizen
        }

        return Response(data)
