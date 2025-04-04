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
    Faq
)

from .serializers import (
    FaqSerializer
)

class FaqViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'question_en',
        'answer_en',
        'question_ms',
        'answer_ms',
        'order',
        'status',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = Faq.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Faq.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'FAQ'
        return Response(chain(queryset1))

