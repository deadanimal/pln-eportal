from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from events.models import (
    EducationalProgram
)

from users.models import (
    CustomUser
)

class Banner(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA', blank=True)
    description = models.CharField(max_length=255, default='NA', blank=True)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))
    program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='banner_program_id', null=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title
