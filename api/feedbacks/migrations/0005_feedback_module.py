# Generated by Django 2.2.6 on 2021-01-31 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feedbacks', '0004_feedback_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='module',
            field=models.CharField(choices=[('simulator-ride', 'Kembara Simulasi'), ('shows', 'Tayangan'), ('exhibit', 'Pameran'), ('visit', 'Lawatan'), ('program', 'Program Pendidikan'), ('facility', 'Fasiliti'), ('publication', 'Penerbitan'), ('virtual-library', 'Kutubkhanah Mini')], default='simulator-ride', max_length=20),
        ),
    ]
