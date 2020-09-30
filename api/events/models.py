from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from assets.models import (
    Asset
)

from users.models import (
    CustomUser
)

from venues.models import (
    Venue
)

class Exhibit(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='exhibit_pic')
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='exhibit_venue')
    asset_id = models.ManyToManyField(Asset, related_name='exhibit_asset')

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


class EducationalProgram(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')

    PROGRAM_TYPE = [
        ('PL', 'Public'),
        ('PV', 'Private')
    ]
    program_type = models.CharField(max_length=2, choices=PROGRAM_TYPE, default='PL')

    PROGRAM_CATEGORY = [
        ('P1', 'PROGRAM PEMBANGUNAN MURID/GURU'),
        ('P2', 'PROGRAM PENCERAPAN'),
        ('P3', 'PROGRAM KHAS'),
        ('P4', 'PROGRAM KEBANGSAAN'),
        ('P5', 'PROGRAM ANTARABANGSA'),
        ('P6', 'PROGRAM/RAKAN KERJASAMA'),
        ('P7', 'PROGRAM JANGKAUAN (6 ZON)'),
        ('P8', 'SEMINAR, CERAMAH, PLANETARIUM TALKS'),
        ('NA', 'Not Available')
    ]
    program_category = models.CharField(max_length=2, choices=PROGRAM_CATEGORY, default='NA')
    program_opento = models.CharField(max_length=100, default='')
    min_participant = models.IntegerField(default=0)
    max_participant = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    website_link = models.URLField(default='NA')
    venue_id = models.ManyToManyField(Venue, related_name='educational_program_venue')
    coordinator_id = models.ManyToManyField(CustomUser, related_name='educational_program_coordinator')

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

class EducationalProgramDate(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    program_date = models.DateField(default=datetime.date.today)
    program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='educational_program_date_program_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.title

class EducationalProgramApplication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    organisation_name = models.CharField(max_length=255, default='NA')

    ORGANISATION_CATEGORY = [
        ('GV', 'Government'),
        ('SC', 'School'),
        ('UN', 'University'),
        ('NA', 'Not Available')
    ]
    organisation_category = models.CharField(max_length=2, choices=ORGANISATION_CATEGORY, default='NA')
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='educational_program_customer')
    educational_program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='educational_program')
    educational_program_date_id = models.ForeignKey(EducationalProgramDate, on_delete=models.CASCADE, related_name='educational_program_date', null=True)
    participant = models.IntegerField(default=0)

    STATUS = [
        ('AP', 'Approved'),
        ('IP', 'In process'),
        ('RJ', 'Rejected')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='IP')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['organisation_name']

    def __str__(self):
        return self.organisation_name


class VisitApplication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    # title = models.CharField(max_length=255, default='NA')
    # description = models.CharField(max_length=255, default='NA')
    organisation_name = models.CharField(max_length=255, default='NA')

    ORGANISATION_CATEGORY = [
        ('GV', 'Government'),
        ('SC', 'School'),
        ('UN', 'University'),
        ('NA', 'Not Available')
    ]
    organisation_category = models.CharField(max_length=2, choices=ORGANISATION_CATEGORY, default='NA')
    visit_date = models.DateField(default=datetime.date.today)
    visit_time = models.TimeField(null=True)
    total_participant = models.IntegerField(default=0)
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='visit_customer')
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='visit_pic')

    STATUS = [
        ('AP', 'Approved'),
        ('IP', 'In process'),
        ('RJ', 'Rejected')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='IP')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.organisation_name

