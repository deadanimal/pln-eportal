from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    DailyOperatingReport,
    Contractor,
    OperatingSchedule,
    VisitorSummary,
    DetailReport
)

from users.serializers import (
    CustomUserSerializer
)


class DailyOperatingReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = DailyOperatingReport
        fields = '__all__'
        read_only_fields = ['id']


class DailyOperatingReportExtendedSerializer(serializers.ModelSerializer):
    report_by = CustomUserSerializer(read_only=True)

    class Meta:
        model = DailyOperatingReport
        fields = '__all__'
        read_only_fields = ['id']


class ContractorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Contractor
        fields = '__all__'
        read_only_fields = ['id']

    
class OperatingScheduleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OperatingSchedule
        fields = '__all__'
        read_only_fields = ['id']


class VisitorSummarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VisitorSummary
        fields = '__all__'
        read_only_fields = ['id']


class DetailReportSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = DetailReport
        fields = '__all__'
        read_only_fields = ['id']
