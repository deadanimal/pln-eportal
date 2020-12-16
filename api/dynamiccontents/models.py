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

class DynamicContent(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    title_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_ms = models.TextField(blank=True)

    CATEGORIES = [
        ('about-us', 'Mengenai Kami'),
        ('mission-vision', 'Visi & Misi'),
        ('noc', 'Maklumat NOC'),
        ('not-available', 'Tiada')
    ]

    category = models.CharField(max_length=20, choices=CATEGORIES, default='not-available')
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms
