# Generated by Django 2.2 on 2021-10-16 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simulatorrides', '0015_simulatorrideticket_ticket_booking_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='simulatorrideticket',
            name='ticket_booking_id',
            field=models.CharField(default='AD', max_length=100),
        ),
    ]
