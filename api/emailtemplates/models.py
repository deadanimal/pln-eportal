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

class EmailTemplate(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA', blank=True)

    CODE = [
        ('EMEL01', 'Templat Maklum Balas - Diterima'),
        ('EMEL02', 'Templat Maklum Balas - Dijawab'),
        ('EMEL03', 'Templat Fasiliti - Tempahan Diproses'),
        ('EMEL04', 'Templat Fasiliti - Tempahan Diterima'),
        ('EMEL05', 'Templat Fasiliti - Tempahan Ditolak'),
        ('EMEL06', 'Templat Program - Tempahan Diproses'),
        ('EMEL07', 'Templat Program - Tempahan Diterima'),
        ('EMEL08', 'Templat Program - Tempahan Ditolak'),
        ('EMEL09', 'Templat Lawatan - Tempahan Diproses'),
        ('EMEL10', 'Templat Lawatan - Tempahan Diterima'),
        ('EMEL11', 'Templat Lawatan - Tempahan Ditolak'),
        ('EMEL99', 'Tiada')
    ]
    code = models.CharField(max_length=6, choices=CODE, default='EMEL99')
    subject = models.CharField(max_length=255, default='NA', blank=True)
    body = models.TextField(blank=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name
