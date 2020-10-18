from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class SurveyQuestion(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    questionnaire_fieldname = models.CharField(max_length=50, blank=True)
    questionnaire_question = models.CharField(max_length=100, default='NA')

    QUESTIONNAIRE_TYPE = [
        ('CB', 'Checkbox'),
        ('SL', 'Selection'),
        ('TB', 'Textbox'),
        ('RB', 'Radiobox'),
        ('NA', 'Not Available')
    ]
    questionnaire_type = models.CharField(max_length=2, choices=QUESTIONNAIRE_TYPE, default='NA')
    questionnaire_answer = ArrayField(models.CharField(max_length=100), blank=True, null=True)

    QUESTIONNAIRE_MODULE = [
        ('M01', 'Tayangan'),
        ('M02', 'Pameran'),
        ('M03', 'Program Pendidikan'),
        ('M04', 'Perpustakaan Maya'),
        ('M05', 'Kembara Simulasi'),
        ('M06', 'Lawatan'),
        ('M07', 'Penerbitan'),
        ('M08', 'Fasiliti'),
        ('NAV', 'Not Available')
    ]
    questionnaire_module = models.CharField(max_length=3, choices=QUESTIONNAIRE_MODULE, default='NAV')
    questionnaire_status = models.BooleanField(default=True)

    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-questionnaire_type', '-created_date']


class SurveyAnswer(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    answer = models.CharField(max_length=100, default='NA')
    survey_question_id = models.ForeignKey(SurveyQuestion, on_delete=models.CASCADE, related_name='survey_answer_question_id',  null=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='survey_answer_user_id', null=True)
    
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_date']

