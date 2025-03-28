# Generated by Django 2.2.6 on 2020-09-29 15:15

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SurveyQuestion',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('questionnaire_question', models.CharField(default='NA', max_length=100)),
                ('questionnaire_type', models.CharField(choices=[('CB', 'Checkbox'), ('SL', 'Selection'), ('TB', 'Textbox'), ('NA', 'Not Available')], default='NA', max_length=2)),
                ('questionnaire_answer', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('questionnaire_module', models.CharField(choices=[('M01', 'Tayangan'), ('M02', 'Pameran'), ('M03', 'Program Pendidikan'), ('M04', 'Perpustakaan Maya'), ('M05', 'Kembara Simulasi'), ('M06', 'Lawatan'), ('M07', 'Penerbitan'), ('M08', 'Fasiliti'), ('NAV', 'Not Available')], default='NAV', max_length=3)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-questionnaire_type', '-created_date'],
            },
        ),
        migrations.CreateModel(
            name='SurveyAnswer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('answer', models.CharField(default='NA', max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('survey_question_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='survey_answer_question_id', to='surveys.SurveyQuestion')),
                ('user_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='survey_answer_user_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_date'],
            },
        ),
    ]
