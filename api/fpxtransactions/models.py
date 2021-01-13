from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class FpxTransaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    fpx_msgType = models.CharField(max_length=2, blank=True)
    fpx_msgToken = models.CharField(max_length=2, blank=True)
    fpx_fpxTxnId = models.CharField(max_length=16, blank=True)
    fpx_sellerExId = models.CharField(max_length=10, blank=True)
    fpx_sellerExOrderNo = models.CharField(max_length=40, blank=True)
    fpx_fpxTxnTime = models.CharField(max_length=14, blank=True)
    fpx_sellerTxnTime = models.CharField(max_length=14, blank=True)
    fpx_sellerOrderNo = models.CharField(max_length=40, blank=True)
    fpx_sellerId = models.CharField(max_length=10, blank=True)
    fpx_sellerBankCode = models.CharField(max_length=2, blank=True)
    fpx_txnCurrency = models.CharField(max_length=3, blank=True)
    fpx_txnAmount = models.DecimalField(decimal_places=2, max_digits=16, null=True)
    fpx_buyerEmail = models.CharField(max_length=50, blank=True)
    fpx_checkSum = models.TextField(blank=True)
    fpx_buyerName = models.CharField(max_length=40, blank=True)
    fpx_buyerBankId = models.CharField(max_length=10, blank=True)
    fpx_buyerBankBranch = models.CharField(max_length=10, blank=True)
    fpx_buyerAccNo = models.CharField(max_length=20, blank=True)
    fpx_buyerId = models.CharField(max_length=20, blank=True)
    fpx_makerName = models.CharField(max_length=40, blank=True)
    fpx_buyerIban = models.CharField(max_length=35, blank=True)
    fpx_debitAuthCode = models.CharField(max_length=2, blank=True)
    fpx_debitAuthNo = models.CharField(max_length=10, blank=True)
    fpx_creditAuthCode = models.CharField(max_length=2, blank=True)
    fpx_creditAuthNo = models.CharField(max_length=10, blank=True)
    fpx_xtrainfo = models.CharField(max_length=6, blank=True)
    fpx_productDesc = models.CharField(max_length=30, blank=True)
    fpx_version = models.CharField(max_length=3, blank=True, default='7.0')
    fpx_eaccountNum = models.CharField(max_length=40, blank=True)
    fpx_ebuyerId = models.CharField(max_length=40, blank=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


class BankList(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    bank_id = models.CharField(max_length=10, blank=True)
    bank_name = models.CharField(max_length=255, blank=True)
    bank_display_name = models.CharField(max_length=255, blank=True)
    bank_active = models.CharField(max_length=1, blank=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

