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
    name = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    
    def __str__(self):
        return self.name


class Publication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=100, default='NA')
    abstract = models.CharField(max_length=255, default='NA')
    author_name = models.CharField(max_length=100, default='NA')
    publisher_name = models.CharField(max_length=100, default='NA')
    published_date = models.DateField(default=datetime.date.today)
    year = models.IntegerField(default=2020)
    edition = models.CharField(max_length=20, default='NA')
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('publication'))
    publication_category_id = models.ForeignKey(PublicationCategory, on_delete=models.CASCADE, related_name='publication_publication_category_id', null=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    
    def __str__(self):
        return self.title

