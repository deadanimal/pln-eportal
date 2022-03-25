from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    Role,
    CustomUser
)

class Menu(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    path = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=100, blank=True)

    TYPES = [
        ('link', 'Menu'),
        ('sub', 'Menus')
    ]

    type = models.CharField(max_length=10, choices=TYPES, default='link')
    icontype = models.CharField(max_length=100, blank=True)
    ordering = models.IntegerField(null=True)
    active = models.BooleanField(default=False)
    mainmenu = models.CharField(max_length=100, blank=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['ordering']

    def __str__(self):
        return self.title


class MenuRole(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='menurole_menu')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='menurole_role')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

