from __future__ import unicode_literals 
import uuid, datetime
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

class EmployeeDirectory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA', null=True)
    position = models.CharField(max_length=255, default='NA', null=True)
    extension = models.CharField(max_length=50, default='NA', null=True)
    email = models.CharField(max_length=255, default='NA', null=True)

    DEPARTMENT = [
        ('PPP', 'Pejabat Pengarah Planetarium Negara'),
        ('UPA', 'Unit Perhubungan Awam'),
        ('SPP', 'Seksyen Pendidikan - Pameran'),
        ('SPC', 'Seksyen Pendidikan - Pencerapan'),
        ('SPB', 'Seksyen Pendidikan - Pembudayaan'),
        ('UTK', 'Unit Teknikal'),
        ('SPK', 'Seksyen Perkhidmatan'),
        ('UKW', 'Unit Kewangan'),
        ('UTM', 'Unit Teknologi Maklumat'),
        ('UPF', 'Unit Pengurusan Fasiliti'),
        ('UPT', 'Unit Pentadbiran'),
        ('NAV', 'Not Available')
    ]

    department = models.CharField(max_length=3, choices=DEPARTMENT, default='NAV')
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['created_date']

    def __str__(self):
        return self.name
