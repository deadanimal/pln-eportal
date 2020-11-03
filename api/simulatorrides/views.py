from django.shortcuts import render
from django.db.models import Q

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

from simulatorrides.serializers import (
    SimulatorRideSerializer,
    SimulatorRideTimeSerializer,
    SimulatorRideTimeExtendedSerializer,
    SimulatorRideBookingSerializer,
    SimulatorRideBookingExtendedSerializer,
)

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


class SimulatorRideTimeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SimulatorRideTime.objects.all()
    serializer_class = SimulatorRideTimeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['day', 'round', 'created_date']

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
        serializer_class = SimulatorRideTimeExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class SimulatorRideBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SimulatorRideBooking.objects.all()
    serializer_class = SimulatorRideBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['simulator_ride_time_id', 'booking_date', 'ticket_type', 'ticket_category', 'user_id', 'status']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = SimulatorRideBooking.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = SimulatorRideBooking.objects.all()
        simulator_ride_time_id = request.query_params.get('simulator_ride_time_id', None)
        user_id = request.query_params.get('user_id', None)
        if simulator_ride_time_id is not None:
            queryset = queryset.filter(simulator_ride_time_id=simulator_ride_time_id)
        if user_id is not None:
            queryset = queryset.filter(user_id=user_id)
        
        serializer_class = SimulatorRideBookingExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)