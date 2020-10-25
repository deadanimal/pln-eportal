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
    name = models.CharField(max_length=255, default='NA')
    description = models.CharField(max_length=255, default='NA')
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='exhibit_pic')
    # venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='exhibit_venue')
    ZONES = [
        ('A', 'Alam Semesta'),
        ('B', 'Ruang Kanak-kanak'),
        ('C', 'Teknologi Satelit'),
        ('D', 'Misi Angkasa'),
        ('E', 'Sistem Solar'),
        ('F', 'Gelombang'),
        ('N', 'Not Available')
    ]
    zone = models.CharField(max_length=1, choices=ZONES, default='N', unique=True)

    asset_id = models.ManyToManyField(Asset, related_name='exhibit_asset', blank=True)
    qrcode = models.CharField(max_length=255, default='NA')

    STATUS = [
        ('AV', 'Available'),
        ('NA', 'Not Available')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='AV')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ExhibitList(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA')
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))

    STATUS = [
        ('AV', 'Available'),
        ('NA', 'Not Available')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='AV')
    exhibit_id = models.ForeignKey(Exhibit, on_delete=models.CASCADE, related_name='exhibit_list_exhibit_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ExhibitDetail(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=255, default='NA')
    description = models.TextField(blank=True)
    # image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))
    video_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('video'))
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='exhibit_detail_venue')
    qrcode = models.CharField(max_length=255, default='NA')

    STATUS = [
        ('AV', 'Available'),
        ('NA', 'Not Available')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='AV')
    exhibit_list_id = models.ForeignKey(ExhibitList, on_delete=models.CASCADE, related_name='exhibit_detail_exhibit_list_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ExhibitDetailImage(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    exhibit_detail_image = models.ImageField(null=True, blank=True, upload_to=PathAndRename('image'))
    exhibit_detail_id = models.ForeignKey(ExhibitDetail, on_delete=models.CASCADE, related_name='exhibit_detail_image_exhibit_detail')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.exhibit_detail_image


class EducationalProgram(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title = models.CharField(max_length=255, default='NA')
    description = models.TextField(default='NA')

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
        ('P9', 'LAIN-LAIN'),
        ('NA', 'Not Available')
    ]
    program_category = models.CharField(max_length=2, choices=PROGRAM_CATEGORY, default='NA')

    PROGRAM_SUBCATEGORY = [
        ('NSC', 'National Space Challenge'),
        ('KRK', 'Kejohanan Roket Kebangsaan'),
        ('NAV', 'Not Available')
    ]
    program_subcategory = models.CharField(max_length=3, choices=PROGRAM_SUBCATEGORY, default='NAV')
    program_opento = models.CharField(max_length=100, default='')
    min_participant = models.IntegerField(default=0, null=True)
    max_participant = models.IntegerField(default=0, null=True)
    price = models.DecimalField(decimal_places=2, max_digits=3, default=0.00, null=True)
    poster_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('poster'))
    website_link = models.URLField(blank=True)
    video_link = models.URLField(blank=True)
    venue_id = models.ManyToManyField(Venue, related_name='educational_program_venue')
    coordinator_id = models.ManyToManyField(CustomUser, related_name='educational_program_coordinator')
    registration = models.BooleanField(default=True)
    activity = models.BooleanField(default=False)

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

