from django.shortcuts import render, redirect
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
import pytz
import requests
import time
import urllib
import uuid

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    FpxTransaction,
    BankList,
    ResponseCode
)

from invoicereceipts.models import (
    InvoiceReceipt
)

from carts.models import (
    Cart
)

from showings.models import (
    ShowBooking
)

from simulatorrides.models import (
    SimulatorRideBooking
)

from .serializers import (
    FpxTransactionSerializer,
    BankListSerializer,
    ResponseCodeSerializer
)

from invoicereceipts.serializers import (
    InvoiceReceiptSerializer,
    InvoiceReceiptExtendedSerializer
)

from carts.serializers import (
    CartSerializer
)

from showings.serializers import (
    ShowBookingSerializer
)

from simulatorrides.serializers import (
    SimulatorRideBookingSerializer
)

from invoicereceipts.views import receipt_created


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

# to update the cart status to CM - completed
# to update the showing booking either SB05 - Payment Accepted OR SB06 - Payment Rejected
# to update the simulator-ride booking either SRB03 - Payment Accepted OR SRB04 - Payment Rejected
def update_cart_status(fpx_transaction_id, show_booking_status, simulator_ride_booking_status):

    invoice_receipt = InvoiceReceipt.objects.filter(
        fpx_transaction_id=fpx_transaction_id).first()

    serializer_class_ir = InvoiceReceiptSerializer(invoice_receipt)

    if serializer_class_ir:
        for cart_id in serializer_class_ir.data['cart_id']:

            cart = Cart.objects.filter(id=cart_id).first()
            serializer_class_c = CartSerializer(cart)

            if cart:
                # to update the status of simulator_ride_booking to SRB03 - Payment Accepted
                if len(serializer_class_c.data['simulator_ride_booking_id']) > 0:

                    for simulator_ride_booking_id in serializer_class_c.data['simulator_ride_booking_id']:

                        simulator_ride_booking = SimulatorRideBooking.objects.filter(
                            id=simulator_ride_booking_id).first()
                        simulator_ride_booking.status = simulator_ride_booking_status
                        simulator_ride_booking.save()

                # to update the status of showing_booking to SB05 - Payment Accepted
                if len(serializer_class_c.data['show_booking_id']) > 0:

                    for show_booking_id in serializer_class_c.data['show_booking_id']:

                        show_booking = ShowBooking.objects.filter(
                            id=show_booking_id).first()
                        show_booking.status = show_booking_status
                        show_booking.save()

                cart.cart_status = 'CM'
                cart.save()


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

        print('FPX DIRECT AC')
        print('request.POST.get', request.POST.get)
        print('self.request.data', self.request.data)

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

        print('fpx_sellerOrderNo', fpx_sellerOrderNo)

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

    @action(methods=['POST'], detail=False)
    def fpx_indirect_ac(self, request, *args, **kwargs):

        print('FPX INDIRECT AC')
        print('request.POST.get', request.POST.get)
        print('self.request.data', self.request.data)

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

        print('fpx_sellerOrderNo', fpx_sellerOrderNo)

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

        invoice_receipt = InvoiceReceipt.objects.filter(
            fpx_transaction_id=fpx_transaction.id).first()

        if invoice_receipt:
            timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
            if fpx_transaction.fpx_debitAuthCode == '00':
                invoice_receipt.status = 'PS'
                invoice_receipt.payment_successful_datetime = datetime.datetime.now(
                    timezone_).strftime("%Y-%m-%d %H:%M:%S")
                update_cart_status(fpx_transaction.id, 'SB05', 'SRB03')
                receipt_created(invoice_receipt.id)
            else:
                invoice_receipt.status = 'PR'
                invoice_receipt.payment_rejected_datetime = datetime.datetime.now(
                    timezone_).strftime("%Y-%m-%d %H:%M:%S")
                update_cart_status(fpx_transaction.id, 'SB06', 'SRB04')

            invoice_receipt.save()

        # serializer_class = InvoiceReceiptExtendedSerializer(invoice_receipt)
        url = 'https://portal.planetarium.prototype.com.my/#/receipt?receiptId=' + \
            str(invoice_receipt.id)

        # return Response(serializer_class.data)
        return redirect(url)


class BankListViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = BankList.objects.all()
    serializer_class = BankListSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'bank_id', 'bank_name',
                        'bank_display_name', 'bank_active', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = BankList.objects.all()
        return queryset


class ResponseCodeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ResponseCode.objects.all()
    serializer_class = ResponseCodeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['id', 'response_code',
                        'description', 'status', 'created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = ResponseCode.objects.all()
        return queryset
