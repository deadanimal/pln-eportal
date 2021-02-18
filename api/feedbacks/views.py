from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from feedbacks.models import (
    Feedback,
    Rating
)

from feedbacks.serializers import (
    FeedbackSerializer,
    FeedbackExtendedSerializer,
    RatingSerializer
)


class FeedbackViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'comment_user',
        'comment_admin',
        'user_id',
        'module',
        'status',
        'display',
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
        queryset = Feedback.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Feedback.objects.all()
            else:
                queryset = Feedback.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Feedback.objects.all()
        module = request.query_params.get('module', None)
        display = request.query_params.get('display', None)
        if module is not None:
            queryset = queryset.filter(module=module)
        if display is not None:
            queryset = queryset.filter(display=display)

        serializer_class = FeedbackExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)


class RatingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'comment',
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
        queryset = Rating.objects.all()
        return queryset
