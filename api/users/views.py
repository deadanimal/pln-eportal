from django.http.response import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['user_type'] = user.user_type

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from django.shortcuts import render
from django.db.models import Q

from itertools import chain
import json

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from users.models import (
    CustomUser,
    Supervisor
)

from users.serializers import (
    CustomUserSerializer,
    SupervisorSerializer,
    SupervisorExtendedSerializer
)

class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'age', 
        'postcode', 
        'city', 
        'state', 
        'country',
        'staff_id', 
        'user_type', 
        'gender_type',
        'race_type',
        'is_active',
        'date_joined'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CustomUser.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = User.objects.all()
            else:
                queryset = User.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = CustomUser.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            if qs['user_type'] != 'CS':
                qs['history_model_name'] = 'Pengguna'
            elif qs['user_type'] == 'CS':
                qs['history_model_name'] = 'Pelanggan'
        return Response(chain(queryset1))

    @action(methods=['POST'], detail=True)
    def change_password(self, request, pk=None, *args, **kwargs):
        received_data = json.loads(request.body)
        user = CustomUser.objects.filter(id=pk).first()
        user.set_password(received_data['password'])
        user.save()

        return Response('Ok')

class SupervisorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'id',
        'user',
        'date_on_duty'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Supervisor.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def get_audit_log(self, request, *args, **kwargs):
        queryset1 = Supervisor.history.all().values('history_id', 'history_date', 'history_change_reason', 'history_type', 'history_user__full_name')
        for qs in queryset1:
            qs['history_model_name'] = 'Penyelia'
        return Response(chain(queryset1))

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Supervisor.objects.all()
        id = request.query_params.get('id', None)
        user = request.query_params.get('user', None)
        date_on_duty = request.query_params.get('date_on_duty', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if date_on_duty is not None:
            queryset = queryset.filter(date_on_duty=date_on_duty)
        if user is not None:
            queryset = queryset.filter(user=user)


        serializer_class = SupervisorExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)    
 
