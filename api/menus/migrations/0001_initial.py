# Generated by Django 2.2.6 on 2021-09-06 07:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('path', models.CharField(blank=True, max_length=100)),
                ('title', models.CharField(blank=True, max_length=100)),
                ('type', models.CharField(choices=[('link', 'Menu'), ('sub', 'Menus')], default='link', max_length=10)),
                ('icontype', models.CharField(blank=True, max_length=100)),
                ('ordering', models.IntegerField(null=True)),
                ('active', models.BooleanField(default=False)),
                ('mainmenu', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['ordering'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalMenu',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4)),
                ('path', models.CharField(blank=True, max_length=100)),
                ('title', models.CharField(blank=True, max_length=100)),
                ('type', models.CharField(choices=[('link', 'Menu'), ('sub', 'Menus')], default='link', max_length=10)),
                ('icontype', models.CharField(blank=True, max_length=100)),
                ('ordering', models.IntegerField(null=True)),
                ('active', models.BooleanField(default=False)),
                ('mainmenu', models.CharField(blank=True, max_length=100)),
                ('created_date', models.DateTimeField(blank=True, editable=False)),
                ('modified_date', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical menu',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
