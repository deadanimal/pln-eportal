from __future__ import unicode_literals
import uuid
import datetime
import pytz
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

from fpxtransactions.models import (
    BankList
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from showings.models import (
    ShowBooking
)

from venues.models import (
    FacilityBooking
)


class Refund(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    refund_running_no = models.CharField(max_length=100, blank=True)

    TYPE = [
        ('T', 'Ticket'),
        ('M', 'Money')
    ]
    refund_type = models.CharField(max_length=1, choices=TYPE, default='T')
    # description from the person who apply refund
    description = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    acc_number = models.CharField(max_length=50, blank=True)
    bank_id = models.ForeignKey(
        BankList, on_delete=models.CASCADE, null=True, related_name='refund_bank_id')
    # remarks from the person who handle refund
    remarks = models.TextField(blank=True)
    # incharge_id is the person who handle refund
    incharge_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, related_name='refund_incharge_id')
    # inchartge_datetime is the start datetime refund is made
    incharge_datetime = models.DateTimeField(auto_now_add=True)
    # user is the person who apply refund
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    # status refund:
    # refund_created
    # refund_success
    # refund_failed
    STATUS = [
        ('RC', 'Refund Created'),
        ('RA', 'Refund Approved'),
        ('RR', 'Refund Rejected')
    ]
    status = models.CharField(choices=STATUS, max_length=2, default='RC')

    # pic_verification_id is the person who verify the refund
    pic_verification_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, null=True, related_name='refund_pic_verification_id')
    # pic_verification_datetime is the datetime of the verification of refund
    pic_verification_datetime = models.DateTimeField(null=True)

    show_booking_id = models.ForeignKey(
        ShowBooking, on_delete=models.CASCADE, null=True, related_name='refund_show_booking_id')
    simulator_ride_booking_id = models.ForeignKey(
        SimulatorRideBooking, on_delete=models.CASCADE, null=True, related_name='refund_simulator_ride_booking_id')
    facility_booking_id = models.ForeignKey(
        FacilityBooking, on_delete=models.CASCADE, null=True, related_name='refund_facility_booking_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if not self.refund_running_no:
            prefix = '{}B'.format(datetime.datetime.now(
                timezone_).strftime('%Y%m%d'))
            current_year = datetime.datetime.now(timezone_).strftime('%Y')
            prev_instances = self.__class__.objects.filter(
                refund_running_no__contains=current_year).order_by('-refund_running_no')
            if prev_instances.exists():
                last_instance_id = prev_instances.first(
                ).refund_running_no[-7:]
                self.refund_running_no = prefix + \
                    '{0:07d}'.format(int(last_instance_id)+1)
            else:
                self.refund_running_no = prefix+'{0:07d}'.format(1)

        super(Refund, self).save(*args, **kwargs)

    class meta:
        ordering = ['-created_date']
