from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    InvoiceReceipt
)

from users.serializers import (
    CustomUserSerializer
)

from carts.serializers import (
    CartSerializer,
    CartExtendedSerializer
)

from cashtransactions.serializers import (
    CashTransactionSerializer,
    CashTransactionExtendedSerializer
)

from fpxtransactions.serializers import (
    FpxTransactionSerializer
)

from vouchers.serializers import (
    VoucherSerializer
)

class InvoiceReceiptSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = InvoiceReceipt
        fields = '__all__'
        read_only_fields = ['id']


class InvoiceReceiptExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    cart_id = CartExtendedSerializer(read_only=True, many=True)
    fpx_transaction_id = FpxTransactionSerializer(read_only=True)
    voucher_id = VoucherSerializer(read_only=True)
    cash_transaction_id = CashTransactionExtendedSerializer(read_only=True)

    class Meta:
        model = InvoiceReceipt
        fields = '__all__'
        read_only_fields = ['id']
