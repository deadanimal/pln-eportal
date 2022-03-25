from __future__ import unicode_literals 
import uuid 
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

class PaymentTicket(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    # name = models.CharField(max_length=255, default='NA')

    PAYMENT_METHOD = [
        ('MN', 'Manual'),
        ('OL', 'Online'),
        ('OT', 'Other')
    ]
    payment_method = models.CharField(max_length=2, choices=PAYMENT_METHOD, default='OT')
    amount_paid = models.IntegerField(default=0)
    customer_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='payment_ticket_customer_id')
    
    created_date = models.DateTimeField(auto_now_add=True) # can add null=True if got error
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_date']
    
