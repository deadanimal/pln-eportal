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

from venues.models import (
    Venue
)

from fpxtransactions.models import (
    FpxTransaction
)

class SimulatorRide(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename('simulator-ride'))
    title = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=255, default='NA')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']
    
    def __str__(self):
        return self.title

class SimulatorRideTime(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    time = models.TimeField(null=True)
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='simulator_ride_time_venue_id')

    DAYS = [
        ('MON', 'Isnin'),
        ('TUE', 'Selasa'),
        ('WED', 'Rabu'),
        ('THU', 'Khamis'),
        ('FRI', 'Jumaat'),
        ('SAT', 'Sabtu'),
        ('SUN', 'Ahad'),
    ]
    day = models.CharField(max_length=3, choices=DAYS, default='MON')

    ROUNDS = [
        ('P1', 'Pusingan 1'),
        ('P2', 'Pusingan 2'),
        ('P3', 'Pusingan 3'),
        ('P4', 'Pusingan 4'),
        ('P5', 'Pusingan 5'),
    ]
    round = models.CharField(max_length=2, choices=ROUNDS, default='P1')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['time']
    
    def __str__(self):
        return self.day

class SimulatorRideBooking(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    booking_date = models.DateField(default=datetime.date.today)
    simulator_ride_time_id = models.ForeignKey(SimulatorRideTime, on_delete=models.CASCADE, related_name='simulator_ride_booking_ride_time_id')
    
    TICKET_TYPE = [
        ('CZ', 'Citizen'),
        ('NC', 'Non-citizen')
    ]
    ticket_type = models.CharField(max_length=2, choices=TICKET_TYPE, default='CZ')

    TICKET_CATEGORY = [
        ('AD', 'Adult'),
        ('KD', 'Kid')
    ]
    ticket_category = models.CharField(max_length=2, choices=TICKET_CATEGORY, default='AD')
    ticket_quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="simulator_ride_booking_user_id")

    # status kembara simulasi: diterima, pending payment, payment diterima, payment gagal, refund
    # diterima - selepas pengguna tekan butang buat bayaran di langkah 4 tempahan kembara simulasi
    # pending payment - selepas pengguna mula-mula berada di halaman checkout page
    # payment diterima - selepas FPX menghantar status 00 (Berjaya) ke dalam sistem
    # payment ditolak - selepas FPX menghantar status selain 00 ke dalam sistem
    # refund - pengguna ingat refund tempahan mereka
    STATUS = [
        ('SRB01', 'Accepted'),
        ('SRB02', 'Pending Payment'),
        ('SRB03', 'Payment Accepted'),
        ('SRB04', 'Payment Rejected'),
        ('SRB05', 'Refund'),
    ]
    status = models.CharField(max_length=5, choices=STATUS, default='SRB01')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['ticket_type']
    
    def __str__(self):
        return str(self.id) + ' - ' + self.ticket_type + ' - ' + self.ticket_category + ' - ' + str(self.simulator_ride_time_id) + ' - ' + str(self.booking_date)
