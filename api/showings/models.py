from __future__ import unicode_literals 
import uuid, datetime
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
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

def increment_ticket_number():
    return 'hahaha'
    # last_ticket = ShowTicket.objects.all().order_by('id').last()
    # if not last_ticket:
    #     return 'P0000001'
    # ticket_no = last_ticket.no_ticket
    # ticket_int = int(ticket_no.split('P')[-1])
    # new_ticket_int = ticket_int + 1
    # new_ticket_no = '' + str(new_ticket_int)
    # return new_ticket_no

class Showing(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA')
    description_en = models.TextField(blank=True)
    title_ms = models.CharField(max_length=255, default='NA')
    description_ms = models.TextField(blank=True)

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
    # trailer_link = models.FileField(null=True, blank=True, upload_to=PathAndRename('trailers'))
    trailer_link = models.URLField(null=True)

    STATUS = [
        ('AV', 'Available'),
        ('NA', 'Not Available')
    ]
    status = models.CharField(max_length=2, choices=STATUS, default='AV')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title_ms']

    def __str__(self):
        return self.title_ms


class Showtime(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    show_date = models.DateField(default=datetime.date.today)
    show_time = models.TimeField(null=True)
    # start_datetime = models.DateTimeField(blank=True)
    # end_datetime = models.DateTimeField(blank=True)
    showing_id = models.ForeignKey(Showing, on_delete=models.CASCADE, related_name='showing')
    venue_id = models.ManyToManyField(Venue, related_name='venue')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['show_date']

    # def __str__(self):
    #     return self.showing_id


class ShowTicket(models.Model):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    no_ticket = models.CharField(max_length=500, default=increment_ticket_number, null=True, blank=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)

    TICKET_CATEGORY = [
        ('AD', 'Adult'),
        ('KD', 'Kid'),
        ('OF', 'Old Folk'),
        ('SD', 'Student'),
        ('OK', 'OKU')
    ]
    ticket_category = models.CharField(max_length=2, choices=TICKET_CATEGORY, default='AD')

    TICKET_TYPE = [
        ('CZ', 'Citizen'),
        ('NC', 'Non-citizen')
    ]
    ticket_type = models.CharField(max_length=2, choices=TICKET_TYPE, default='CZ')
    ticket_seat = models.CharField(max_length=3, default='NA')
    qrcode = models.CharField(max_length=100, default='NA')
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="showticket_customer", default="")
    showtime_id = models.ForeignKey(Showtime, on_delete=models.CASCADE, related_name="showticket_showtime")
    show_id = models.ForeignKey(Showing, on_delete=models.CASCADE, related_name="showticket_showing", default="")
    
    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.user_id

class ShowBooking(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    showtime_id = models.ForeignKey(Showtime, on_delete=models.CASCADE, related_name="showbooking_showtime")

    TICKET_TYPE = [
        ('CZ', 'Citizen'),
        ('NC', 'Non-citizen')
    ]
    ticket_type = models.CharField(max_length=2, choices=TICKET_TYPE, default='CZ')
    TICKET_CATEGORY = [
        ('AD', 'Adult'),
        ('KD', 'Kid'),
        ('OF', 'Old Folk'),
        ('SD', 'Student'),
        ('OK', 'OKU')
    ]
    ticket_category = models.CharField(max_length=2, choices=TICKET_CATEGORY, default='AD')
    ticket_quantity = models.IntegerField()
    ticket_seat = models.CharField(max_length=3, default='NA')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="customer")
    show_id = models.ForeignKey(Showing, on_delete=models.CASCADE, related_name="showbooking_showing")

    # status tayangan: dalam proses, diterima, ditolak, terima bayaran, tolak bayaran, pending payment, refund
    # dalam proses - tunggu approval dari pengarah jika menempah lebih dari 30 orang atau memohon voucher kepada Planetarium
    # diterima - selepas pengguna tekan butang buat bayaran di langkah 4 tempahan tayangan ATAU mendapat pengesahan daripada pengarah
    # ditolak - selepas pengarah menolak permohonan voucher
    # pending payment - selepas pengguna mula-mula berada di halaman checkout page
    # payment diterima - selepas FPX menghantar status 00 (Berjaya) ke dalam sistem
    # payment ditolak - selepas FPX menghantar status selain 00 ke dalam sistem
    # refund - pengguna ingat refund tempahan mereka
    STATUS = [
        ('SB01', 'In Progress'),
        ('SB02', 'Approved'),
        ('SB03', 'Rejected'),
        ('SB04', 'Pending Payment'),
        ('SB05', 'Payment Accepted'),
        ('SB06', 'Payment Rejected'),
        ('SB07', 'Refund')
    ]
    status = models.CharField(max_length=4, choices=STATUS, default='SB01')
    fpx_transaction_id = models.ForeignKey(FpxTransaction, on_delete=models.CASCADE, null=True, related_name='show_booking_fpx_transaction_id')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']

    # def __str__(self):
    #     return self.user_id
