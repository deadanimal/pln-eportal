from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    WhatIsInteresting
)

from users.serializers import (
    CustomUserSerializer
)


class WhatIsInterestingSerializer(serializers.ModelSerializer):

    class Meta:
        model = WhatIsInteresting
        fields = '__all__'
        read_only_fields = ['id']
