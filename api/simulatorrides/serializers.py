from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    SimulatorRide,
    SimulatorRideTime,
    SimulatorRideBooking
)

from venues.serializers import (
    VenueSerializer
)

from users.serializers import (
    CustomUserSerializer
)

from fpxtransactions.serializers import (
    FpxTransactionSerializer
)

class SimulatorRideSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SimulatorRide
        fields = '__all__'
        read_only_fields = ['id']

class SimulatorRideTimeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SimulatorRideTime
        fields = '__all__'
        read_only_fields = ['id']

class SimulatorRideTimeExtendedSerializer(serializers.ModelSerializer):
    venue_id = VenueSerializer(read_only=True)
    
    class Meta:
        model = SimulatorRideTime
        fields = '__all__'
        read_only_fields = ['id']

class SimulatorRideBookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SimulatorRideBooking
        fields = '__all__'
        read_only_fields = ['id']

class SimulatorRideBookingExtendedSerializer(serializers.ModelSerializer):
    simulator_ride_time_id = SimulatorRideTimeSerializer(read_only=True)
    user_id = CustomUserSerializer(read_only=True)
    fpx_transaction_id = FpxTransactionSerializer(read_only=True)
    
    class Meta:
        model = SimulatorRideBooking
        fields = '__all__'
        read_only_fields = ['id']