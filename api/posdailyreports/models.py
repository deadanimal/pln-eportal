from __future__ import unicode_literals
import uuid
import datetime
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)


class PosDailyReport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    STATUS = [
        ('OP', 'Counter Open'),
        ('CL', 'Counter Closed')
    ]

    status = models.CharField(choices=STATUS, max_length=2, default='OP')
    opened_timestamp = models.CharField(max_length=100, blank=True, null=True)
    closed_timestamp = models.CharField(max_length=100, blank=True, null=True)

    # cash tracking
    initial_cash = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)
    expected_cash_at_closing = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)

    gross = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    transactions = models.IntegerField(default=0, null=True)
    refund = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    refund_transactions = models.IntegerField(default=0, null=True)
    net = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    # sales by other payment method
    debit = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    credit = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    qr = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    debit_transactions = models.IntegerField(null=True)
    credit_transactions = models.IntegerField(null=True)
    qr_transactions = models.IntegerField(null=True)

    # purchase history
    # show
    show_cz_adult = models.IntegerField(default=0, null=True)
    show_cz_kid = models.IntegerField(default=0, null=True)
    show_cz_student = models.IntegerField(default=0, null=True)
    show_cz_oku = models.IntegerField(default=0, null=True)
    show_cz_old_folk = models.IntegerField(default=0, null=True)

    show_nz_adult = models.IntegerField(default=0, null=True)
    show_nz_kid = models.IntegerField(default=0, null=True)
    show_nz_student = models.IntegerField(default=0, null=True)
    show_nz_oku = models.IntegerField(default=0, null=True)
    show_nz_old_folk = models.IntegerField(default=0, null=True)

    # space
    space_cz_adult = models.IntegerField(default=0, null=True)
    space_cz_kid = models.IntegerField(default=0, null=True)
    space_nz_adult = models.IntegerField(default=0, null=True)
    space_nz_kid = models.IntegerField(default=0, null=True)

    # facility
    total_facility_paid = models.DecimalField(
        max_digits=10, decimal_places=2, null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']
