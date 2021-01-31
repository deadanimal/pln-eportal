from __future__ import unicode_literals 
import uuid, datetime 
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class PublicationCategory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name_ms']

    
    def __str__(self):
        return self.name_ms


class Publication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=100, default='NA', blank=True)
    title_ms = models.CharField(max_length=100, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)
    call_number = models.CharField(max_length=100, default='NA', blank=True)
    abstract_en = models.CharField(max_length=255, default='NA', blank=True)
    abstract_ms = models.CharField(max_length=255, default='NA', blank=True)
    author_name = models.CharField(max_length=100, default='NA', blank=True)
    editor_name = models.CharField(max_length=100, default='NA', blank=True)
    publisher_name = models.CharField(max_length=100, default='NA', blank=True)
    published_date = models.DateField(default=datetime.date.today, null=True)
    isbn = models.CharField(max_length=100, default='NA', blank=True)
    issn = models.CharField(max_length=100, default='NA', blank=True)
    year = models.IntegerField(default=2020)
    edition = models.CharField(max_length=20, default='NA', blank=True)
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('publication'))
    publication_category_id = models.ForeignKey(PublicationCategory, on_delete=models.CASCADE, related_name='publication_publication_category_id', null=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title_ms']

    
    def __str__(self):
        return self.title_ms

