# Generated by Django 2.2.6 on 2020-10-26 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venues', '0010_auto_20201026_1356'),
    ]

    operations = [
        migrations.AddField(
            model_name='facilitybooking',
            name='want_equipment',
            field=models.BooleanField(default=False),
        ),
    ]
