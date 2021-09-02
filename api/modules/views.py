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
    Module,
    SubModule
)

from .serializers import (
    ModuleSerializer,
    SubModuleSerializer
)


class ModuleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'description_en',
        'title_ms',
        'description_ms',
        'module',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Module.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Module.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        queryset2 = SubModule.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Modul'
        for qs in queryset2:
            qs['history_model_name'] = 'Submodul'
        return Response(chain(queryset1, queryset2))


class SubModuleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SubModule.objects.all()
    serializer_class = SubModuleSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'description_en',
        'title_ms',
        'description_ms',
        'submodule',
        'status'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = SubModule.objects.all()
        return queryset
