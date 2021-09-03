from __future__ import unicode_literals 
import uuid, datetime, math, random, string
from django.db import models
from django.utils.formats import get_format
# from django import models
from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from users.models import (
    CustomUser
)

def generate_voucher_code(self):
    voucher_amount_trunc = str(math.trunc(self.voucher_amount))

    letters = string.ascii_uppercase
    range_letters = 10 - 3 - len(voucher_amount_trunc)
    prefix = 'PLN{}'.format(voucher_amount_trunc + ''.join(random.choice(letters) for i in range(range_letters)))
    return prefix

class Voucher(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    voucher_code = models.CharField(max_length=10, blank=True)
    voucher_amount = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    validity_until = models.DateField(null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    description = models.TextField(blank=True)

    # status voucher:
    # not_used
    # already_used
    # expired
    STATUS = [
        ('NU', 'Not Used'),
        ('AU', 'Already Used'),
        ('EX', 'Expired')
    ]
    status = models.CharField(choices=STATUS, max_length=2, default='NU')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        if not self.voucher_code:
            prefix = generate_voucher_code(self)
            while self.__class__.objects.filter(voucher_code=prefix).exists() is True:
                prefix = generate_voucher_code(self)
                if self.__class__.objects.filter(voucher_code=prefix).exists() is False:
                    break
            
            self.voucher_code = prefix

        super(Voucher, self).save(*args, **kwargs)

    class meta:
        ordering = ['-created_date']