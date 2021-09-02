from django.shortcuts import render
from django.core import serializers
from django.db import connection
from django.db.models import Q, Count, Sum
from django.db.models.functions import ExtractMonth, TruncMonth
from django.http import JsonResponse

from datetime import datetime
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
    Venue,
    FacilitySubcategory,
    Facility,
    FacilityPrice,
    FacilityImage,
    FacilityBooking
)

from carts.models import Cart
from invoicereceipts.models import InvoiceReceipt

from .serializers import (
    VenueSerializer,
    FacilitySubcategorySerializer,
    FacilitySerializer,
    FacilityExtendedSerializer,
    FacilityPriceSerializer,
    FacilityPriceExtendedSerializer,
    FacilityImageSerializer,
    FacilityImageExtendedSerializer,
    FacilityBookingSerializer,
    FacilityBookingExtendedSerializer
)


class VenueViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Venue.objects.all()
    serializer_class = VenueSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['location', 'max_capacity', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Venue.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Venue.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Tempat'
        return Response(chain(queryset1))


class FacilitySubcategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FacilitySubcategory.objects.all()
    serializer_class = FacilitySubcategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'code',
        'name_en',
        'name_ms',
        'status',
        'facility_category'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FacilitySubcategory.objects.all()
        return queryset


class FacilityViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'facility_category',
        'facility_subcategory',
        'area_size',
        'max_capacity',
        'pic_id',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Facility.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Facility.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset2 = FacilitySubcategory.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset3 = FacilityPrice.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset4 = FacilityImage.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset5 = FacilityBooking.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Fasiliti'
        for qs in queryset2:
            qs['history_model_name'] = 'Subkategori fasiliti'
        for qs in queryset3:
            qs['history_model_name'] = 'Harga fasiliti'
        for qs in queryset4:
            qs['history_model_name'] = 'Gambar fasiliti'
        for qs in queryset5:
            qs['history_model_name'] = 'Tempahan fasiliti'
        return Response(chain(queryset1, queryset2, queryset3, queryset4, queryset5))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Facility.objects.all()
        serializer_class = FacilityExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)


class FacilityPriceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FacilityPrice.objects.all()
    serializer_class = FacilityPriceSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'facility_id',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FacilityPrice.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = FacilityPrice.objects.all()
        serializer_class = FacilityPriceExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)


class FacilityImageViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FacilityImage.objects.all()
    serializer_class = FacilityImageSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'facility_id',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FacilityImage.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = FacilityImage.objects.all()
        serializer_class = FacilityImageExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)


class FacilityBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FacilityBooking.objects.all()
    serializer_class = FacilityBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'booking_date',
        'booking_days',
        'user_id',
        'pic_id',
        'facility_id',
        'status',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = FacilityBooking.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = FacilityBooking.objects.all()
        serializer_class = FacilityBookingExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_dashboard(self, request):

        current_year = datetime.today().year
        current_month = datetime.today().month

        queryset_created = FacilityBooking.objects.filter(
            created_date__month=current_month, created_date__year=current_year).values()
        queryset_approved = FacilityBooking.objects.filter(
            approved_date__month=current_month, approved_date__year=current_year).values()
        queryset_rejected = FacilityBooking.objects.filter(
            rejected_date__month=current_month, rejected_date__year=current_year).values()

        data = {
            'queryset_created': queryset_created,
            'queryset_approved': queryset_approved,
            'queryset_rejected': queryset_rejected
        }

        return Response(data)

    @action(methods=['POST'], detail=False)
    def number_of_facility_bookings(self, request, *args, **kwargs):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']

        queryset = FacilityBooking.objects.values('facility_id__name_ms', 'booking_date').filter(
            booking_date__range=(start_date, end_date)).annotate(total_booking=Count('facility_id')).order_by('booking_date', 'facility_id__name_ms')

        return Response(queryset)

    @action(methods=['POST'], detail=False)
    def number_of_facility_bookings_frequency(self, request, *args, **kwargs):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']

        queryset = InvoiceReceipt.objects.filter(invoice_created_datetime__range=(
            start_date, end_date), cart_id__facility_booking_id__isnull=False).values('id', 'invoice_created_datetime__month', 'cart_id')  # payment_successful_datetime__date

        # # to remove duplicates which is same key and value (objects)
        new_queryset = [dict(t) for t in {tuple(d.items()) for d in queryset}]

        unsortedData = []
        for qs in new_queryset:
            queryset = Cart.objects.filter(id=qs['cart_id']).values('facility_booking_id__facility_id__name_ms').annotate(
                total_booking=Count('facility_booking_id__facility_id__name_ms'))

            for qset in queryset:
                obj = {
                    'month_booking': qs['invoice_created_datetime__month'],
                    'facility_name': qset['facility_booking_id__facility_id__name_ms'],
                    'total_booking': qset['total_booking']
                }
                unsortedData.append(obj)

        data = []
        for k, g in itertools.groupby(sorted(unsortedData, key=lambda x: (x['month_booking'], x['facility_name'])), key=lambda x: (x['month_booking'], x['facility_name'])):
            l = list(g)
            data.append(
                {k[0]: [{k[1]: str(sum([int(x['total_booking']) for x in l]))}]})
            # data.append(
            #     {'month_booking': k[0], 'facility_name': k[1], 'total_booking': str(sum([int(x['total_booking']) for x in l]))})

        return Response(data)

    @action(methods=['POST'], detail=False)
    def number_of_facility_bookings_statistic(self, request, *args, **kwargs):

        data = json.loads(request.body)

        start_date = data['start_date']
        end_date = data['end_date']

        queryset = InvoiceReceipt.objects.filter(invoice_created_datetime__range=(
            start_date, end_date), cart_id__facility_booking_id__isnull=False).values('id', 'invoice_created_datetime__month', 'cart_id')  # payment_successful_datetime__date

        # # to remove duplicates which is same key and value (objects)
        new_queryset = [dict(t) for t in {tuple(d.items()) for d in queryset}]

        unsortedData = []
        for qs in new_queryset:
            queryset = Cart.objects.filter(id=qs['cart_id']).values('facility_booking_id__facility_id__name_ms').annotate(
                total_price=Sum('facility_booking_id__total_price'))

            for qset in queryset:
                obj = {
                    'month_booking': qs['invoice_created_datetime__month'],
                    'facility_name': qset['facility_booking_id__facility_id__name_ms'],
                    'total_price': qset['total_price']
                }
                unsortedData.append(obj)

        data = []
        for k, g in itertools.groupby(sorted(unsortedData, key=lambda x: (x['month_booking'], x['facility_name'])), key=lambda x: (x['month_booking'], x['facility_name'])):
            l = list(g)
            data.append(
                {k[0]: [{k[1]: str(sum([int(x['total_price']) for x in l]))}]})
            # data.append(
            #     {'month_booking': k[0], 'facility_name': k[1], 'total_price': str(sum([int(x['total_price']) for x in l]))})

        return Response(data)
