from django.shortcuts import render
from django.db.models import Q

from datetime import datetime
import hashlib
import json
import requests
import pytz

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Analytic
)

from showings.models import (
    ShowBooking
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from venues.models import (
    FacilityBooking
)

from .serializers import (
    AnalyticSerializer
)

class AnalyticViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Analytic.objects.all()
    serializer_class = AnalyticSerializer

    def get_permissions(self):
        permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Analytic.objects.all()
        return queryset

    