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

class Faq(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    question_en = models.CharField(max_length=255, default='NA', blank=True)
    answer_en = models.TextField(blank=True)
    question_ms = models.CharField(max_length=255, default='NA', blank=True)
    answer_ms = models.TextField(blank=True)
    order = models.IntegerField(default=0, null=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question_ms
