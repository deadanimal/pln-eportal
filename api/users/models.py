from __future__ import unicode_literals
import json
import uuid
import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
# from phonenumber_field.modelfields import PhoneNumberField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class CustomUser(AbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(blank=True, max_length=255)
    nric = models.CharField(blank=True, max_length=100)
    nric_picture = models.ImageField(null=True, upload_to=PathAndRename('nric'))
    email = models.CharField(blank=True, max_length=100)
    phone = models.CharField(blank=True, max_length=100)
    birth_date = models.DateField(null=True)
    age = models.IntegerField(default=0)
    address_1 = models.CharField(blank=True, max_length=255)
    address_2 = models.CharField(blank=True, max_length=255)
    address_3 = models.CharField(blank=True, max_length=255)
    postcode = models.CharField(blank=True, max_length=5)
    city = models.CharField(blank=True, max_length=100)
    state = models.CharField(blank=True, max_length=100)
    country = models.CharField(blank=True, max_length=100)
    staff_id = models.CharField(blank=True, max_length=100)

    USER_TYPE = [
        ('DR', 'Director'),
        ('SA', 'Super Admin'),
        ('FA', 'Finance Admin'),
        ('TA', 'Technical Admin'),
        ('TC', 'Ticket Counter Admin'),
        ('VA', 'Visit Admin'),
        ('EP', 'Educational Program Admin'),
        ('EA', 'Exhibition Admin'),
        ('PK', 'Publishing & Kutubkhanah Admin'),
        ('SV', 'Survey Admin'),
        ('CS', 'Customer')
    ]
    user_type = models.CharField(max_length=2, choices=USER_TYPE, default='CS')

    GENDER_TYPE = [
        ('FM', 'Female'),
        ('ML', 'Male'),
        ('NA', 'Not Available')
    ]
    gender_type = models.CharField(max_length=2, choices=GENDER_TYPE, default='NA')

    RACE_TYPE = [
        ('CN', 'Chinese'),
        ('ID', 'Indian'),
        ('ML', 'Malay'),
        ('OT', 'Others'),
        ('NA', 'Not Available')
    ]
    race_type = models.CharField(max_length=2, choices=RACE_TYPE, default='NA')
    history = HistoricalRecords()

    # profile_picture = models.ImageField(null=True, upload_to=PathAndRename('images'))

    class Meta:
        ordering = ['-date_joined']


    def __str__(self):
        return self.email


class Supervisor(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    # max 2 people per day
    date_on_duty = models.DateField(default=datetime.date.today)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['user']

    def __str__(self):
        return self.user
