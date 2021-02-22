from __future__ import unicode_literals
import uuid
import datetime
import math
import random
import string
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


class TicketPrice(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=100, blank=True)
    title_ms = models.CharField(max_length=100, blank=True)
    price_citizen = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    price_noncitizen = models.DecimalField(max_digits=8, decimal_places=2, null=True)

    TICKET_CATEGORY = [
        ('AD', 'Adult'),
        ('KD', 'Kid'),
        ('OF', 'Old Folk'),
        ('SD', 'Student'),
        ('OK', 'OKU')
    ]
    ticket_category = models.CharField(
        max_length=2, choices=TICKET_CATEGORY, default='AD')

    MODULES = [
        ('simulator-ride', 'Kembara Simulasi'),
        ('shows', 'Tayangan')
    ]
    module = models.CharField(
        max_length=50, choices=MODULES, default='simulator-ride')

    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.ticket_title_ms
