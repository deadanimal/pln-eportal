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

from showings.models import (
    ShowBooking
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from venues.models import (
    FacilityBooking
)

class Cart(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)

    CART_STATUS = [
        ('CM', 'Completed'),
        ('AB', 'Abandoned'),
        ('CR', 'Created'),
        ('NA', 'Not Available')
    ]
    cart_status = models.CharField(choices=CART_STATUS, max_length=2, default='CR')

    show_booking_id = models.ManyToManyField(ShowBooking, related_name='cart_show_booking', blank=True)
    simulator_ride_booking_id = models.ManyToManyField(SimulatorRideBooking, related_name='cart_simulator_ride_booking', blank=True)
    facility_booking_id = models.ManyToManyField(FacilityBooking, related_name='cart_facility_booking', blank=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']