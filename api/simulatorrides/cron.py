from .models import SimulatorRideBooking
from carts.models import Cart

from datetime import date, datetime

# to change status of the booking from SRB01 - Accepted and SRB02 - Pending Payment
# to SRB04 - Payment Rejected


def delete_booking_expired():

    simulator_ride_booking = SimulatorRideBooking.objects.filter(booking_date__lt=date.today(), status__in=[
                                                                 'SRB01', 'SRB02'])

    if len(simulator_ride_booking) > 0:
        for srb in simulator_ride_booking:
            print(srb)
            srb.delete()
            # srb.status = 'SRB04'
            # srb.save()

    cart = Cart.objects.all()

    if len(cart) > 0:
        for c in cart:
            simulator_ride = False
            show = False
            facility = False
            if (c.simulator_ride_booking_id.exists()):
                simulator_ride = True
            if (c.show_booking_id.exists()):
                show = True
            if (c.facility_booking_id.exists()):
                facility = True

            if (simulator_ride or show or facility):
                # print(c.id)
            else:
                c.delete()
