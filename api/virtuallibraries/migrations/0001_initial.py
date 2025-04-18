# Generated by Django 2.2.6 on 2020-09-29 08:27

import core.helpers
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Virtuallibrary',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('title', models.CharField(default='NA', max_length=100)),
                ('abstract', models.CharField(default='NA', max_length=255)),
                ('year', models.IntegerField(default=2020)),
                ('poster_link', models.ImageField(blank=True, null=True, upload_to=core.helpers.PathAndRename('poster'))),
                ('document_link', models.FileField(blank=True, null=True, upload_to=core.helpers.PathAndRename('virtuallibrary'))),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['title'],
            },
        ),
    ]
