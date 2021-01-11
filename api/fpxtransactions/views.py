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

from .models import (
    FpxTransaction
)

from .serializers import (
    FpxTransactionSerializer
)


class FpxTransactionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = FpxTransaction.objects.all()
    serializer_class = FpxTransactionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    


    def get_queryset(self):
        queryset = FpxTransaction.objects.all()
        return queryset


    @action(methods=['POST'], detail=False)
    def fpx_confirm_ar(self, request, *args, **kwargs):

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


    @action(methods=['POST'], detail=False)
    def fpx_direct_ac(self, request, *args, **kwargs):

        fpx_buyerBankBranch = request.POST.get('fpx_buyerBankBranch')
        fpx_buyerBankId = request.POST.get('fpx_buyerBankId')
        fpx_buyerIban = request.POST.get('fpx_buyerIban')
        fpx_buyerId = request.POST.get('fpx_buyerId')
        fpx_buyerName = request.POST.get('fpx_buyerName')
        fpx_creditAuthCode = request.POST.get('fpx_creditAuthCode')
        fpx_creditAuthNo = request.POST.get('fpx_creditAuthNo')
        fpx_debitAuthCode = request.POST.get('fpx_debitAuthCode')
        fpx_debitAuthNo = request.POST.get('fpx_debitAuthNo')
        fpx_fpxTxnId = request.POST.get('fpx_fpxTxnId')
        fpx_fpxTxnTime = request.POST.get('fpx_fpxTxnTime')
        fpx_makerName = request.POST.get('fpx_makerName')
        fpx_msgToken = request.POST.get('fpx_msgToken')
        fpx_msgType = request.POST.get('fpx_msgType')
        fpx_sellerExId = request.POST.get('fpx_sellerExId')
        fpx_sellerExOrderNo = request.POST.get('fpx_sellerExOrderNo')
        fpx_sellerId = request.POST.get('fpx_sellerId')
        fpx_sellerOrderNo = request.POST.get('fpx_sellerOrderNo')
        fpx_sellerTxnTime = request.POST.get('fpx_sellerTxnTime')
        fpx_txnAmount = request.POST.get('fpx_txnAmount')
        fpx_txnCurrency = request.POST.get('fpx_txnCurrency')
        fpx_checkSum = request.POST.get('fpx_checkSum')

        data = {}

        return JsonResponse(data)