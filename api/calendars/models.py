from __future__ import unicode_literals 
import uuid, datetime
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

class Calendar(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    date_start = models.DateField(default=datetime.date.today)
    date_end = models.DateField(default=datetime.date.today)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)
    activity_cancellation = ArrayField(models.CharField(max_length=100), blank=True, null=True)

    FREQUENCIES = [
        ('HM', 'Hari Mingguan'),
        ('HB', 'Hari Bulanan'),
        ('HT', 'Hari Tahunan'),
        ('NA', 'Tiada')
    ]

    frequency = models.CharField(max_length=2, choices=FREQUENCIES, default='NA')
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.description_ms
