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
    ExhibitList,
    ExhibitDetail,
    ExhibitDetailImage,
    EducationalProgram,
    EducationalProgramDate,
    EducationalProgramImage,
    EducationalProgramActivity,
    EducationalProgramApplication,
    EducationalProgramForm,
    Visit,
    VisitApplication
)

from users.serializers import (
    CustomUserSerializer
)

from venues.serializers import (
    VenueSerializer
)

from assets.serializers import (
    AssetSerializer
)

class ExhibitSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Exhibit
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitExtendedSerializer(serializers.ModelSerializer):
    pic_id = CustomUserSerializer(read_only=True)
    asset_id = AssetSerializer(many=True, read_only=True)
    
    class Meta:
        model = Exhibit
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExhibitList
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitListExtendedSerializer(serializers.ModelSerializer):
    exhibit_id = ExhibitSerializer(read_only=True)
    
    class Meta:
        model = ExhibitList
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExhibitDetail
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitDetailExtendedSerializer(serializers.ModelSerializer):
    venue_id = VenueSerializer(read_only=True)
    exhibit_list_id = ExhibitListSerializer(read_only=True)
    
    class Meta:
        model = ExhibitDetail
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitDetailImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ExhibitDetailImage
        fields = '__all__'
        read_only_fields = ['id']

class ExhibitDetailImageExtendedSerializer(serializers.ModelSerializer):
    exhibit_detail_id = ExhibitDetailSerializer(read_only=True)
    
    class Meta:
        model = ExhibitDetailImage
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

class EducationalProgramImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgramImage
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramActivitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgramActivity
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

class EducationalProgramFormSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = EducationalProgramForm
        fields = '__all__'
        read_only_fields = ['id']

class EducationalProgramFormExtendedSerializer(serializers.ModelSerializer):
    customer_id = CustomUserSerializer(read_only=True)
    educational_program_id = EducationalProgramSerializer(read_only=True)
    
    class Meta:
        model = EducationalProgramForm
        fields = '__all__'
        read_only_fields = ['id']

class VisitSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Visit
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
