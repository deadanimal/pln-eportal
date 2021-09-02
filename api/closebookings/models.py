from __future__ import unicode_literals
import uuid
import datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)


class CloseBooking(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    date_start = models.DateField(default=datetime.date.today, null=True)
    date_end = models.DateField(default=datetime.date.today, null=True)
    title_en = models.CharField(max_length=255, blank=True)
    title_ms = models.CharField(max_length=255, blank=True)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)

    MODULES = [
        ('simulator-ride', 'Kembara Simulasi'),
        ('shows', 'Tayangan'),
        ('facility', 'Fasiliti'),
        ('program', 'Program Pendidikan'),
        ('visit', 'Lawatan')
    ]
    module = models.CharField(
        max_length=50, choices=MODULES, default='simulator-ride')

    created_date = models.DateTimeField(
        auto_now_add=True)  # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms
