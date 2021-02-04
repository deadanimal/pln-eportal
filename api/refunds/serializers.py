from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Refund
)

from users.serializers import (
    CustomUserSerializer
)

from fpxtransactions.serializers import (
    BankListSerializer
)


class RefundSerializer(serializers.ModelSerializer):

    class Meta:
        model = Refund
        fields = '__all__'
        read_only_fields = ['id']


class RefundExtendedSerializer(serializers.ModelSerializer):
    bank_id = BankListSerializer(read_only=True)
    incharge_id = CustomUserSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)
    pic_verification_id = CustomUserSerializer(read_only=True)

    class Meta:
        model = Refund
        fields = '__all__'
        read_only_fields = ['id']
