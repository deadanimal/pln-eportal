# Generated by Django 2.2.6 on 2020-12-08 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='module',
            field=models.CharField(choices=[('simulator-ride', 'Kembara Simulasi'), ('shows', 'Tayangan'), ('exhibit', 'Pameran'), ('visit', 'Lawatan'), ('program', 'Program Pendidikan'), ('survey', 'Maklum Balas'), ('facility', 'Fasiliti'), ('publication', 'Penerbitan'), ('virtual-library', 'Kutubkhanah Mini')], default='simulator-ride', max_length=20, unique=True),
        ),
    ]
