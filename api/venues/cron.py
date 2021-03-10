from .models import FacilityBooking
from carts.models import Cart

from datetime import date, datetime

# to change status of the booking from FB01 - In Progress to FB03 - Rejected
# to change status of the booking from FB04 - Pending Payment to FB06 - Payment Rejected


def delete_booking_expired():

    facility_booking_inprogress = FacilityBooking.objects.filter(
        booking_date__lt=date.today(), status='FB01')
    facility_booking_pendingpayment = FacilityBooking.objects.filter(
        booking_date__lt=date.today(), status='FB04')

    if len(facility_booking_inprogress) > 0:
        for fb in facility_booking_inprogress:
            print(fb)
            fb.delete()
            # fb.status = 'FB03'
            # fb.save()

    if len(facility_booking_pendingpayment) > 0:
        for fb in facility_booking_pendingpayment:
            print(fb)
            fb.delete()
            # fb.status = 'FB06'
            # fb.save()

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
