from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    FpxTransaction,
    BankList,
    ResponseCode
)

from users.serializers import (
    CustomUserSerializer
)


class FpxTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = FpxTransaction
        fields = '__all__'
        read_only_fields = ['id']


class BankListSerializer(serializers.ModelSerializer):

    class Meta:
        model = BankList
        fields = '__all__'
        read_only_fields = ['id']


class ResponseCodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResponseCode
        fields = '__all__'
        read_only_fields = ['id']