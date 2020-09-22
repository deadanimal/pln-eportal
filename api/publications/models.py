from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class Publication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')
    author_name = models.CharField(max_length=100, default='NA')
    publisher_name = models.CharField(max_length=100, default='NA')
    published_date = models.DateTimeField(null=True)
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('publication'))

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    
    def __str__(self):
        return self.title

