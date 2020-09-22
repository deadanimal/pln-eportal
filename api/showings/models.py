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

from venues.models import (
    Venue
)

class Showing(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')

    GENRE = [
        ('NA', 'Not Available')
    ]
    genre = models.CharField(max_length=2, choices=GENRE, default='NA')

    LANGUAGE = [
        ('EN', 'English'),
        ('MY', 'Malay')
    ]
    language = models.CharField(max_length=2, choices=LANGUAGE, default='EN')
    duration_hours = models.IntegerField(default=0)
    duration_minutes = models.IntegerField(default=0)
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    trailer_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('trailers'))

    STATUS = [
        ('AV', 'Available'),
        ('NA', 'Not Available')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='AV')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Showtime(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    start_datetime = models.DateTimeField(blank=True)
    end_datetime = models.DateTimeField(blank=True)
    showing_id = models.ForeignKey(Showing, on_delete=models.CASCADE, related_name='showing')
    venue_id = models.ManyToManyField(Venue, related_name='venue')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.showing_id


class ShowTicket(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    ticket_price = models.IntegerField(default=0)
    
    CATEGORY = [
        ('AD', 'Adult'),
        ('KD', 'Kid'),
        ('OF', 'Old Folk'),
        ('SD', 'Student')
    ]
    category = models.CharField(max_length=2, choices=CATEGORY, default='AD')
    
    TICKET_TYPE = [
        ('CZ', 'Citizen'),
        ('NC', 'Non-citizen')
    ]
    ticket_type = models.CharField(max_length=2, choices=TICKET_TYPE, default='CZ')
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='customer')
    showtime_id = models.ForeignKey(Showtime, on_delete=models.CASCADE, related_name='showtime')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.customer_id

