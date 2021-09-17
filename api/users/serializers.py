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
    Role,
    CustomUser,
    Supervisor
)

class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'
        read_only_fields = ['id']

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
            'address_1',
            'address_2',
            'address_3',
            'postcode',
            'city',
            'state',
            'country',
            'staff_id',
            'user_type',
            'role',
            'gender_type',
            'race_type',
            'is_active',
            'date_joined'
        )
        read_only_fields = ('id', 'date_joined')

class CustomUserExtendedSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ['id']

class SupervisorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supervisor
        fields = '__all__'
        read_only_fields = ['id']

class SupervisorExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Supervisor
        fields = '__all__'
        read_only_fields = ['id']
