from django.shortcuts import render
from django.db.models import Q, Sum

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from virtuallibraries.models import (
    VirtualLibraryCategory,
    VirtualLibraryArticle,
    VirtualLibraryCollection,
    VirtualLibraryBook,
    VirtualLibrarySerialPublication,
    VirtualLibraryESourceCategory,
    VirtualLibraryESource,
    VirtualLibraryArchiveKutubkhanahCategory,
    VirtualLibraryArchiveKutubkhanah
)

from virtuallibraries.serializers import (
    VirtualLibraryCategorySerializer,
    VirtualLibraryArticleSerializer,
    VirtualLibraryArticleExtendedSerializer,
    VirtualLibraryCollectionSerializer,
    VirtualLibraryCollectionExtendedSerializer,
    VirtualLibraryBookSerializer,
    VirtualLibraryBookExtendedSerializer,
    VirtualLibrarySerialPublicationSerializer,
    VirtualLibrarySerialPublicationExtendedSerializer,
    VirtualLibraryESourceCategorySerializer,
    VirtualLibraryESourceCategoryExtendedSerializer,
    VirtualLibraryESourceSerializer,
    VirtualLibraryESourceExtendedSerializer,
    VirtualLibraryArchiveKutubkhanahCategorySerializer,
    VirtualLibraryArchiveKutubkhanahCategoryExtendedSerializer,
    VirtualLibraryArchiveKutubkhanahSerializer,
    VirtualLibraryArchiveKutubkhanahExtendedSerializer
)


class VirtualLibraryCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryCategory.objects.all()
    serializer_class = VirtualLibraryCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'icon',
        'link',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryCategory.objects.all()
        return queryset


class VirtualLibraryArticleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryArticle.objects.all()
    serializer_class = VirtualLibraryArticleSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'description_en',
        'description_ms',
        'date',
        'virtual_library_article_category_id'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryArticle.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryArticle.objects.all()
        serializer_class = VirtualLibraryArticleExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_total_download_pdf(self, request):

        queryset = VirtualLibraryArticle.objects.aggregate(
            total_download_pdf=Sum('download_pdf_counter'))

        return Response(queryset)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = VirtualLibraryArticle.objects.filter(
                    description_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = VirtualLibraryArticle.objects.filter(
                    description_ms__icontains=search_keyword)
            if queryset:
                serializer_class = VirtualLibraryArticleExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])

    @action(methods=['GET'], detail=False)
    def get_analytic_total_download_pdf(self, request):

        queryset = VirtualLibraryArticle.objects.select_related('virtual_library_article_category_id').values(
            'virtual_library_article_category_id__name_ms', 'name_ms', 'download_pdf_counter').order_by('virtual_library_article_category_id__name_ms')

        return Response(queryset)


class VirtualLibraryCollectionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryCollection.objects.all()
    serializer_class = VirtualLibraryCollectionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'icon',
        'link',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryCollection.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryCollection.objects.all()
        serializer_class = VirtualLibraryCollectionExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)


class VirtualLibraryBookViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryBook.objects.all()
    serializer_class = VirtualLibraryBookSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'title_ms',
        'description_en',
        'description_ms',
        'call_number',
        'author',
        'author_added',
        'editor',
        'isbn',
        'issn',
        'year',
        'publisher_name',
        'published_date',
        'notes',
        'status',
        'virtual_library_collection_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryBook.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryBook.objects.all()
        serializer_class = VirtualLibraryBookExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_total_download_pdf(self, request):

        queryset = VirtualLibraryBook.objects.aggregate(
            total_download_pdf=Sum('download_pdf_counter'))

        return Response(queryset)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = VirtualLibraryBook.objects.filter(
                    description_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = VirtualLibraryBook.objects.filter(
                    description_ms__icontains=search_keyword)
            if queryset:
                serializer_class = VirtualLibraryBookExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])

    @action(methods=['GET'], detail=False)
    def get_analytic_total_download_pdf(self, request):

        queryset = VirtualLibraryBook.objects.select_related('virtual_library_collection_id').values(
            'virtual_library_collection_id__name_ms', 'title_ms', 'download_pdf_counter').order_by('virtual_library_collection_id__name_ms')

        return Response(queryset)


class VirtualLibrarySerialPublicationViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibrarySerialPublication.objects.all()
    serializer_class = VirtualLibrarySerialPublicationSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'title_ms',
        'description_en',
        'description_ms',
        'call_number',
        'author',
        'author_added',
        'editor',
        'isbn',
        'issn',
        'year',
        'publisher_name',
        'published_date',
        'notes',
        'status',
        'virtual_library_collection_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibrarySerialPublication.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibrarySerialPublication.objects.all()
        serializer_class = VirtualLibrarySerialPublicationExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_total_download_pdf(self, request):

        queryset = VirtualLibrarySerialPublication.objects.aggregate(
            total_download_pdf=Sum('download_pdf_counter'))

        return Response(queryset)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = VirtualLibrarySerialPublication.objects.filter(
                    description_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = VirtualLibrarySerialPublication.objects.filter(
                    description_ms__icontains=search_keyword)
            if queryset:
                serializer_class = VirtualLibrarySerialPublicationExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])

    @action(methods=['GET'], detail=False)
    def get_analytic_total_download_pdf(self, request):

        queryset = VirtualLibrarySerialPublication.objects.select_related('virtual_library_collection_id').values(
            'virtual_library_collection_id__name_ms', 'title_ms', 'download_pdf_counter').order_by('virtual_library_collection_id__name_ms')

        return Response(queryset)


class VirtualLibraryESourceCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryESourceCategory.objects.all()
    serializer_class = VirtualLibraryESourceCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'icon',
        'status',
        'virtual_library_collection_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryESourceCategory.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryESourceCategory.objects.all()
        serializer_class = VirtualLibraryESourceCategoryExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)


class VirtualLibraryESourceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryESource.objects.all()
    serializer_class = VirtualLibraryESourceSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'link',
        'status',
        'virtual_library_esource_category_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryESource.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryESource.objects.all()
        serializer_class = VirtualLibraryESourceExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = VirtualLibraryESource.objects.filter(
                    name_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = VirtualLibraryESource.objects.filter(
                    name_ms__icontains=search_keyword)
            if queryset:
                serializer_class = VirtualLibraryESourceExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])


class VirtualLibraryArchiveKutubkhanahCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryArchiveKutubkhanahCategory.objects.all()
    serializer_class = VirtualLibraryArchiveKutubkhanahCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'icon',
        'archive_from',
        'status',
        'virtual_library_collection_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryArchiveKutubkhanahCategory.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryArchiveKutubkhanahCategory.objects.all()
        serializer_class = VirtualLibraryArchiveKutubkhanahCategoryExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)


class VirtualLibraryArchiveKutubkhanahViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VirtualLibraryArchiveKutubkhanah.objects.all()
    serializer_class = VirtualLibraryArchiveKutubkhanahSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'link',
        'status',
        'virtual_library_archivekutubkhanah_category_id',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VirtualLibraryArchiveKutubkhanah.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = VirtualLibraryArchiveKutubkhanah.objects.all()
        serializer_class = VirtualLibraryArchiveKutubkhanahExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def get_search_keyword(self, request):

        search_keyword = request.query_params.get('search_keyword', None)
        lang = request.query_params.get('lang', None)
        if search_keyword is not None and lang is not None:
            if lang == 'en':
                queryset = VirtualLibraryArchiveKutubkhanah.objects.filter(
                    name_en__icontains=search_keyword)
            elif lang == 'ms':
                queryset = VirtualLibraryArchiveKutubkhanah.objects.filter(
                    name_ms__icontains=search_keyword)
            if queryset:
                serializer_class = VirtualLibraryArchiveKutubkhanahExtendedSerializer(
                    queryset, many=True)
                return Response(serializer_class.data)
            else:
                return Response(data=[])
        else:
            return Response(data=[])
