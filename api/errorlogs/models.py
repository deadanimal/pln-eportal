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

class ErrorLog(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    error = models.TextField(blank=True)
    message = models.TextField(blank=True)
    name = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=255, blank=True)
    statustext = models.CharField(max_length=255, blank=True)
    url = models.TextField(blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name + ' - ' + self.status + " " + self.statustext + " (" + self.url + ")"