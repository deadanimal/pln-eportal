from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Menu,
    MenuRole
)

from users.serializers import (
    RoleSerializer,
    CustomUserSerializer
)


class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'
        read_only_fields = ['id']

class MenuRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuRole
        fields = '__all__'
        read_only_fields = ['id']

class MenuRoleExtendedSerializer(serializers.ModelSerializer):
    menu = MenuSerializer(read_only=True)
    role = RoleSerializer(read_only=True)

    class Meta:
        model = MenuRole
        fields = '__all__'
        read_only_fields = ['id']
