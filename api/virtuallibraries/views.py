from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from virtuallibraries.models import (
    Virtuallibrary
)

from virtuallibraries.serializers import (
    VirtuallibrarySerializer
)

class VirtuallibraryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Virtuallibrary.objects.all()
    serializer_class = VirtuallibrarySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'title', 
        'year', 
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
        queryset = Virtuallibrary.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Virtuallibrary.objects.all()
            else:
                queryset = Virtuallibrary.objects.filter(company=company.id)
        """
        return queryset    
 
 