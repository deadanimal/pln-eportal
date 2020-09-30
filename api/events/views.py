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
    ExhibitList,
    ExhibitDetail,
    EducationalProgram,
    EducationalProgramDate,
    EducationalProgramApplication,
    VisitApplication
)

from .serializers import (
    ExhibitSerializer,
    ExhibitExtendedSerializer,
    ExhibitListSerializer,
    ExhibitListExtendedSerializer,
    ExhibitDetailSerializer,
    ExhibitDetailExtendedSerializer,
    EducationalProgramSerializer,
    EducationalProgramExtendedSerializer,
    EducationalProgramDateSerializer,
    EducationalProgramApplicationSerializer,
    EducationalProgramApplicationExtendedSerializer,
    VisitApplicationSerializer,
    VisitApplicationExtendedSerializer
)

class ExhibitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'zone',
        'pic_id', 
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

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = Exhibit.objects.all()
        serializer_class = ExhibitExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

class ExhibitListViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ExhibitList.objects.all()
    serializer_class = ExhibitListSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name',
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
        queryset = ExhibitList.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = ExhibitList.objects.all()
        serializer_class = ExhibitListExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

class ExhibitDetailViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ExhibitDetail.objects.all()
    serializer_class = ExhibitDetailSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'name',
        'description', 
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
        queryset = ExhibitDetail.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = ExhibitDetail.objects.all()
        serializer_class = ExhibitDetailExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class EducationalProgramViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'program_type', 
        'min_participant', 
        'max_participant', 
        'price',
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

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = EducationalProgram.objects.all()
        serializer_class = EducationalProgramExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

class EducationalProgramDateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgramDate.objects.all()
    serializer_class = EducationalProgramDateSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'program_id', 
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = EducationalProgramDate.objects.all()
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
    
    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = EducationalProgramApplication.objects.all()
        serializer_class = EducationalProgramApplicationExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

class VisitApplicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VisitApplication.objects.all()
    serializer_class = VisitApplicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'organisation_name', 
        'organisation_category', 
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

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = VisitApplication.objects.all()
        serializer_class = VisitApplicationExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

