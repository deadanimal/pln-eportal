from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Exhibit,
    EducationalProgram,
    EducationalProgramDate,
    EducationalProgramApplication,
    VisitApplication
)

from users.serializers import (
    CustomUserSerializer
)

from venues.serializers import (
    VenueSerializer
)

class ExhibitSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Exhibit
        fields = '__all__'
        read_only_fields = ['id']
    
class EducationalProgramSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgram
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramExtendedSerializer(serializers.ModelSerializer):
    venue_id = VenueSerializer(read_only=True)
    coordinator_id = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = EducationalProgram
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramDateSerializer(serializers.ModelSerializer):

    class Meta:
        model = EducationalProgramDate
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramApplicationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgramApplication
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramApplicationExtendedSerializer(serializers.ModelSerializer):
    customer_id = CustomUserSerializer(read_only=True)
    educational_program_id = EducationalProgramSerializer(read_only=True)
    educational_program_date_id = EducationalProgramDateSerializer(read_only=True)
    
    class Meta:
        model = EducationalProgramApplication
        fields = '__all__'
        read_only_fields = ['id']

class VisitApplicationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VisitApplication
        fields = '__all__'
        read_only_fields = ['id']

class VisitApplicationExtendedSerializer(serializers.ModelSerializer):
    customer_id = CustomUserSerializer(read_only=True)
    pic_id = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = VisitApplication
        fields = '__all__'
        read_only_fields = ['id']
