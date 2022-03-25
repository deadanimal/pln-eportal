from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    PosDailyReport
)

from users.serializers import (
    CustomUserSerializer
)


class PosDailyReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = PosDailyReport
        fields = '__all__'
        read_only_fields = ['id']


class PosDailyReportExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = PosDailyReport
        fields = '__all__'
        read_only_fields = ['id']
