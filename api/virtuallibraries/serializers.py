from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    VirtualLibraryCategory,
    VirtualLibraryArticle,
    VirtualLibraryCollection,
    VirtualLibraryBook,
    VirtualLibrarySerialPublication,
    VirtualLibraryESourceCategory,
    VirtualLibraryESource,
    VirtualLibraryArchiveKutubkhanahCategory,
    VirtualLibraryArchiveKutubkhanah
)


class VirtualLibraryCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryCategory
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryArticle
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArticleExtendedSerializer(serializers.ModelSerializer):
    virtual_library_article_category_id = VirtualLibraryCategorySerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryArticle
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryCollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryCollection
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryCollectionExtendedSerializer(serializers.ModelSerializer):
    virtual_library_collection_category_id = VirtualLibraryCategorySerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryCollection
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryBook
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryBookExtendedSerializer(serializers.ModelSerializer):
    virtual_library_collection_id = VirtualLibraryCollectionSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryBook
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibrarySerialPublicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibrarySerialPublication
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibrarySerialPublicationExtendedSerializer(serializers.ModelSerializer):
    virtual_library_collection_id = VirtualLibraryCollectionSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibrarySerialPublication
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryESourceCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryESourceCategory
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryESourceCategoryExtendedSerializer(serializers.ModelSerializer):
    virtual_library_collection_id = VirtualLibraryCollectionSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryESourceCategory
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryESourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryESource
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryESourceExtendedSerializer(serializers.ModelSerializer):
    virtual_library_esource_category_id = VirtualLibraryESourceCategoryExtendedSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryESource
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArchiveKutubkhanahCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryArchiveKutubkhanahCategory
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArchiveKutubkhanahCategoryExtendedSerializer(serializers.ModelSerializer):
    virtual_library_collection_id = VirtualLibraryCollectionSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryArchiveKutubkhanahCategory
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArchiveKutubkhanahSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualLibraryArchiveKutubkhanah
        fields = '__all__'
        read_only_fields = ['id']


class VirtualLibraryArchiveKutubkhanahExtendedSerializer(serializers.ModelSerializer):
    virtual_library_archivekutubkhanah_category_id = VirtualLibraryArchiveKutubkhanahCategoryExtendedSerializer(
        read_only=True)

    class Meta:
        model = VirtualLibraryArchiveKutubkhanah
        fields = '__all__'
        read_only_fields = ['id']