class EducationalProgramImage(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    program_image = models.ImageField(null=True, blank=True, upload_to=PathAndRename('program'))
    program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='educational_program_image_program_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.title

class EducationalProgramActivity(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    program_activity = models.CharField(max_length=255, blank=True)
    program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='educational_program_activity_program_id')

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
    age = models.IntegerField(default=0)
    activity = models.ForeignKey(EducationalProgramActivity, on_delete=models.CASCADE, related_name="educational_program_app_activity", null=True)

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


class EducationalProgramForm(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    educational_program_id = models.ForeignKey(EducationalProgram, on_delete=models.CASCADE, related_name='educational_program_form_educational_program')
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='educational_program_form_customuser')
    teacher_name = models.CharField(max_length=100, blank=True)
    teacher_school_name = models.CharField(max_length=100, blank=True)
    teacher_school_address = models.CharField(max_length=255, blank=True)
    teacher_school_postcode = models.CharField(max_length=5, blank=True)
    teacher_school_division = models.CharField(max_length=100, blank=True)
    teacher_school_state = models.CharField(max_length=100, blank=True)
    teacher_tel = models.CharField(max_length=20, blank=True)
    teacher_hp = models.CharField(max_length=20, blank=True)
    teacher_email = models.CharField(max_length=100, blank=True)
    teacher_fax = models.CharField(max_length=20, blank=True)
    teacher_dob = models.DateField(default=datetime.datetime.today, blank=True)
    teacher_age = models.IntegerField(default=0, null=True)

    RELIGION = [
        ('IS', 'Islam'),
        ('HD', 'Hindu'),
        ('BD', 'Buddha'),
        ('CT', 'Christian'),
        ('OT', 'Other')
    ]
    teacher_religion = models.CharField(max_length=2, choices=RELIGION, default='OT')

    GENDER = [
        ('FM', 'Female'),
        ('ML', 'Male'),
        ('NA', 'Not Available')
    ]
    teacher_gender = models.CharField(max_length=2, choices=GENDER, default='NA')

    CITIZENSHIP = [
        ('CZ', 'Citizen'),
        ('NC', 'Non Citizen'),
        ('NA', 'Not Available')
    ]
    teacher_citizenship = models.CharField(max_length=2, choices=CITIZENSHIP, default='NA')
    teacher_nric_passportno = models.CharField(max_length=50, blank=True)

    MARITAL_STATUS = [
        ('S', 'Single'),
        ('M', 'Married'),
        ('O', 'Other')
    ]
    teacher_maritalstatus = models.CharField(max_length=1, choices=MARITAL_STATUS, default='O')

    TSHIRT_SIZE = [
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('2XL', '2XL'),
        ('3XL', '3XL'),
    ]
    teacher_tshirt_size = models.CharField(max_length=3, choices=TSHIRT_SIZE, default='S')
    teacher_contactperson_name = models.CharField(max_length=100, blank=True)
    teacher_contactperson_tel = models.CharField(max_length=20, blank=True)
    teacher_anysickness = models.CharField(max_length=255, blank=True)
    teacher_anyallergies = models.CharField(max_length=255, blank=True)
    teacher_vegetarian = models.BooleanField(default=False)

    student_1_name = models.CharField(max_length=100, blank=True)
    student_1_dob = models.DateField(default=datetime.datetime.today, blank=True)
    student_1_age = models.IntegerField(default=0, null=True)
    student_1_year = models.IntegerField(default=0, null=True)
    student_1_religion = models.CharField(max_length=2, choices=RELIGION, default='OT')
    student_1_gender = models.CharField(max_length=2, choices=GENDER, default='NA')
    student_1_citizenship = models.CharField(max_length=2, choices=CITIZENSHIP, default='NA')
    student_1_nric_passportno = models.CharField(max_length=50, blank=True)
    student_1_tshirt_size = models.CharField(max_length=3, choices=TSHIRT_SIZE, default='S')
    student_1_contactperson_name = models.CharField(max_length=100, blank=True)
    student_1_contactperson_tel = models.CharField(max_length=20, blank=True)
    student_1_anysickness = models.CharField(max_length=255, blank=True)
    student_1_anyallergies = models.CharField(max_length=255, blank=True)
    student_1_vegetarian = models.BooleanField(default=False)

    student_2_name = models.CharField(max_length=100, blank=True)
    student_2_dob = models.DateField(default=datetime.datetime.today, blank=True)
    student_2_age = models.IntegerField(default=0, null=True)
    student_2_year = models.IntegerField(default=0, null=True)
    student_2_religion = models.CharField(max_length=2, choices=RELIGION, default='OT')
    student_2_gender = models.CharField(max_length=2, choices=GENDER, default='NA')
    student_2_citizenship = models.CharField(max_length=2, choices=CITIZENSHIP, default='NA')
    student_2_nric_passportno = models.CharField(max_length=50, blank=True)
    student_2_tshirt_size = models.CharField(max_length=3, choices=TSHIRT_SIZE, default='S')
    student_2_contactperson_name = models.CharField(max_length=100, blank=True)
    student_2_contactperson_tel = models.CharField(max_length=20, blank=True)
    student_2_anysickness = models.CharField(max_length=255, blank=True)
    student_2_anyallergies = models.CharField(max_length=255, blank=True)
    student_2_vegetarian = models.BooleanField(default=False)

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
        return self.teacher_name


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
    pic_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='visit_pic', null=True)
    tour_guide = models.BooleanField(default=False)

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

