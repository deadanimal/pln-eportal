from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Cart
)

from users.serializers import (
    CustomUserSerializer
)

from showings.serializers import (
    ShowBookingSerializer,
    ShowBookingExtendedSerializer
)

from simulatorrides.serializers import (
    SimulatorRideBookingSerializer,
    SimulatorRideBookingExtendedSerializer
)

from venues.serializers import (
    FacilityBookingSerializer,
    FacilityBookingExtendedSerializer
)

class CartSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['id']


class CartExtendedSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    show_booking_id = ShowBookingExtendedSerializer(read_only=True, many=True)
    simulator_ride_booking_id = SimulatorRideBookingExtendedSerializer(read_only=True, many=True)
    facility_booking_id = FacilityBookingExtendedSerializer(read_only=True, many=True)

    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['id']
