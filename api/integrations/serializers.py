from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Integration,
    HeadCounter
)

class IntegrationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Integration
        fields = '__all__'
        read_only_fields = ['id']

class HeadCounterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = HeadCounter
        fields = '__all__'
        read_only_fields = ['id']