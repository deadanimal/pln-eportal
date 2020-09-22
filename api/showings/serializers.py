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
    ShowTicket
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

class ShowTicketSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShowTicket
        fields = '__all__'
        read_only_fields = ['id']
