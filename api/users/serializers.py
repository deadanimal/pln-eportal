from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
from django.utils.timezone import now
# from api.settings import AWS_S3_ENDPOINT_URL, AWS_STORAGE_BUCKET_NAME

from .models import (
    CustomUser
)

class CustomUserSerializer(serializers.ModelSerializer):
    # nric_picture = Base64ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = (
            'id',
            'full_name', 
            'nric', 
            'nric_picture', 
            'email', 
            'phone', 
            'birth_date', 
            'age',
            'address',
            'postcode',
            'city',
            'state',
            'country',
            'user_type',
            'gender_type',
            'race_type',
            'is_active',
            'date_joined'
        )
        read_only_fields = ('id', 'date_joined')

