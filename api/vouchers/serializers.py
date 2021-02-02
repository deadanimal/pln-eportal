from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Voucher
)

from users.serializers import (
    CustomUserSerializer
)

from invoicereceipts.serializers import (
    InvoiceReceiptSerializer,
    InvoiceReceiptExtendedSerializer
)

class VoucherSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Voucher
        fields = '__all__'
        read_only_fields = ['id']


class VoucherExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    invoice_receipt_id = InvoiceReceiptExtendedSerializer(read_only=True)

    class Meta:
        model = Voucher
        fields = '__all__'
        read_only_fields = ['id']
