# Generated by Django 2.2.6 on 2020-12-18 06:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0002_module_module'),
    ]

    operations = [
        migrations.RenameField(
            model_name='module',
            old_name='description',
            new_name='description_en',
        ),
        migrations.RenameField(
            model_name='module',
            old_name='title',
            new_name='description_ms',
        ),
        migrations.AddField(
            model_name='module',
            name='title_en',
            field=models.CharField(blank=True, default='NA', max_length=255),
        ),
        migrations.AddField(
            model_name='module',
            name='title_ms',
            field=models.CharField(blank=True, default='NA', max_length=255),
        ),
    ]
