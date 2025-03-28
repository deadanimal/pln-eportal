# Generated by Django 2.2.6 on 2021-09-02 14:39

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('closebookings', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalCloseBooking',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4)),
                ('date_start', models.DateField(default=datetime.date.today, null=True)),
                ('date_end', models.DateField(default=datetime.date.today, null=True)),
                ('title_en', models.CharField(blank=True, max_length=255)),
                ('title_ms', models.CharField(blank=True, max_length=255)),
                ('description_en', models.TextField(blank=True)),
                ('description_ms', models.TextField(blank=True)),
                ('module', models.CharField(choices=[('simulator-ride', 'Kembara Simulasi'), ('shows', 'Tayangan'), ('facility', 'Fasiliti'), ('program', 'Program Pendidikan'), ('visit', 'Lawatan')], default='simulator-ride', max_length=50)),
                ('created_date', models.DateTimeField(blank=True, editable=False)),
                ('modified_date', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical close booking',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
