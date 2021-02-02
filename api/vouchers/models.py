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

from invoicereceipts.models import (
    InvoiceReceipt
)

class Voucher(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    voucher_code = models.CharField(max_length=10, blank=True)
    voucher_amount = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    validity_until = models.DateField(null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    description = models.TextField(blank=True)

    # status voucher:
    # not_used
    # already_used
    # expired
    STATUS = [
        ('NU', 'Not Used'),
        ('AU', 'Already Used'),
        ('EX', 'Expired')
    ]
    status = models.CharField(choices=STATUS, max_length=2, default='NU')

    invoice_receipt_id = models.ForeignKey(InvoiceReceipt, on_delete=models.CASCADE, null=True, related_name='voucher_invoice_receipt_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']