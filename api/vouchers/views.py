from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

import datetime
import pytz

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Voucher
)

from .serializers import (
    VoucherSerializer,
    VoucherExtendedSerializer
)


class VoucherViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Voucher.objects.all()
    serializer_class = VoucherSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'voucher_code', 'user', 'status',
                        'invoice_receipt_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Voucher.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Voucher.objects.all()
        id = request.query_params.get('id', None)
        status = request.query_params.get('status', None)
        user = request.query_params.get('user', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if status is not None:
            queryset = queryset.filter(status=status)
        if user is not None:
            queryset = queryset.filter(user=user)

        serializer_class = VoucherExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)
