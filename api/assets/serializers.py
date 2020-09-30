from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Asset
)

from users.serializers import (
    CustomUserSerializer
)

class AssetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ['id']

class AssetExtendedSerializer(serializers.ModelSerializer):
    pic_id = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = Asset
        fields = '__all__'
        read_only_fields = ['id']
    
