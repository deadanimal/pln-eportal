# Generated by Django 2.2.6 on 2021-02-10 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venues', '0021_auto_20210210_0149'),
    ]

    operations = [
        migrations.AddField(
            model_name='facilityprice',
            name='equipment',
            field=models.CharField(choices=[('WITH', 'With Equipment'), ('WOUT', 'Without Equipment'), ('NA', 'Not Available')], default='NA', max_length=4),
        ),
    ]
