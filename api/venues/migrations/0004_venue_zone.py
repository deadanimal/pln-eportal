# Generated by Django 2.2.6 on 2020-09-30 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venues', '0003_auto_20200930_0254'),
    ]

    operations = [
        migrations.AddField(
            model_name='venue',
            name='zone',
            field=models.CharField(choices=[('A', 'Alam Semesta'), ('B', 'Ruang Kanak-kanak'), ('C', 'Teknologi Satelit'), ('D', 'Misi Angkasa'), ('E', 'Sistem Solar'), ('F', 'Gelombang'), ('N', 'Not Available')], default='N', max_length=1),
        ),
    ]
