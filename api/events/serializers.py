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
    EducationalProgramApplication,
    VisitApplication
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

class EducationalProgramApplicationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgramApplication
        fields = '__all__'
        read_only_fields = ['id']

class VisitApplicationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VisitApplication
        fields = '__all__'
        read_only_fields = ['id']
