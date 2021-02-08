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


class FacilitySubcategory(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    code = models.CharField(max_length=10, blank=True)
    name_en = models.CharField(max_length=50, blank=True)
    name_ms = models.CharField(max_length=50, blank=True)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))
    status = models.BooleanField(default=False)

    FACILITY_CATEGORY = [
        ('TA', 'Teater Angkasa'),
        ('GP', 'Galeri Pameran'),
        ('TT', 'Bilik Orion'),
        ('BC', 'Bilik Centaurus'),
        ('KR', 'Kawasan Rekreasi'),
        ('SM', 'Stesen Mikrosatelit'),
        ('NA', 'Not Available')
    ]
    facility_category = models.CharField(max_length=2, choices=FACILITY_CATEGORY, default='NA')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['code']

    def __str__(self):
        return self.code + ' - ' + self.name_ms


class Facility(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA')
    name_ms = models.CharField(max_length=255, default='NA')
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)

    FACILITY_CATEGORY = [
        ('TA', 'Teater Angkasa'),
        ('GP', 'Galeri Pameran'),
        ('TT', 'Bilik Orion'),
        ('BC', 'Bilik Centaurus'),
        ('KR', 'Kawasan Rekreasi'),
        ('SM', 'Stesen Mikrosatelit'),
        ('NA', 'Not Available')
    ]
    facility_category = models.CharField(max_length=2, choices=FACILITY_CATEGORY, default='NA')

    # FACILITY_SUBCATEGORY = [
    #     ('ZONE', 'Titan'),
    #     ('ZTWO', 'Milky Way'),
    #     ('ZTHR', 'Sculpture'),
    #     ('ZFOU', 'Callisto'),
    #     ('ZFIV', 'Balai Cerap Purba'),
    #     ('NA', 'Not Available')
    # ]
    # facility_subcategory = models.CharField(max_length=4, choices=FACILITY_SUBCATEGORY, default='NA')
    facility_subcategory = models.ForeignKey(FacilitySubcategory, on_delete=models.CASCADE, related_name='facility_subcategory_id', null=True)
    area_size = models.CharField(max_length=100, default='NA', blank=True)
    max_capacity = models.IntegerField(default=0)
    have_price = models.BooleanField(default=False)
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('facility_pdf'))
    promo_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('facility_promo'))
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='facility_pic_id')
    # asset_id = models.ManyToManyField(Asset, related_name='facility_asset_id')
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='facility_venue_id', null=True)
    equipment_name_en = models.CharField(max_length=255, blank=True)
    equipment_name_ms = models.CharField(max_length=255, blank=True)
    equipment_description_en = models.TextField(blank=True)
    equipment_description_ms = models.TextField(blank=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name_ms']

    def __str__(self):
        return self.name_ms


class FacilityPrice(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    facility_description_en = models.CharField(max_length=255, default='NA', blank=True)
    facility_description_ms = models.CharField(max_length=255, default='NA', blank=True)
    facility_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)

    DAY = [
        ('HALF', 'Separuh Hari'),
        ('FULL', 'Satu Hari'),
        ('NONE', 'Tiada')
    ]

    facility_days = models.CharField(max_length=4, choices=DAY, default='NONE')
    facility_id = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='facility_price_facility_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.facility_description_ms


class FacilityImage(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    facility_image = models.ImageField(null=True, blank=True, upload_to=PathAndRename('facility'))
    facility_id = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='facility_image_facility_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.facility_image


class FacilityBooking(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA', blank=True)
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

    DAY = [
        ('HALF', 'Separuh Hari'),
        ('FULL', 'Satu Hari'),
        ('NONE', 'Tiada')
    ]

    booking_days = models.CharField(max_length=4, choices=DAY, default='NONE')
    number_of_people = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True)
    want_equipment = models.BooleanField(default=False)

    # status fasiliti: dalam proses, diterima, ditolak, terima bayaran, tolak bayaran, pending payment, refund
    # dalam proses - tunggu approval dari pengarah Planetarium
    # diterima - selepas pengarah terima permohonan tempahan fasiliti
    # ditolak - selepas pengarah menolak permohonan tempahan fasiliti
    # pending payment - selepas pengguna ingin membuat bayaran di kaunter
    # payment diterima - selepas FPX menghantar status 00 (Berjaya) ke dalam sistem
    # payment ditolak - selepas FPX menghantar status selain 00 ke dalam sistem
    # refund - pengguna ingat refund tempahan mereka
    STATUS = [
        ('FB01', 'In Progress'),
        ('FB02', 'Approved'),
        ('FB03', 'Rejected'),
        ('FB04', 'Pending Payment'),
        ('FB05', 'Payment Accepted'),
        ('FB06', 'Payment Rejected'),
        ('FB07', 'Refund')
    ]
    status = models.CharField(max_length=4, choices=STATUS, default='FB01')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

