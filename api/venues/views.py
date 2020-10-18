from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Venue,
    Facility,
    FacilityBooking
)

from .serializers import (
    VenueSerializer,
    FacilitySerializer,
    FacilityExtendedSerializer,
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


class FacilityViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'facility_type', 
        'price', 
        'size',
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


class FacilityBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FacilityBooking.objects.all()
    serializer_class = FacilityBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'booking_date', 
        'booking_time', 
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
        serializer_class = FacilityBookingExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

