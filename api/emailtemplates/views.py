from django.shortcuts import render
from django.core.mail import send_mail
from django.db.models import Q
from django.template import Context, Template
from django.utils.html import strip_tags

from itertools import chain
import json

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    EmailTemplate
)

from .serializers import (
    EmailTemplateSerializer
)

class EmailTemplateViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = EmailTemplate.objects.all()
    serializer_class = EmailTemplateSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'name',
        'code',
        'subject',
        'status',
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = EmailTemplate.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = EmailTemplate.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Templat emel'
        return Response(chain(queryset1))

    @action(methods=['POST'], detail=False)
    def sending_email(self, request, *args, **kwargs):

        code = self.request.data['code']
        to = self.request.data['to']
        context = self.request.data['context'] if self.request.data['context'] else None
        email_template = EmailTemplate.objects.filter(code=code)
        if email_template:
            subject = email_template[0].subject
            t = Template(email_template[0].body)
            c = Context(context) if context else Context()
            html_message = t.render(c)
            plain_message = strip_tags(html_message)
            to = to

            res = send_mail(subject, plain_message, None, [to], html_message=html_message, fail_silently=False)
            return Response(data=res, status=status.HTTP_200_OK)

        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


