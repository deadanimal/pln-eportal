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
    CloseBooking
)

from .serializers import (
    CloseBookingSerializer
)


class CloseBookingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CloseBooking.objects.all()
    serializer_class = CloseBookingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'title_ms',
        'description_en',
        'description_ms',
        'module',
        'date_start',
        'date_end'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = CloseBooking.objects.all()
        return queryset
