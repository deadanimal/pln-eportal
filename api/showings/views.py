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
    ShowTicket,
    ShowBooking
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
    filterset_fields = ['showing_id', 'venue_id', 'created_date', 'show_date']

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
                        'show_id', 'ticket_seat', 'status']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ShowBooking.objects.all()
        return queryset

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
