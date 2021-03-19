from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    ErrorLog
)

from users.serializers import (
    CustomUserSerializer
)

class ErrorLogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ErrorLog
        fields = '__all__'
        read_only_fields = ['id']

class ErrorLogExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = ErrorLog
        fields = '__all__'
        read_only_fields = ['id']


