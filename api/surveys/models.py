from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class SurveyQuestion(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    question = models.CharField(max_length=255, default='NA')

    SURVEY_TYPE = [
        ('CB', 'Checkbox'),
        ('SL', 'Selection'),
        ('TB', 'Textbox'),
        ('NA', 'Not Available')
    ]
    survey_type = models.CharField(max_length=2, choices=SURVEY_TYPE, default='NA')

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-survey_type', '-created_date']


class SurveyAnswer(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    answer = models.CharField(max_length=255, default='NA')
    question_id = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE, related_name='survey_question_id')
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='customer_id')
    
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_date']

