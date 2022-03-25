from django.shortcuts import render
from django.db.models import Q

from itertools import chain

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    QuickLinkCategory,
    QuickLink
)

from .serializers import (
    QuickLinkCategorySerializer,
    QuickLinkSerializer,
    QuickLinkExtendedSerializer
)

class QuickLinkCategoryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = QuickLinkCategory.objects.all()
    serializer_class = QuickLinkCategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'order',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = QuickLinkCategory.objects.all()
        return queryset


class QuickLinkViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = QuickLink.objects.all()
    serializer_class = QuickLinkSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name_en',
        'name_ms',
        'link', 
        'category', 
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = QuickLink.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = QuickLink.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset2 = QuickLinkCategory.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Pautan pantas'
        for qs in queryset2:
            qs['history_model_name'] = 'Kategori pautan pantas'
        return Response(chain(queryset1, queryset2))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = QuickLink.objects.all()
        serializer_class = QuickLinkExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)

