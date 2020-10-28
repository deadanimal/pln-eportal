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

class Feedback(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    comment = models.CharField(max_length=500, default='NA')
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="feedback_user_id")

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['comment']
    
    def __str__(self):
        return self.comment


class Rating(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    rating = models.IntegerField(default=1)
    comment = models.CharField(max_length=255, default='NA', blank=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['comment']
    
    def __str__(self):
        return self.comment
