from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    SurveyAnswer,
    SurveyQuestion
)

from users.serializers import (
    CustomUserSerializer
)

class SurveyQuestionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SurveyQuestion
        fields = '__all__'
        read_only_fields = ['id']

class SurveyAnswerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SurveyAnswer
        fields = '__all__'
        read_only_fields = ['id']

class SurveyAnswerExtendedSerializer(serializers.ModelSerializer):
    survey_question_id = SurveyQuestionSerializer(read_only=True)
    user_id = CustomUserSerializer(read_only=True)
    
    class Meta:
        model = SurveyAnswer
        fields = '__all__'
        read_only_fields = ['id']
    
