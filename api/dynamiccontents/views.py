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
    DynamicContent
)

from .serializers import (
    DynamicContentSerializer
)


class DynamicContentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DynamicContent.objects.all()
    serializer_class = DynamicContentSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'title_en',
        'description_en',
        'title_ms',
        'description_ms',
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
        queryset = DynamicContent.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = DynamicContent.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Kandungan dinamik'
        return Response(chain(queryset1))
