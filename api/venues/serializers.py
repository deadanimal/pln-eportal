from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Venue,
    FacilitySubcategory,
    Facility,
    FacilityPrice,
    FacilityImage,
    FacilityBooking
)

from users.serializers import (
    CustomUserSerializer
)

from assets.serializers import (
    AssetSerializer
)

class VenueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Venue
        fields = '__all__'
        read_only_fields = ['id']


class FacilitySubcategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FacilitySubcategory
        fields = '__all__'
        read_only_fields = ['id']


class FacilitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Facility
        fields = '__all__'
        read_only_fields = ['id']


class FacilityExtendedSerializer(serializers.ModelSerializer):
    facility_subcategory = FacilitySubcategorySerializer(read_only=True)
    pic_id = CustomUserSerializer(read_only=True)
    asset_id = AssetSerializer(read_only=True)
    venue_id = VenueSerializer(read_only=True)
    
    class Meta:
        model = Facility
        fields = '__all__'
        read_only_fields = ['id']


class FacilityPriceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FacilityPrice
        fields = '__all__'
        read_only_fields = ['id']


class FacilityPriceExtendedSerializer(serializers.ModelSerializer):
    facility_id = FacilitySerializer(read_only=True)
    
    class Meta:
        model = FacilityPrice
        fields = '__all__'
        read_only_fields = ['id']


class FacilityImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FacilityImage
        fields = '__all__'
        read_only_fields = ['id']


class FacilityImageExtendedSerializer(serializers.ModelSerializer):
    facility_id = FacilitySerializer(read_only=True)
    
    class Meta:
        model = FacilityImage
        fields = '__all__'
        read_only_fields = ['id']


class FacilityBookingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FacilityBooking
        fields = '__all__'
        read_only_fields = ['id']


class FacilityBookingExtendedSerializer(serializers.ModelSerializer):
    user_id = CustomUserSerializer(read_only=True)
    pic_id = CustomUserSerializer(read_only=True)
    facility_id = FacilityExtendedSerializer(read_only=True)
    
    class Meta:
        model = FacilityBooking
        fields = '__all__'
        read_only_fields = ['id']
    
