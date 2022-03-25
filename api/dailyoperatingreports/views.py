from django.shortcuts import render
from django.conf import settings
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template, render_to_string

from datetime import datetime
from weasyprint import default_url_fetcher, HTML, CSS

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    DailyOperatingReport,
    Contractor,
    OperatingSchedule,
    VisitorSummary,
    DetailReport
)

from .serializers import (
    DailyOperatingReportSerializer,
    DailyOperatingReportExtendedSerializer,
    ContractorSerializer,
    OperatingScheduleSerializer,
    VisitorSummarySerializer,
    DetailReportSerializer
)

def change_date_to_word_ms(day, month, year):

    month_ms = ['JANUARI', 'FEBRUARI', 'MAC', 'APRIL', 'MEI', 'JUN', 'JULAI', 'OGOS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DISEMBER']
    day_ms = ['ISNIN', 'SELASA', 'RABU', 'KHAMIS', 'JUMAAT', 'SABTU', 'AHAD']

    date_str = day+'/'+month+'/'+year
    format_str = '%d/%m/%Y'
    datetime_obj = datetime.strptime(date_str, format_str)

    if (month[0:1] == "0"):
        month = month_ms[int(month[1:2])-1]
    else:
        month = month_ms[int(month)-1]

    return day +' '+ month +' '+ year +' '+ '('+day_ms[datetime_obj.weekday()]+')'


class DailyOperatingReportViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DailyOperatingReport.objects.all()
    serializer_class = DailyOperatingReportSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'report_by']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = DailyOperatingReport.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = DailyOperatingReport.objects.all()
        id = request.query_params.get('id', None)
        report_by = request.query_params.get('report_by', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if report_by is not None:
            queryset = queryset.filter(report_by=report_by)

        serializer_class = DailyOperatingReportExtendedSerializer(
            queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['GET'], detail=False)
    def generate_daily_operating_report(self, request):

        # Model data
        daily_operating_report_id = request.query_params.get('id', None)

        queryset = DailyOperatingReport.objects.all()
        if daily_operating_report_id is not None:
            queryset = queryset.filter(id=daily_operating_report_id)

        serializer_class = DailyOperatingReportExtendedSerializer(
            queryset, many=True)

        items = serializer_class.data[0].items()

        contractors = Contractor.objects.filter(
            daily_operating_report_id=daily_operating_report_id).values()
        operating_schedules = OperatingSchedule.objects.filter(
            daily_operating_report_id=daily_operating_report_id).values()
        visitor_summaries = VisitorSummary.objects.filter(
            daily_operating_report_id=daily_operating_report_id).values()
        details = DetailReport.objects.filter(
            daily_operating_report_id=daily_operating_report_id).values()

        petugas_info = {}
        for key, value in items:
            # print(key, '=>', value)
            if key == 'report_date':
                day = value[8:11]
                month = value[5:7]
                year = value[0:4]
                petugas_info['report_date'] = change_date_to_word_ms(day, month, year)

            if key == 'report_by':
                for key_user, value_user in value.items():
                    if key_user == 'full_name':
                        petugas_info['full_name'] = value_user
            
            if key == 'report_by_position':
                petugas_info['report_by_position'] = value
            if key == 'operations_manager':
                petugas_info['operations_manager'] = value
            if key == 'technical_officer':
                petugas_info['technical_officer'] = '\n'.join(value)
            if key == 'ticket_counter_clerk':
                petugas_info['ticket_counter_clerk'] = '\n'.join(value)
            if key == 'stage_officer':
                petugas_info['stage_officer'] = value
            if key == 'info_counter_clerk':
                petugas_info['info_counter_clerk'] = value
            if key == 'librarian':
                petugas_info['librarian'] = value

        # Rendered
        html_string = render_to_string(
            'reports/daily_operating.html', {'petugas_info': petugas_info, 'kontraktor_info': contractors, 'jadual_kendalian_info': operating_schedules, 'rumusan_pelawat_info': visitor_summaries, 'keterangan_info': details})
        html = HTML(string=html_string, base_url=request.build_absolute_uri())
        result = html.write_pdf(
            stylesheets=[CSS(settings.STATIC_ROOT + '/css/bootstrap.css')])

        # Creating http response
        filename = 'Laporan_Harian_Operasi_Planetarium_Negara.pdf'
        response = HttpResponse(result, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="'+filename+'"'
        response['Content-Transfer-Encoding'] = 'binary'
        # with tempfile.NamedTemporaryFile(delete=True) as output:
        #     output.write(result)
        #     output.flush()
        #     output = open(output.name, 'rb')
        #     response.write(output.read())

        return response


class ContractorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'daily_operating_report_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Contractor.objects.all()
        return queryset


class OperatingScheduleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = OperatingSchedule.objects.all()
    serializer_class = OperatingScheduleSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'daily_operating_report_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = OperatingSchedule.objects.all()
        return queryset


class VisitorSummaryViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = VisitorSummary.objects.all()
    serializer_class = VisitorSummarySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'daily_operating_report_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = VisitorSummary.objects.all()
        return queryset


class DetailReportViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = DetailReport.objects.all()
    serializer_class = DetailReportSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'daily_operating_report_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = DetailReport.objects.all()
        return queryset
