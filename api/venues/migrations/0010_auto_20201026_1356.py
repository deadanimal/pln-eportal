# Generated by Django 2.2.6 on 2020-10-26 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venues', '0009_auto_20201023_0425'),
    ]

    operations = [
        migrations.AddField(
            model_name='facility',
            name='equipment_description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='facility',
            name='equipment_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
