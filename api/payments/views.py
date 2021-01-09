from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

from decouple import config
from OpenSSL import crypto

import base64
import datetime
import OpenSSL
import requests

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from payments.models import (
    PaymentTicket
)

from payments.serializers import (
    PaymentTicketSerializer
)


class PaymentTicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = PaymentTicket.objects.all()
    serializer_class = PaymentTicketSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'payment_method',
        'amount_paid',
        'customer_id',
        'created_date'
    ]

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = PaymentTicket.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = Payment.objects.all()
            else:
                queryset = Payment.objects.filter(company=company.id)
        """
        return queryset

    @action(methods=['POST'], detail=False)
    def fpx_confirm(self, request, *args, **kwargs):

        data = {
            'fpx_msgType': "AR",
            'fpx_msgToken': "01",
            'fpx_sellerExId': config('FPX_EXCHANGE_ID'),
            'fpx_sellerExOrderNo': datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
            'fpx_sellerTxnTime': datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
            'fpx_sellerOrderNo': datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
            'fpx_sellerId': config('FPX_SELLER_ID'),
            'fpx_sellerBankCode': "01",
            'fpx_txnCurrency': "MYR",
            'fpx_txnAmount': "{:.2f}".format(float(self.request.data['fpx_txnAmount'])),
            'fpx_buyerEmail': "",
            'fpx_checkSum': "",
            'fpx_buyerName': "",
            'fpx_buyerBankId': "TEST0021",
            'fpx_buyerBankBranch': "",
            'fpx_buyerAccNo': "",
            'fpx_buyerId': "",
            'fpx_makerName': "",
            'fpx_buyerIban': "",
            'fpx_productDesc': "SampleProduct",
            'fpx_version': "6.0",
        }
        # print(data)

        key_file = open('./csrandkey/EX00012063.key')
        key = key_file.read()
        key_file.close()
        # print(key)

        if key.startswith('-----BEGIN '):
            pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, key)
        else:
            pkey = crypto.load_pkcs12(key).get_privatekey()
        # print(pkey)

        fpx_checkSum = "|".join([data['fpx_buyerAccNo'],data['fpx_buyerBankBranch'],data['fpx_buyerBankId'],data['fpx_buyerEmail'],data['fpx_buyerIban'],data['fpx_buyerId'],data['fpx_buyerName'],data['fpx_makerName'],data['fpx_msgToken'],data['fpx_msgType'],data['fpx_productDesc'],data['fpx_sellerBankCode'],data['fpx_sellerExId'],data['fpx_sellerExOrderNo'],data['fpx_sellerId'],data['fpx_sellerOrderNo'],data['fpx_sellerTxnTime'],data['fpx_txnAmount'],data['fpx_txnCurrency'],data['fpx_version']])
        sign = OpenSSL.crypto.sign(pkey, fpx_checkSum, "sha1")
        # print(sign)

        data_base16 = base64.b16encode(sign)
        data['fpx_checkSum'] = data_base16.decode('utf-8')

        # print(data)
        # r = requests.post("https://uat.mepsfpx.com.my/FPXMain/seller2DReceiver.jsp", data=data)
        # print(r);

        # return JsonResponse({'data': r.text})
        return JsonResponse(data)
