from django.shortcuts import render
from django.db.models import Q

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
 
 