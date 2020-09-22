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
    Exhibit,
    EducationalProgram,
    EducationalProgramApplication,
    VisitApplication
)

from .serializers import (
    ExhibitSerializer,
    EducationalProgramSerializer,
    EducationalProgramApplicationSerializer,
    VisitApplicationSerializer
)

class ExhibitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'start_datetime', 
        'end_datetime', 
        'pic_id', 
        'venue_id', 
        'asset_id', 
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
        queryset = Exhibit.objects.all()
        return queryset


class EducationalProgramViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'program_type', 
        'min_participant', 
        'max_participant', 
        'price',
        'start_datetime',
        'end_datetime',
        'venue_id',
        'coordinator_id',
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
        queryset = EducationalProgram.objects.all()
        return queryset


class EducationalProgramApplicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgramApplication.objects.all()
    serializer_class = EducationalProgramApplicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'organisation_name', 
        'organisation_category', 
        'customer_id',
        'educational_program_id',
        'participant',
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
        queryset = EducationalProgramApplication.objects.all()
        return queryset


class VisitApplicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VisitApplication.objects.all()
    serializer_class = VisitApplicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'organisation_name', 
        'organisation_category', 
        'start_datetime',
        'end_datetime', 
        'total_participant', 
        'customer_id', 
        'pic_id', 
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
        queryset = VisitApplication.objects.all()
        return queryset

