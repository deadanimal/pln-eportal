from django.shortcuts import render
from django.db.models import Q
from django.http import JsonResponse

from decouple import config
from OpenSSL import crypto
from urllib.parse import unquote

import base64
import datetime
import math
import OpenSSL
import pathlib
import requests
import time
import urllib

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    FpxTransaction,
    BankList
)

from .serializers import (
    FpxTransactionSerializer,
    BankListSerializer
)


# convert hex to binary
def hextobin(hexstr):

    return "{0:08b}".format(int(hexstr, 16))


# to verify the cert file is exist
def certRollOver(crt):

    file = pathlib.Path(crt)
    if file.exists():
        return True
    else:
        return False


# to check if the cert file is expiry or not
def checkCertExpiry(path):

    t_ime = int(time.time())
    curr_date = datetime.datetime.utcfromtimestamp(t_ime).strftime("%Y%m%d")

    cert_exists = False

    key_id = open(path)
    key = key_id.read()
    key_id.close()
    # if key_id is None:
    # increment
    # cert_exists

    certinfo = OpenSSL.crypto.load_certificate(crypto.FILETYPE_PEM, key)
    s = certinfo.get_notAfter()  # to get expiry date: Ymd
    crtexpirydate = s[0:8]
    if crtexpirydate.decode('utf-8') > curr_date:
        if (certRollOver(path)):  # to verify the cert file is exist
            return True
    elif crtexpirydate.decode('utf-8') == curr_date:
        if (certRollOver(path)):
            return True
    else:
        return False


# to validate the certificate (.cer) file
def validateCertificate(path, fpx_checkSum, data):

    return ''


