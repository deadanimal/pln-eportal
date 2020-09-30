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

from assets.models import (
    Asset
)

class Venue(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA')
    location = models.CharField(max_length=255, default='NA')
    max_capacity = models.IntegerField(default=0)

    ZONES = [
        ('A', 'Alam Semesta'),
        ('B', 'Ruang Kanak-kanak'),
        ('C', 'Teknologi Satelit'),
        ('D', 'Misi Angkasa'),
        ('E', 'Sistem Solar'),
        ('F', 'Gelombang'),
        ('N', 'Not Available')
    ]
    zone = models.CharField(max_length=1, choices=ZONES, default='N')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Facility(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')

    FACILITY_TYPE = [
        ('NA', 'Not Available')
    ]
    facility_type = models.CharField(max_length=2, choices=FACILITY_TYPE, default='NA')
    price = models.IntegerField(default=0)
    size = models.IntegerField(default=0)
    max_capacity = models.IntegerField(default=0)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('facility'))
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('facility_pdf'))
    promo_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('facility_promo'))
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='facility_pic_id')
    asset_id = models.ManyToManyField(Asset, related_name='facility_asset_id')
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='facility_venue_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class FacilityBooking(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA')
    # start_datetime = models.DateTimeField(blank=True)
    # end_datetime = models.DateTimeField(blank=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='facility_app_customer_id')
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='facility_app_pic_id', null=True)
    facility_id = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='facility_id')
    organisation_name = models.CharField(max_length=255, default='NA')

    ORGANISATION_CATEGORY = [
        ('GV', 'Government'),
        ('SC', 'School'),
        ('UN', 'University'),
        ('NA', 'Not Available')
    ]
    organisation_category = models.CharField(max_length=2, choices=ORGANISATION_CATEGORY, default='NA')
    booking_date = models.DateField(default=datetime.date.today)
    booking_time = models.TimeField(null=True)
    number_of_people = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    STATUS = [
        ('AP', 'Approved'),
        ('IP', 'In Process'),
        ('RJ', 'Rejected')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='IP')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

