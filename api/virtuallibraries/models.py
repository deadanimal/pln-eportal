from __future__ import unicode_literals
import uuid
import datetime
from django.db import models
from django.utils.formats import get_format
#from django import models
from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename


class VirtualLibraryCategory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)

    LINK = [
        ('tentang-kami', 'Mengenai Kami'),
        ('artikel-terkini', 'Artikel Terkini'),
        ('koleksi', 'Koleksi'),
        ('perkhidmatan', 'Perkhidmatan'),
        ('not-available', 'Tiada'),
    ]

    link = models.CharField(max_length=50, choices=LINK,
                            default='not-available', blank=True, unique=True)
    status = models.BooleanField(default=False)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name_ms']

    def __str__(self):
        return self.name_ms


class VirtualLibraryArticle(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)
    date = models.DateField(default=datetime.date.today)
    status = models.BooleanField(default=False)
    download_pdf_counter = models.IntegerField(default=0)
    pdf_link = models.FileField(
        null=True, blank=True, upload_to=PathAndRename('virtuallibrary_article_pdf'))
    virtual_library_article_category_id = models.ForeignKey(
        VirtualLibraryCategory, on_delete=models.CASCADE, related_name='virtual_library_article_category_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name_ms


class VirtualLibraryCollection(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)

    LINK = [
        ('buku', 'Buku'),
        ('terbitan-bersiri', 'Terbitan Bersiri'),
        ('e-sumber', 'eSumber'),
        ('arkib-kutubkhanah', 'Arkib Kutubkhanah'),
        ('not-available', 'Tiada'),
    ]

    link = models.CharField(max_length=50, choices=LINK,
                            default='not-available', blank=True, unique=True)
    status = models.BooleanField(default=False)
    virtual_library_collection_category_id = models.ForeignKey(
        VirtualLibraryCategory, on_delete=models.CASCADE, related_name='virtual_library_collection_category_id', null=True)

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['name_ms']

    def __str__(self):
        return self.name_ms


class VirtualLibraryBook(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA', blank=True)
    title_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)
    call_number = models.CharField(max_length=100, default='NA', blank=True)
    author = models.CharField(max_length=100, default='NA', blank=True)
    author_added = models.CharField(max_length=100, default='NA', blank=True)
    editor = models.CharField(max_length=100, default='NA', blank=True)
    isbn = models.CharField(max_length=100, default='NA', blank=True)
    issn = models.CharField(max_length=100, default='NA', blank=True)
    year = models.CharField(max_length=4, default='2020', blank=True)
    publisher_name = models.CharField(max_length=100, default='NA', blank=True)
    published_date = models.DateField(default=datetime.date.today, null=True)
    notes = models.CharField(max_length=255, default='NA', blank=True)

    STATUS = [
        ('ACT', 'Active'),
        ('IAC', 'Inactive'),
        ('ARC', 'Archive'),
    ]

    status = models.CharField(max_length=3, choices=STATUS, default='ACT')
    download_pdf_counter = models.IntegerField(default=0)
    image_link = models.ImageField(
        null=True, blank=True, upload_to=PathAndRename('virtuallibrary_book_image'))
    pdf_link = models.FileField(
        null=True, blank=True, upload_to=PathAndRename('virtuallibrary_book_pdf'))
    virtual_library_collection_id = models.ForeignKey(
        VirtualLibraryCollection, on_delete=models.CASCADE, related_name='virtual_library_book_collection_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms


class VirtualLibrarySerialPublication(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    title_en = models.CharField(max_length=255, default='NA', blank=True)
    title_ms = models.CharField(max_length=255, default='NA', blank=True)
    description_en = models.TextField(blank=True)
    description_ms = models.TextField(blank=True)
    call_number = models.CharField(max_length=100, default='NA', blank=True)
    author = models.CharField(max_length=100, default='NA', blank=True)
    author_added = models.CharField(max_length=100, default='NA', blank=True)
    editor = models.CharField(max_length=100, default='NA', blank=True)
    isbn = models.CharField(max_length=100, default='NA', blank=True)
    issn = models.CharField(max_length=100, default='NA', blank=True)
    year = models.CharField(max_length=4, default='2020', blank=True)
    publisher_name = models.CharField(max_length=100, default='NA', blank=True)
    published_date = models.DateField(default=datetime.date.today, null=True)
    notes = models.CharField(max_length=255, default='NA', blank=True)

    STATUS = [
        ('ACT', 'Active'),
        ('IAC', 'Inactive'),
        ('ARC', 'Archive'),
    ]

    status = models.CharField(max_length=3, choices=STATUS, default='ACT')
    download_pdf_counter = models.IntegerField(default=0)
    image_link = models.ImageField(null=True, blank=True, upload_to=PathAndRename(
        'virtuallibrary_serialpublication_image'))
    pdf_link = models.FileField(null=True, blank=True, upload_to=PathAndRename(
        'virtuallibrary_serialpublication_pdf'))
    virtual_library_collection_id = models.ForeignKey(
        VirtualLibraryCollection, on_delete=models.CASCADE, related_name='virtual_library_serialpublication_collection_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.title_ms


class VirtualLibraryESourceCategory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)
    status = models.BooleanField(default=False)
    virtual_library_collection_id = models.ForeignKey(
        VirtualLibraryCollection, on_delete=models.CASCADE, related_name='virtual_library_esource_collection_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name_ms


class VirtualLibraryESource(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    link = models.CharField(max_length=255, default='NA', blank=True)
    status = models.BooleanField(default=False)
    virtual_library_esource_category_id = models.ForeignKey(
        VirtualLibraryESourceCategory, on_delete=models.CASCADE, related_name='virtual_library_esource_category_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name_ms


class VirtualLibraryArchiveKutubkhanahCategory(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    icon = models.CharField(max_length=50, default='NA', blank=True)

    ARCHIVE_FROM = [
        ('KBK', 'Koleksi - Buku'),
        ('KTB', 'Koleksi - Terbitan Bersiri'),
        ('NAV', 'Not Available')
    ]
    archive_from = models.CharField(
        max_length=3, choices=ARCHIVE_FROM, default='NAV')
    status = models.BooleanField(default=False)
    virtual_library_collection_id = models.ForeignKey(
        VirtualLibraryCollection, on_delete=models.CASCADE, related_name='virtual_library_archivekutubkhanah_collection_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name_ms


class VirtualLibraryArchiveKutubkhanah(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name_en = models.CharField(max_length=255, default='NA', blank=True)
    name_ms = models.CharField(max_length=255, default='NA', blank=True)
    link = models.CharField(max_length=255, default='NA', blank=True)
    status = models.BooleanField(default=False)
    virtual_library_archivekutubkhanah_category_id = models.ForeignKey(
        VirtualLibraryArchiveKutubkhanahCategory, on_delete=models.CASCADE, related_name='virtual_library_archivekutubkhanah_category_id')

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return self.name_ms
