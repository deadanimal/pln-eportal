from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    SurveyAnswer,
    SurveyQuestion
)

from .serializers import (
    SurveyAnswerSerializer,
    SurveyAnswerExtendedSerializer,
    SurveyQuestionSerializer
)

class SurveyAnswerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SurveyAnswer.objects.all()
    serializer_class = SurveyAnswerSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['survey_question_id', 'user_id', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = SurveyAnswer.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):
        
        queryset = SurveyAnswer.objects.all()
        serializer_class = SurveyAnswerExtendedSerializer(queryset, many=True)
        
        return Response(serializer_class.data)


class SurveyQuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = SurveyQuestion.objects.all()
    serializer_class = SurveyQuestionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'questionnaire_fieldname', 'questionnaire_type', 'questionnaire_module', 'questionnaire_status', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = SurveyQuestion.objects.all()
        return queryset

