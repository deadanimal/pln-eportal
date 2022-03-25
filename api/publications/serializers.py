from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Publication,
    PublicationCategory
)

class PublicationCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PublicationCategory
        fields = '__all__'
        read_only_fields = ['id']


class PublicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Publication
        fields = '__all__'
        read_only_fields = ['id']


class PublicationExtendedSerializer(serializers.ModelSerializer):
    publication_category_id = PublicationCategorySerializer(read_only=True)
    
    class Meta:
        model = Publication
        fields = '__all__'
        read_only_fields = ['id']
    
