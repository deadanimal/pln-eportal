# Generated by Django 2.2 on 2020-09-03 20:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('payments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentticket',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_ticket_customer_id', to=settings.AUTH_USER_MODEL),
        ),
    ]
