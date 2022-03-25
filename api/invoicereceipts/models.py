from __future__ import unicode_literals 
import uuid, datetime, pytz
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

from carts.models import (
    Cart
)

from cashtransactions.models import (
    CashTransaction
)

from fpxtransactions.models import (
    FpxTransaction
)

from vouchers.models import (
    Voucher
)

class InvoiceReceipt(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    total_price_before_voucher = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total_voucher = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total_price_after_voucher = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    # status invoice & receipt:
    # invoice_created
    # pending_payment
    # payment_successful
    # payment_rejected
    # receipt_created 
    STATUS = [
        ('IC', 'Invoice Created'),
        ('PP', 'Pending Payment'),
        ('PS', 'Payment Successful'),
        ('PR', 'Payment Rejected'),
        ('RC', 'Receipt Created')
    ]
    status = models.CharField(choices=STATUS, max_length=2, default='IC')
    TYPE = [
        ('T', 'Tunai / Cash'),
        ('F', 'FPX'),
        ('C', 'Kad Kredit / Credit Card Portal'),
        ('D', 'Kad Debit / Debit Card'),
        ('Q', 'QR Pay'),
        ('K', 'Kad Kredit / Credit Card POS')
    ]
    type = models.CharField(choices=TYPE, max_length=1, default='T')
    invoice_created_datetime = models.DateTimeField(null=True)
    pending_payment_datetime = models.DateTimeField(null=True)
    payment_successful_datetime = models.DateTimeField(null=True)
    payment_rejected_datetime = models.DateTimeField(null=True)
    receipt_created_datetime = models.DateTimeField(null=True)
    qr_notes = models.CharField(max_length=200, blank=True, null=True)

    invoice_running_no = models.CharField(max_length=100, blank=True)
    receipt_running_no = models.CharField(max_length=100, blank=True)

    cart_id = models.ManyToManyField(Cart, related_name='invoice_receipt_cart', blank=True)
    fpx_transaction_id = models.ForeignKey(FpxTransaction, on_delete=models.CASCADE, null=True, related_name='invoice_receipt_fpx_transaction_id')
    voucher_id = models.ForeignKey(Voucher, on_delete=models.CASCADE, null=True, related_name='invoice_receipt_voucher_id')
    cash_transaction_id = models.ForeignKey(CashTransaction, on_delete=models.CASCADE, null=True, related_name='invoice_receipt_cash_transaction_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if self.status == 'IC':
            prefix = '{}I'.format(datetime.datetime.now(
                timezone_).strftime('%Y%m%d'))
            current_year = datetime.datetime.now(timezone_).strftime('%Y')
            prev_instances = self.__class__.objects.filter(
                invoice_running_no__contains=current_year).order_by('-invoice_running_no')
            if prev_instances.exists():
                last_instance_id = prev_instances.first(
                ).invoice_running_no[-7:]
                self.invoice_running_no = prefix + \
                    '{0:07d}'.format(int(last_instance_id)+1)
            else:
                self.invoice_running_no = prefix+'{0:07d}'.format(1)

        super(InvoiceReceipt, self).save(*args, **kwargs)

    class meta:
        ordering = ['-created_date']
