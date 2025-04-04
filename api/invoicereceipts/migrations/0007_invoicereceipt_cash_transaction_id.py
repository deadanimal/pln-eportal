# Generated by Django 2.2.6 on 2021-02-26 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashtransactions', '0001_initial'),
        ('invoicereceipts', '0006_auto_20210203_0330'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoicereceipt',
            name='cash_transaction_id',
            field=models.ManyToManyField(blank=True, related_name='invoice_receipt_cash_transaction', to='cashtransactions.CashTransaction'),
        ),
    ]
