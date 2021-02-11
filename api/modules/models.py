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

class Module(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    title_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_ms = models.TextField(blank=True)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))

    MODULES = [
        ('simulator-ride', 'Kembara Simulasi'),
        ('shows', 'Tayangan'),
        ('exhibit', 'Pameran'),
        ('visit', 'Lawatan'),
        ('program', 'Program Pendidikan'),
        ('survey', 'Maklum Balas'),
        ('facility', 'Fasiliti'),
        ('publication', 'Penerbitan'),
        ('virtual-library', 'Kutubkhanah Mini'),
    ]

    module = models.CharField(max_length=20, choices=MODULES, default='simulator-ride', unique=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms


class SubModule(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    title_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_ms = models.TextField(blank=True)

    SUBMODULES = [
        ('arkib-kutubkhanah', 'Arkib Kutubkhanah'),
        ('buku', 'Buku'),
        ('e-sumber', 'eSumber'),
        ('terbitan-bersiri', 'Terbitan Bersiri'),
        ('tentang-kami', 'Mengenai Kami'),
    ]

    submodule = models.CharField(max_length=20, choices=SUBMODULES, default='arkib-kutubkhanah', unique=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms
