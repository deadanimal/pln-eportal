from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

from itertools import chain

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Refund
)

from .serializers import (
    RefundSerializer,
    RefundExtendedSerializer
)


class RefundViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Refund.objects.all()
    serializer_class = RefundSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'refund_type', 'user',
                        'status', 'incharge_id', 'pic_verification_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Refund.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Refund.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Bayaran balik'
        return Response(chain(queryset1))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Refund.objects.all()
        id = request.query_params.get('id', None)
        status = request.query_params.get('status', None)
        user = request.query_params.get('user', None)
        incharge_id = request.query_params.get('incharge_id', None)
        pic_verification_id = request.query_params.get(
            'pic_verification_id', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if status is not None:
            queryset = queryset.filter(status=status)
        if user is not None:
            queryset = queryset.filter(user=user)
        if incharge_id is not None:
            queryset = queryset.filter(incharge_id=incharge_id)
        if pic_verification_id is not None:
            queryset = queryset.filter(pic_verification_id=pic_verification_id)

        serializer_class = RefundExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)
