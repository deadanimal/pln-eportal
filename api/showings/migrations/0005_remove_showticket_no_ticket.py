# Generated by Django 2.2.6 on 2020-09-28 04:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('showings', '0004_auto_20200928_0421'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='showticket',
            name='no_ticket',
        ),
    ]
