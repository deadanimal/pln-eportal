from __future__ import unicode_literals
import uuid
import datetime
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)


class DailyOperatingReport(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report_date = models.DateField(default=datetime.date.today)
    report_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    report_by_position = models.CharField(max_length=255, blank=True)

    operations_manager = models.CharField(max_length=255, blank=True)
    technical_officer = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    ticket_counter_clerk = ArrayField(models.CharField(max_length=255), blank=True, null=True)
    stage_officer = models.CharField(max_length=255, blank=True)
    info_counter_clerk = models.CharField(max_length=255, blank=True)
    librarian = models.CharField(max_length=255, blank=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return "Laporan Operasi Harian (" + self.report_date.strftime("%d %m %Y") + ")"


class Contractor(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    SERVICES = [
        ('M & E', 'M & E'),
        ('Safety', 'Keselamatan'),
        ('Cleaning', 'Kebersihan'),
        ('Landscape', 'Landskap'),
        ('NA', 'Tiada')
    ]
    service = models.CharField(max_length=20, choices=SERVICES, default='NA')
    contractor_name = models.CharField(max_length=255, blank=True)
    officer_name = models.CharField(max_length=255, blank=True)
    attendance = models.CharField(max_length=255, blank=True)
    notes = models.CharField(max_length=255, blank=True)

    daily_operating_report_id = models.ForeignKey(DailyOperatingReport, on_delete=models.CASCADE, related_name='contractor_daily_operating_report_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    
class OperatingSchedule(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    TIMES = [
        ('1000', '1000'),
        ('1100', '1100'),
        ('1200', '1200'),
        ('1300', '1300'),
        ('1400', '1400'),
        ('1500', '1500'),
        ('1600', '1600')
    ]
    time = models.CharField(max_length=4, choices=TIMES, blank=True)
    show_name = models.CharField(max_length=255, blank=True)
    show_audience = models.CharField(max_length=20, blank=True)
    space_pod_participant = models.CharField(max_length=20, blank=True)
    notes = models.CharField(max_length=255, blank=True)

    daily_operating_report_id = models.ForeignKey(DailyOperatingReport, on_delete=models.CASCADE, related_name='operating_schedule_daily_operating_report_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    
class VisitorSummary(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    visitor_summary_show = models.IntegerField(default=0, null=True) 
    visitor_summary_space_pod = models.IntegerField(default=0, null=True) 
    visitor_summary_exhibition = models.IntegerField(default=0, null=True) 
    visitor_summary_kutubkhanah = models.IntegerField(default=0, null=True) 
    visitor_summary_all = models.IntegerField(default=0, null=True) 

    daily_operating_report_id = models.ForeignKey(DailyOperatingReport, on_delete=models.CASCADE, related_name='visitor_summary_daily_operating_report_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']


class DetailReport(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    detail = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    action = models.CharField(max_length=100, blank=True)

    daily_operating_report_id = models.ForeignKey(DailyOperatingReport, on_delete=models.CASCADE, related_name='detail_report_daily_operating_report_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

