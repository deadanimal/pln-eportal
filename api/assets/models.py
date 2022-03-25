from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class Asset(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')
    
    ASSET_TYPE = [
        ('OT', 'Other')
    ]
    asset_type = models.CharField(max_length=2, choices=ASSET_TYPE, default='OT')
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='pic_id')
    image_url = models.ImageField(null=True, blank=True, upload_to=PathAndRename('asset'))

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name', 'asset_type']

    
    def __str__(self):
        return self.name
    
