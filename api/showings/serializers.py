from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Showing,
    Showtime,
    ShowTicket,
    ShowBooking
)

from users.serializers import (
    CustomUserSerializer
)

from fpxtransactions.serializers import (
    FpxTransactionSerializer
)

class ShowingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Showing
        fields = '__all__'
        read_only_fields = ['id']
    
class ShowtimeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Showtime
        fields = '__all__'
        read_only_fields = ['id']

class ShowtimeExtendedSerializer(serializers.ModelSerializer):
    showing_id = ShowingSerializer(read_only=True)

    class Meta:
        model = Showtime
        fields = '__all__'
        read_only_fields = ['id']

class ShowTicketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShowTicket
        fields = '__all__'
        read_only_fields = ['id']

class ShowTicketExtendedSerializer(serializers.ModelSerializer):
    show_id = ShowingSerializer(read_only=True)
    user_id = CustomUserSerializer(read_only=True)
    showtime_id = ShowtimeSerializer(read_only=True)

    class Meta:
        model = ShowTicket
        fields = '__all__'
        read_only_fields = ['id']

class ShowBookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShowBooking
        fields = '__all__'
        read_only_fields = ['id']

class ShowBookingExtendedSerializer(serializers.ModelSerializer):
    show_id = ShowingSerializer(read_only=True)
    user_id = CustomUserSerializer(read_only=True)
    showtime_id = ShowtimeSerializer(read_only=True)
    fpx_transaction_id = FpxTransactionSerializer(read_only=True)

    class Meta:
        model = ShowBooking
        fields = '__all__'
        read_only_fields = ['id']
