from django.shortcuts import render
from django.db.models import Q, Sum

from itertools import chain

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from publications.models import (
    Publication,
    PublicationCategory
)

from publications.serializers import (
    PublicationSerializer,
    PublicationExtendedSerializer,
    PublicationCategorySerializer
)


class PublicationCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = PublicationCategory.objects.all()
    serializer_class = PublicationCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'icon',
        'status',
        'created_date',
        'modified_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = PublicationCategory.objects.all()
        return queryset


class PublicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'call_number',
        'author_name',
        'editor_name',
        'publisher_name',
        'published_date',
        'isbn',
        'issn',
        'publication_category_id',
        'status',
        'created_date',
        'modified_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Publication.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Publication.objects.all()
        serializer_class = PublicationExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_total_download_pdf(self, request):

        queryset = Publication.objects.aggregate(
            total_download_pdf=Sum('download_pdf_counter'))

        return Response(queryset)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        print('search_keyword', search_keyword)
        print('lang', lang)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = Publication.objects.filter(
                    description_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = Publication.objects.filter(
                    description_ms__icontains=search_keyword)
            if queryset:
                serializer_class = PublicationExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])

    @action(methods=['GET'], detail=False)
    def get_analytic_total_download_pdf(self, request):

        queryset = Publication.objects.select_related('publication_category_id').values(
            'publication_category_id__name_ms', 'title_ms', 'download_pdf_counter').order_by('publication_category_id__name_ms')

        return Response(queryset)

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Publication.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset2 = PublicationCategory.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Penerbitan'
        for qs in queryset2:
            qs['history_model_name'] = 'Kategori penerbitan'
        return Response(chain(queryset1, queryset2))
