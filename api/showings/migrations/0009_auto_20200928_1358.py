# Generated by Django 2.2.6 on 2020-09-28 13:58

from django.db import migrations, models
import showings.models


class Migration(migrations.Migration):

    dependencies = [
        ('showings', '0008_remove_showticket_no_ticket'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='showtime',
            name='end_datetime',
        ),
        migrations.RemoveField(
            model_name='showtime',
            name='start_datetime',
        ),
        migrations.AddField(
            model_name='showticket',
            name='no_ticket',
            field=models.CharField(blank=True, default=showings.models.increment_ticket_number, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='showtime',
            name='show_date',
            field=models.DateField(auto_now=True),
        ),
        migrations.AddField(
            model_name='showtime',
            name='show_time',
            field=models.TimeField(auto_now=True),
        ),
    ]
