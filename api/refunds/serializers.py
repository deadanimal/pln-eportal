from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Refund
)

from users.serializers import (
    CustomUserSerializer
)

from fpxtransactions.serializers import (
    BankListSerializer
)

from showings.serializers import (
    ShowBookingExtendedSerializer
)

from simulatorrides.serializers import (
    SimulatorRideBookingExtendedSerializer
)

from venues.serializers import (
    FacilityBookingExtendedSerializer
)


class RefundSerializer(serializers.ModelSerializer):

    class Meta:
        model = Refund
        fields = '__all__'
        read_only_fields = ['id']


class RefundExtendedSerializer(serializers.ModelSerializer):
    bank_id = BankListSerializer(read_only=True)
    incharge_id = CustomUserSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)
    pic_verification_id = CustomUserSerializer(read_only=True)

    show_booking_id = ShowBookingExtendedSerializer(read_only=True)
    simulator_ride_booking_id = SimulatorRideBookingExtendedSerializer(read_only=True)
    facility_booking_id = FacilityBookingExtendedSerializer(read_only=True)

    class Meta:
        model = Refund
        fields = '__all__'
        read_only_fields = ['id']
