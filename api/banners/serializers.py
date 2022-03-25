from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Banner
)

from events.serializers import (
    EducationalProgramSerializer
)

from users.serializers import (
    CustomUserSerializer
)

class BannerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Banner
        fields = '__all__'
        read_only_fields = ['id']

class BannerExtendedSerializer(serializers.ModelSerializer):
    program_id = EducationalProgramSerializer(read_only=True)
    
    class Meta:
        model = Banner
        fields = '__all__'
        read_only_fields = ['id']

