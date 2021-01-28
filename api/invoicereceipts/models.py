from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

from carts.models import (
    Cart
)

from fpxtransactions.models import (
    FpxTransaction
)

class InvoiceReceipt(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    total_all_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
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
    invoice_created_datetime = models.DateTimeField(null=True)
    pending_payment_datetime = models.DateTimeField(null=True)
    payment_successful_datetime = models.DateTimeField(null=True)
    payment_rejected_datetime = models.DateTimeField(null=True)
    receipt_created_datetime = models.DateTimeField(null=True)

    cart_id = models.ManyToManyField(Cart, related_name='invoice_receipt_cart', blank=True)
    fpx_transaction_id = models.ForeignKey(FpxTransaction, on_delete=models.CASCADE, null=True, related_name='invoice_receipt_fpx_transaction_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']