# to verify signature
def verifySign_fpx(fpx_checkSum, data):

    return validateCertificate('./csrandkey/', fpx_checkSum, data)


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

    @action(methods=['GET'], detail=False)
    def fpx_get_bank_list(self, request, *args, **kwargs):

        fpx_msgToken = "01"
        fpx_msgType = "BE"
        fpx_sellerExId = config('FPX_EXCHANGE_ID')
        fpx_version = "7.0"

        # Generate signing string
        data = "|".join([fpx_msgToken, fpx_msgType,
                         fpx_sellerExId, fpx_version])

        # Reading key
        priv_key = open('./csrandkey/EX00012063.key')
        pkeyid = priv_key.read()
        priv_key.close()

        if pkeyid.startswith('-----BEGIN '):
            pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, pkeyid)
        else:
            pkey = crypto.load_pkcs12(pkeyid).get_privatekey()

        # Sign the key
        binary_signature = OpenSSL.crypto.sign(pkey, data, "sha1")

        # Transform the binary signature
        data_base16 = base64.b16encode(binary_signature)
        fpx_checkSum = data_base16.decode('utf-8')

        url = 'https://uat.mepsfpx.com.my/FPXMain/RetrieveBankList'

        fields = {
            'fpx_msgToken': fpx_msgToken,
            'fpx_msgType': fpx_msgType,
            'fpx_sellerExId': fpx_sellerExId,
            'fpx_checkSum': fpx_checkSum,
            'fpx_version': fpx_version,
        }

        r = requests.post(url, data=fields)

        response_value = {}
        for x in r.content.decode('utf-8').split('&'):
            explode = x.split('=')
            response_value[explode[0]] = unquote(explode[1])

        # Response Checksum Calculation String
        # data = "|".join([response_value['fpx_bankList'], response_value['fpx_msgToken'],
        #                  response_value['fpx_msgType'], response_value['fpx_sellerExId']])

        bank_list = {}
        token = response_value['fpx_bankList'].split(',')
        for x in token:
            explode = x.split('~')
            bank_list[explode[0]] = unquote(explode[1])

        return JsonResponse(bank_list)

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
            'fpx_buyerEmail': self.request.data['fpx_buyerEmail'],
            'fpx_checkSum': "",
            'fpx_buyerName': self.request.data['fpx_buyerName'],
            'fpx_buyerBankId': self.request.data['fpx_buyerBankId'],
            'fpx_buyerBankBranch': "",
            'fpx_buyerAccNo': "",
            'fpx_buyerId': "",
            'fpx_makerName': "",
            'fpx_buyerIban': "",
            'fpx_productDesc': "SampleProduct",
            'fpx_version': "7.0",
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

        fpx_checkSum = "|".join([data['fpx_buyerAccNo'], data['fpx_buyerBankBranch'], data['fpx_buyerBankId'], data['fpx_buyerEmail'], data['fpx_buyerIban'], data['fpx_buyerId'], data['fpx_buyerName'], data['fpx_makerName'], data['fpx_msgToken'], data['fpx_msgType'],
                                 data['fpx_productDesc'], data['fpx_sellerBankCode'], data['fpx_sellerExId'], data['fpx_sellerExOrderNo'], data['fpx_sellerId'], data['fpx_sellerOrderNo'], data['fpx_sellerTxnTime'], data['fpx_txnAmount'], data['fpx_txnCurrency'], data['fpx_version']])
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

        fpx_buyerBankBranch = request.POST.get(
            'fpx_buyerBankBranch', self.request.data['fpx_buyerBankBranch'])
        fpx_buyerBankId = request.POST.get(
            'fpx_buyerBankId', self.request.data['fpx_buyerBankId'])
        fpx_buyerIban = request.POST.get(
            'fpx_buyerIban', self.request.data['fpx_buyerIban'])
        fpx_buyerId = request.POST.get(
            'fpx_buyerId', self.request.data['fpx_buyerId'])
        fpx_buyerName = request.POST.get(
            'fpx_buyerName', self.request.data['fpx_buyerName'])
        fpx_creditAuthCode = request.POST.get(
            'fpx_creditAuthCode', self.request.data['fpx_creditAuthCode'])
        fpx_creditAuthNo = request.POST.get(
            'fpx_creditAuthNo', self.request.data['fpx_creditAuthNo'])
        fpx_debitAuthCode = request.POST.get(
            'fpx_debitAuthCode', self.request.data['fpx_debitAuthCode'])
        fpx_debitAuthNo = request.POST.get(
            'fpx_debitAuthNo', self.request.data['fpx_debitAuthNo'])
        fpx_fpxTxnId = request.POST.get(
            'fpx_fpxTxnId', self.request.data['fpx_fpxTxnId'])
        fpx_fpxTxnTime = request.POST.get(
            'fpx_fpxTxnTime', self.request.data['fpx_fpxTxnTime'])
        fpx_makerName = request.POST.get(
            'fpx_makerName', self.request.data['fpx_makerName'])
        fpx_msgToken = request.POST.get(
            'fpx_msgToken', self.request.data['fpx_msgToken'])
        fpx_msgType = request.POST.get(
            'fpx_msgType', self.request.data['fpx_msgType'])
        fpx_sellerExId = request.POST.get(
            'fpx_sellerExId', self.request.data['fpx_sellerExId'])
        fpx_sellerExOrderNo = request.POST.get(
            'fpx_sellerExOrderNo', self.request.data['fpx_sellerExOrderNo'])
        fpx_sellerId = request.POST.get(
            'fpx_sellerId', self.request.data['fpx_sellerId'])
        fpx_sellerOrderNo = request.POST.get(
            'fpx_sellerOrderNo', self.request.data['fpx_sellerOrderNo'])
        fpx_sellerTxnTime = request.POST.get(
            'fpx_sellerTxnTime', self.request.data['fpx_sellerTxnTime'])
        fpx_txnAmount = request.POST.get(
            'fpx_txnAmount', self.request.data['fpx_txnAmount'])
        fpx_txnCurrency = request.POST.get(
            'fpx_txnCurrency', self.request.data['fpx_txnCurrency'])
        fpx_checkSum = request.POST.get(
            'fpx_checkSum', self.request.data['fpx_checkSum'])

        data = "|".join([fpx_buyerBankBranch, fpx_buyerBankId, fpx_buyerIban, fpx_buyerId, fpx_buyerName, fpx_creditAuthCode, fpx_creditAuthNo, fpx_debitAuthCode, fpx_debitAuthNo, fpx_fpxTxnId,
                         fpx_fpxTxnTime, fpx_makerName, fpx_msgToken, fpx_msgType, fpx_sellerExId, fpx_sellerExOrderNo, fpx_sellerId, fpx_sellerOrderNo, fpx_sellerTxnTime, fpx_txnAmount, fpx_txnCurrency])

        # cert
        key_id = open('./csrandkey/EX00012063.cer')
        key_cert = key_id.read()
        key_id.close()

        cert = OpenSSL.crypto.load_certificate(crypto.FILETYPE_PEM, key_cert)

        # signature
        key_file = open('./csrandkey/EX00012063.key')
        key_signature = key_file.read()
        key_file.close()
        # print(key)

        if key_signature.startswith('-----BEGIN '):
            pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, key_signature)
        else:
            pkey = crypto.load_pkcs12(key_signature).get_privatekey()
        # print(pkey)

        signature = OpenSSL.crypto.sign(pkey, data, "sha1")

        print("Verify the SSL", OpenSSL.crypto.verify(
            cert, signature, data, 'sha1'))

        fpx_transaction = FpxTransaction.objects.filter(
            fpx_sellerOrderNo=fpx_sellerOrderNo).first()

        fpx_transaction.fpx_buyerBankBranch = fpx_buyerBankBranch
        fpx_transaction.fpx_buyerBankId = fpx_buyerBankId
        fpx_transaction.fpx_buyerIban = fpx_buyerIban
        fpx_transaction.fpx_buyerId = fpx_buyerId
        fpx_transaction.fpx_buyerName = fpx_buyerName
        fpx_transaction.fpx_creditAuthCode = fpx_creditAuthCode
        fpx_transaction.fpx_creditAuthNo = fpx_creditAuthNo
        fpx_transaction.fpx_debitAuthCode = fpx_debitAuthCode
        fpx_transaction.fpx_debitAuthNo = fpx_debitAuthNo
        fpx_transaction.fpx_fpxTxnId = fpx_fpxTxnId
        fpx_transaction.fpx_fpxTxnTime = fpx_fpxTxnTime
        fpx_transaction.fpx_makerName = fpx_makerName
        fpx_transaction.fpx_msgToken = fpx_msgToken
        fpx_transaction.fpx_msgType = fpx_msgType
        fpx_transaction.fpx_sellerExId = fpx_sellerExId
        fpx_transaction.fpx_sellerExOrderNo = fpx_sellerExOrderNo
        fpx_transaction.fpx_sellerId = fpx_sellerId
        fpx_transaction.fpx_sellerOrderNo = fpx_sellerOrderNo
        fpx_transaction.fpx_sellerTxnTime = fpx_sellerTxnTime
        fpx_transaction.fpx_txnAmount = fpx_txnAmount
        fpx_transaction.fpx_txnCurrency = fpx_txnCurrency
        fpx_transaction.fpx_checkSum = fpx_checkSum

        fpx_transaction.save()

        serializer = FpxTransactionSerializer(fpx_transaction)

        return JsonResponse(serializer.data)


class BankListViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = BankList.objects.all()
    serializer_class = BankListSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = BankList.objects.all()
        return queryset
