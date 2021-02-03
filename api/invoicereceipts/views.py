from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

import datetime
import pytz

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

from showings.models import (
    ShowBooking
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from .serializers import (
    InvoiceReceiptSerializer,
    InvoiceReceiptExtendedSerializer
)


def receipt_created(invoice_receipt_id):

    invoice_receipt = InvoiceReceipt.objects.filter(
        id=invoice_receipt_id).first()

    timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
    prefix = '{}R'.format(datetime.datetime.now(timezone_).strftime('%Y%m%d'))
    prev_instances = InvoiceReceipt.objects.exclude(
        receipt_running_no__exact='')

    if prev_instances.exists():
        last_instance_id = prev_instances.first().receipt_running_no[-6:]
        invoice_receipt.receipt_running_no = prefix + \
            '{0:06d}'.format(int(last_instance_id)+1)
    else:
        invoice_receipt.receipt_running_no = prefix+'{0:06d}'.format(1)

    invoice_receipt.receipt_created_datetime = datetime.datetime.now(
        timezone_).strftime("%Y-%m-%d %H:%M:%S")
    invoice_receipt.status = 'RC'
    
    print('receipt_created function')
    print('invoice_receipt_id', invoice_receipt_id)
    print('invoice_receipt.receipt_running_no', invoice_receipt.receipt_running_no)

    invoice_receipt.save()


class InvoiceReceiptViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = InvoiceReceipt.objects.all()
    serializer_class = InvoiceReceiptSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'user', 'status',
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

        return Response(status=status.HTTP_200_OK)
