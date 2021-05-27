from django.shortcuts import render
from django.db.models import Q
from django.forms.models import model_to_dict

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Cart
)

from .serializers import (
    CartSerializer,
    CartExtendedSerializer
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


class CartViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = ['user', 'cart_status', 'show_booking_id',
                        'simulator_ride_booking_id', 'facility_booking_id']

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Cart.objects.all()
        return queryset

    @action(methods=['GET'], detail=False)
    def extended(self, request, *args, **kwargs):

        queryset = Cart.objects.all()
        id = request.query_params.get('id', None)
        cart_status = request.query_params.get('cart_status', None)
        user = request.query_params.get('user', None)

        if id is not None:
            queryset = queryset.filter(id=id)
        if cart_status is not None:
            queryset = queryset.filter(cart_status=cart_status)
        if user is not None:
            queryset = queryset.filter(user=user)

        serializer_class = CartExtendedSerializer(queryset, many=True)

        return Response(serializer_class.data)

    @action(methods=['POST'], detail=False)
    def bulk_delete_by_user(self, request):

        cart = Cart.objects.filter(user=request.data['user'], cart_status='CR')#.delete()

        if len(cart) > 0:
            for cart in cart:

                for show_booking in cart.show_booking_id.all():
                    cart.show_booking_id.remove(show_booking)
                    ShowBooking.objects.get(id=model_to_dict(show_booking)['id']).delete()

                for simulator_ride_booking in cart.simulator_ride_booking_id.all():
                    cart.simulator_ride_booking_id.remove(simulator_ride_booking)
                    SimulatorRideBooking.objects.get(id=model_to_dict(simulator_ride_booking)['id']).delete()

                for facility_booking in cart.facility_booking_id.all():
                    cart.facility_booking_id.remove(facility_booking)
                    FacilityBooking.objects.get(id=model_to_dict(facility_booking)['id']).delete()

        cart = Cart.objects.filter(user=request.data['user'], cart_status='CR').delete()

        return Response(status=status.HTTP_200_OK)
