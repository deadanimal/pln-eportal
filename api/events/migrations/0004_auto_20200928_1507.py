# Generated by Django 2.2.6 on 2020-09-28 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20200928_1437'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='visitapplication',
            options={'ordering': ['-created_date']},
        ),
        migrations.RemoveField(
            model_name='visitapplication',
            name='description',
        ),
        migrations.RemoveField(
            model_name='visitapplication',
            name='title',
        ),
    ]
