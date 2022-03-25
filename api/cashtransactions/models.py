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


class CashTransaction(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True)
    attachment = models.FileField(
        null=True, blank=True, upload_to=PathAndRename('payment-attachment'))
    amount_receive = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    amount_change = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00)
    summary = models.TextField(default='NA', null=True, blank=True)

    created_date = models.DateTimeField(
        auto_now_add=True)  # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']
