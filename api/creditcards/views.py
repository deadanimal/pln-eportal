from django.shortcuts import render, redirect
from django.db.models import Q
from django.http import JsonResponse

import datetime
import json
import pycurl
import pytz
import random
import requests
import string
import urllib

from decouple import config
from io import BytesIO, StringIO
from requests.auth import HTTPBasicAuth

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    CreditCard
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

from venues.models import (
    FacilityBooking
)

from .serializers import (
    CreditCardSerializer
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

from venues.serializers import (
    FacilityBookingSerializer
)

"""
To solve issue
ImportError: pycurl: libcurl link-time ssl backends (secure-transport, openssl) do not include compile-time ssl backend (none/other)
Visit 
1. https://cscheng.info/2018/01/26/installing-pycurl-on-macos-high-sierra.html
2. https://github.com/transloadit/python-sdk/issues/4
"""

"""
This function is used to store the configuration for the example set.

For merchants with a single account/profile, you can statically set your configuration below.

If using certificate validation, modify the following configuration settings
"""


def merchant_configuration():

    configArray = {}

    # alternate trusted certificate file
    # leave as "" if you do not have a certificate path
    # configArray["certificatePath"] = "C:/ca-cert-bundle.crt";

    # possible values:
    # FALSE = disable verification
    # TRUE = enable verification
    configArray["certificateVerifyPeer"] = True

    # possible values:
    # 0 = do not check/verify hostname
    # 1 = check for existence of hostname in certificate
    # 2 = verify request hostname matches certificate hostname
    configArray["certificateVerifyHost"] = 2

    # Base URL of the Payment Gateway. Do not include the version.
    # https://ap-gateway.mastercard.com/api/rest/version/60/merchant/{merchantId}/order/{orderid}/transaction/{transactionid}
    configArray["gatewayUrl"] = "https://ap-gateway.mastercard.com/api/rest"

    # Merchant ID supplied by your payments provider
    configArray["merchantId"] = config('MPGS_MERCHANT_ID')

    # API username in the format below where Merchant ID is the same as above
    configArray["apiUsername"] = "merchant." + config('MPGS_MERCHANT_ID')

    # API password which can be configured in Merchant Administration
    configArray["password"] = config('MBPG_PASSWORD')

    # The debug setting controls displaying the raw content of the request and
    # response for a transaction.
    # In production you should ensure this is set to FALSE as to not display/use
    # this debugging information
    configArray["debug"] = True

    # Version number of the API being used for your integration
    # this is the default value if it isn't being specified in process.php
    configArray["version"] = "60"

    return configArray


def send_transaction(merchantObj, request, method):
    
    print('merchantObj', merchantObj)
    print('request', request)
    print('method', method)
    
    """
    Python Requests Method
    
    headers = {'Content-Length': len(request), 'Content-Type': 'Application/json;charset=UTF-8'}
    auth = HTTPBasicAuth(merchantObj['apiUsername'], merchantObj['password'])
    verify = merchantObj['certificateVerifyPeer']
    
    if method == 'GET':
        response = requests.get(merchantObj['gatewayUrl'], auth=auth, verify=verify)
    elif method == 'POST':
        if merchantObj['certificatePath'] != '':
            pass    
        
        response = requests.post(merchantObj['gatewayUrl'], data=request, headers=headers, auth=auth, verify=verify)
    elif method == 'PUT':
        response = requests.put(merchantObj['gatewayUrl'], data=request, headers=headers, auth=auth, verify=verify)
        
    pass
    """
    
    # Python PycURL Method
    # contents = StringIO()
    contents = BytesIO()
    mycurl = pycurl.Curl()
    
    if 'certificatePath' in merchantObj:
        mycurl.setopt(mycurl.CAINFO, merchantObj['certificatePath'])
    
    mycurl.setopt(mycurl.SSL_VERIFYHOST, merchantObj['certificateVerifyHost'])
    mycurl.setopt(mycurl.SSL_VERIFYPEER, merchantObj['certificateVerifyPeer'])
    
    dataupdate = urllib.parse.urlencode(request)
    print('dataupdate', dataupdate)
    
    # Create order id
    order = ''.join(random.choice(string.ascii_letters) for i in range(40))
    
    # Create transaction id
    transaction = ''.join(random.choice(string.ascii_letters) for i in range(40))
    
    url = (merchantObj['gatewayUrl'] +
           '/version/' + merchantObj['version'] +
           '/merchant/' + merchantObj['merchantId'] +
           '/order/' + order +
           '/transaction/' + transaction)
    print('url', url)
    
    if method == 'GET':
        mycurl.setopt(mycurl.URL, url)
    elif method == 'POST':
        # Option: Active HTTP Post
        mycurl.setopt(mycurl.POST, 1)
        
        # Option: Set HTTP Parameters
        mycurl.setopt(mycurl.POSTFIELDS, dataupdate)
        
        # Option: Set HTTP Headers
        mycurl.setopt(pycurl.HTTPHEADER, ['Content-Length: ' + str(len(request)), 'Content-Type: Application/json;charset=UTF-8'])
    elif method == 'PUT':
        # Option: Active HTTP Post
        mycurl.setopt(mycurl.CUSTOMREQUEST, 'PUT')
        
        # Option: Set HTTP Parameters
        mycurl.setopt(mycurl.POSTFIELDS, dataupdate)
        
        # Option: Set HTTP Headers
        mycurl.setopt(pycurl.HTTPHEADER, ['Content-Length: ' + str(len(request)), 'Content-Type: Application/json;charset=UTF-8'])
    
    # Option: Url to call
    mycurl.setopt(mycurl.URL, url)
    
    # Option: Do not display the result but store it in a variable
    # mycurl.setopt(mycurl.RETURNTRANSFER, 1)
    
    mycurl.setopt(mycurl.WRITEFUNCTION, contents.write)
    # mycurl.setopt(mycurl.WRITEDATA, contents)
    
    # Option: Set HTTPS Login And password
    mycurl.setopt(mycurl.USERPWD, merchantObj['apiUsername']+':'+merchantObj['password'])
    
    # Launch Curl Request
    # mycurl.perform()
    
    print("contents.getvalue():")
    print(contents.getvalue())
    print("mycurl.getinfo(pycurl.HTTP_CODE):")
    print(mycurl.getinfo(pycurl.HTTP_CODE))
    print("mycurl.getinfo(pycurl.EFFECTIVE_URL):")
    print(mycurl.getinfo(pycurl.EFFECTIVE_URL))
    mycurl.close()
     
    # print('response: ', response)
    # return response


class CreditCardViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['created_date']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = CreditCard.objects.all()
        return queryset

    @action(methods=['POST'], detail=False)
    def simple_pay_operation(self, request, *args, **kwargs):

        data = json.loads(request.body)

        request = {
            "apiOperation": "PAY",
            "sourceOfFunds": {
                "type": "CARD",
                "provided": {
                    "card": {
                        "number": data['card_number'],
                        "expiry": {
                            "month": data['expiry_month'],
                            "year": data['expiry_year']
                        },
                        "securityCode": data['security_code']
                    }
                }
            },
            "order": {
                "amount": data['transaction_amount'],
                "currency": data['currency']
            }
        }

        configArray = merchant_configuration()
        
        # response = send_transaction(configArray, request, 'PUT')
        send_transaction(configArray, request, 'PUT')

        return JsonResponse(data)
