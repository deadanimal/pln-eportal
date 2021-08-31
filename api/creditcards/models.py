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


class CreditCard(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)

    order_amount = models.DecimalField(
        decimal_places=3, max_digits=13, null=True)
    order_creation_time = models.DateTimeField(null=True)
    order_currency = models.CharField(max_length=3, default='MYR')
    order_id = models.CharField(max_length=40, blank=True)
    order_lastupdated_time = models.DateTimeField(null=True)
    order_totalauthorized_amount = models.DecimalField(
        decimal_places=3, max_digits=13, null=True)
    order_totalcaptured_amount = models.DecimalField(
        decimal_places=3, max_digits=13, null=True)
    order_totalrefunded_amount = models.DecimalField(
        decimal_places=3, max_digits=13, null=True)

    session_id = models.CharField(max_length=35, blank=True)

    sourceoffunds_type = models.CharField(max_length=255, default='CARD')
    sourceoffunds_provided_card_number = models.CharField(
        max_length=19, null=True)
    sourceoffunds_provided_card_expiry_month = models.CharField(
        max_length=2, null=True)
    sourceoffunds_provided_card_expiry_year = models.CharField(
        max_length=2, null=True)
    sourceoffunds_provided_card_securitycode = models.CharField(
        max_length=4, null=True)

    transaction_amount = models.DecimalField(
        decimal_places=3, max_digits=13, null=True)
    transaction_currency = models.CharField(max_length=3, default='MYR')
    transaction_id = models.CharField(max_length=40, blank=True)
    transaction_type = models.CharField(max_length=255, blank=True)

    created_date = models.DateTimeField(
        auto_now_add=True)  # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']
