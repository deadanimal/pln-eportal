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
    comment_user = models.CharField(max_length=255, default='NA', blank=True)
    comment_admin = models.CharField(max_length=255, default='NA', blank=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="feedback_user_id")

    MODULES = [
        ('simulator-ride', 'Kembara Simulasi'),
        ('shows', 'Tayangan'),
        ('exhibit', 'Pameran'),
        ('visit', 'Lawatan'),
        ('program', 'Program Pendidikan'),
        ('facility', 'Fasiliti'),
        ('publication', 'Penerbitan'),
        ('virtual-library', 'Kutubkhanah Mini'),
    ]

    module = models.CharField(max_length=20, choices=MODULES, default='simulator-ride')
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']
    
    def __str__(self):
        return self.comment_user


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
