from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class Integration(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)

    TYPES = [
        ('VR', 'Verify Recaptcha'),
        ('SD', 'Statcounter - Summary Stats - Daily'),
        ('SY', 'Statcounter - Sumaary Stats - Yearly'),
        ('PH', 'Head Counter - Post'),
        ('GH', 'Head Counter - Get'),
        ('NA', 'Not Available')
    ]

    integration_type = models.CharField(max_length=2, choices=TYPES, default='NA')
    # status
    # True - Success
    # False - Failure
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.integration_type


class HeadCounter(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)

    total_in = models.IntegerField(default=0, null=True)
    total_out = models.IntegerField(default=0, null=True)
    total_stay = models.IntegerField(default=0, null=True)
    date = models.DateField(null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

