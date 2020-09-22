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
    Showing,
    Showtime,
    ShowTicket
)

from .serializers import (
    ShowingSerializer,
    ShowtimeSerializer,
    ShowTicketSerializer
)

class ShowingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Showing.objects.all()
    serializer_class = ShowingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['genre', 'language', 'duration_hours', 'status', 'created_date']

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
    filterset_fields = ['start_datetime', 'showing_id', 'venue_id', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = Showtime.objects.all()
        return queryset


class ShowTicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ShowTicket.objects.all()
    serializer_class = ShowTicketSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'ticket_price', 
        'category', 
        'ticket_type', 
        'created_date',
        'customer_id',
        'showtime_id',
        'created_date'
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

