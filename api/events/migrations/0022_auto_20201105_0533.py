# Generated by Django 2.2.6 on 2020-11-05 05:33

import core.helpers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0021_auto_20201027_0502'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitapplication',
            name='document_link',
            field=models.FileField(blank=True, null=True, upload_to=core.helpers.PathAndRename('document')),
        ),
        migrations.AddField(
            model_name='visitapplication',
            name='other_activities',
            field=models.CharField(default='NA', max_length=255),
        ),
    ]
