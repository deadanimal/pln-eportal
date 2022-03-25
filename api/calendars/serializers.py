from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Calendar
)

from users.serializers import (
    CustomUserSerializer
)

class CalendarSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Calendar
        fields = '__all__'
        read_only_fields = ['id']
