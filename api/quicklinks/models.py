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

class QuickLinkCategory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    order = models.IntegerField(default=0, null=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name_ms


class QuickLink(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', null=True)
    name_ms = models.CharField(max_length=255, default='NA', null=True)
    link = models.CharField(max_length=255, default='NA', blank=True)

    # CATEGORY = [
    #     ('PTMY', 'Planetarium Malaysia'),
    #     ('PTLN', 'Planetarium Luar Negara'),
    #     ('BCMY', 'Balai Cerap Malaysia'),
    #     ('BCLN', 'Balai Cerap Luar Negara'),
    #     ('NOAV', 'Not Available'),
    # ]
    # category = models.CharField(max_length=4, choices=CATEGORY, default='NOAV')
    category = models.ForeignKey(QuickLinkCategory, on_delete=models.CASCADE, related_name='quicklink_category_id')
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name_ms']

    def __str__(self):
        return self.name_ms
