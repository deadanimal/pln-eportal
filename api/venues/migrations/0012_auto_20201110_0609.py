# Generated by Django 2.2.6 on 2020-11-10 06:09

import core.helpers
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('venues', '0011_facilitybooking_want_equipment'),
    ]

    operations = [
        migrations.CreateModel(
            name='FacilitySubcategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('code', models.CharField(blank=True, max_length=10)),
                ('name', models.CharField(blank=True, max_length=50)),
                ('image_link', models.ImageField(blank=True, null=True, upload_to=core.helpers.PathAndRename('image'))),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['code'],
            },
        ),
        migrations.AlterField(
            model_name='facility',
            name='facility_subcategory',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facility_subcategory_id', to='venues.FacilitySubcategory'),
        ),
    ]
