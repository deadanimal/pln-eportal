from django.shortcuts import render
from django.db import models
from django.db.models import Count, Func, Q
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
    Exhibit,
    ExhibitList,
    ExhibitDetail,
    ExhibitDetailImage,
    EducationalProgram,
    EducationalProgramDate,
    EducationalProgramImage,
    EducationalProgramActivity,
    EducationalProgramApplication,
    EducationalProgramForm,
    Visit,
    VisitApplication
)

from .serializers import (
    ExhibitSerializer,
    ExhibitExtendedSerializer,
    ExhibitListSerializer,
    ExhibitListExtendedSerializer,
    ExhibitDetailSerializer,
    ExhibitDetailExtendedSerializer,
    ExhibitDetailImageSerializer,
    ExhibitDetailImageExtendedSerializer,
    EducationalProgramSerializer,
    EducationalProgramExtendedSerializer,
    EducationalProgramDateSerializer,
    EducationalProgramDateExtendedSerializer,
    EducationalProgramImageSerializer,
    EducationalProgramActivitySerializer,
    EducationalProgramApplicationSerializer,
    EducationalProgramApplicationExtendedSerializer,
    EducationalProgramFormSerializer,
    EducationalProgramFormExtendedSerializer,
    VisitSerializer,
    VisitApplicationSerializer,
    VisitApplicationExtendedSerializer
)


class Year(Func):
    function = 'EXTRACT'
    template = '%(function)s(YEAR from %(expressions)s)'
    output_field = models.IntegerField()


class ExhibitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Exhibit.objects.all()
    serializer_class = ExhibitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
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
        'id',
        'exhibit_id',
        'name_en',
        'name_ms',
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
        'name_en',
        'name_ms',
        'description_en',
        'description_ms',
        'exhibit_list_id',
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


class ExhibitDetailImageViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ExhibitDetailImage.objects.all()
    serializer_class = ExhibitDetailImageSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'exhibit_detail_id',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ExhibitDetailImage.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = ExhibitDetailImage.objects.all()
        serializer_class = ExhibitDetailImageExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)


class EducationalProgramViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgram.objects.all()
    serializer_class = EducationalProgramSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'program_code',
        'program_type',
        'program_category',
        'program_subcategory',
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
        serializer_class = EducationalProgramExtendedSerializer(
            queryset, many=True)

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

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = EducationalProgramDate.objects.all()
        serializer_class = EducationalProgramDateExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)


class EducationalProgramImageViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgramImage.objects.all()
    serializer_class = EducationalProgramImageSerializer
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
        queryset = EducationalProgramImage.objects.all()
        return queryset


class EducationalProgramActivityViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgramActivity.objects.all()
    serializer_class = EducationalProgramActivitySerializer
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
        queryset = EducationalProgramActivity.objects.all()
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
        serializer_class = EducationalProgramApplicationExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['POST'], detail=False)
    def number_of_program_participants(self, request, *args, **kwargs):

        year = self.request.data['year'] if self.request.data['year'] else None
        if (year is not None):
            data = list(EducationalProgramApplication.objects.all().annotate(year=Year('modified_date'))
                        .values('status', 'year').annotate(total=Count('status')).filter(modified_date__year=year).order_by())
        else:
            data = list(EducationalProgramApplication.objects.all().annotate(year=Year('modified_date'))
                        .values('status', 'year').annotate(total=Count('status')).order_by())

        queryset = EducationalProgramApplication.objects.all().values(
            'status').annotate(total=Count('status'))

        return JsonResponse(data, safe=False)

    @action(methods=['GET'], detail=False)
    def get_dashboard(self, request):

        current_year = datetime.today().year
        current_month = datetime.today().month

        queryset_created = EducationalProgramApplication.objects.filter(created_date__month=current_month, created_date__year=current_year).values()
        queryset_approved = EducationalProgramApplication.objects.filter(approved_date__month=current_month, approved_date__year=current_year).values()
        queryset_rejected = EducationalProgramApplication.objects.filter(rejected_date__month=current_month, rejected_date__year=current_year).values()

        data = {
            'queryset_created': queryset_created,
            'queryset_approved': queryset_approved,
            'queryset_rejected': queryset_rejected
        }

        return Response(data)


class EducationalProgramFormViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EducationalProgramForm.objects.all()
    serializer_class = EducationalProgramFormSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'customer_id',
        'educational_program_id',
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
        queryset = EducationalProgramForm.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = EducationalProgramForm.objects.all()
        serializer_class = EducationalProgramFormExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_dashboard(self, request):

        current_year = datetime.today().year
        current_month = datetime.today().month

        queryset_created = EducationalProgramForm.objects.filter(created_date__month=current_month, created_date__year=current_year).values()
        queryset_approved = EducationalProgramForm.objects.filter(approved_date__month=current_month, approved_date__year=current_year).values()
        queryset_rejected = EducationalProgramForm.objects.filter(rejected_date__month=current_month, rejected_date__year=current_year).values()

        data = {
            'queryset_created': queryset_created,
            'queryset_approved': queryset_approved,
            'queryset_rejected': queryset_rejected
        }

        return Response(data)


class VisitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Visit.objects.all()
    serializer_class = VisitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'title',
        'description',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Visit.objects.all()
        return queryset


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
        serializer_class = VisitApplicationExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)
