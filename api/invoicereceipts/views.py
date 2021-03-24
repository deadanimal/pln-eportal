from django.shortcuts import render
from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template, render_to_string

from datetime import datetime
from weasyprint import default_url_fetcher, HTML, CSS

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
