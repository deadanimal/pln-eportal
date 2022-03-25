from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    QuickLinkCategory,
    QuickLink
)

from users.serializers import (
    CustomUserSerializer
)

class QuickLinkCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = QuickLinkCategory
        fields = '__all__'
        read_only_fields = ['id']


class QuickLinkSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = QuickLink
        fields = '__all__'
        read_only_fields = ['id']


class QuickLinkExtendedSerializer(serializers.ModelSerializer):
    category = QuickLinkCategorySerializer(read_only=True)
    
    class Meta:
        model = QuickLink
        fields = '__all__'
        read_only_fields = ['id']

