from django.shortcuts import render
from django.core import serializers
from django.db.models import Count, Q
from django.http import JsonResponse

from datetime import datetime

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

    @action(methods=['POST'], detail=False)
    def number_of_facility_bookings(self, request, *args, **kwargs):

        year = self.request.data['year'] if self.request.data['year'] else None
        if (year is not None):
            data = list(FacilityBooking.objects.all().values('status').annotate(total=Count('status')).filter(modified_date__year=year))
        else:
            data = list(FacilityBooking.objects.all().values('status').annotate(total=Count('status')))

        return JsonResponse(data, safe=False)

    @action(methods=['GET'], detail=False)
    def get_dashboard(self, request):

        current_year = datetime.today().year
        current_month = datetime.today().month

        queryset_created = FacilityBooking.objects.filter(created_date__month=current_month, created_date__year=current_year).values()
        queryset_approved = FacilityBooking.objects.filter(approved_date__month=current_month, approved_date__year=current_year).values()
        queryset_rejected = FacilityBooking.objects.filter(rejected_date__month=current_month, rejected_date__year=current_year).values()

        data = {
            'queryset_created': queryset_created,
            'queryset_approved': queryset_approved,
            'queryset_rejected': queryset_rejected
        }

        return Response(data)
