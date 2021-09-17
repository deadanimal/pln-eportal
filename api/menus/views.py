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
    Menu,
    MenuRole
)

from .serializers import (
    MenuSerializer,
    MenuRoleSerializer,
    MenuRoleExtendedSerializer
)


class MenuViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'path',
        'title',
        'type',
        'active',
        'mainmenu'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Menu.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Menu.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Menu'
        return Response(chain(queryset1))

class MenuRoleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = MenuRole.objects.all()
    serializer_class = MenuRoleSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'menu',
        'role'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = MenuRole.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = MenuRole.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Menu & Peranan'
        return Response(chain(queryset1))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = MenuRole.objects.all()
        id = request.query_params.get('id', None)
        role = request.query_params.get('role', None)
        menu = request.query_params.get('menu', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if role is not None:
            queryset = queryset.filter(role__code=role)
        if menu is not None:
            queryset = queryset.filter(menu=menu)


        serializer_class = MenuRoleExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)
