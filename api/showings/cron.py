from .models import ShowBooking
from carts.models import Cart

from datetime import date, datetime

# to change status of the booking from SB01 - In Progress to SB03 - Rejected
# to change status of the booking from SB04 - Pending Payment to SB06 - Payment Rejected


def delete_booking_expired():

    show_booking_inprogress = ShowBooking.objects.filter(
        showtime_id__show_date__lt=date.today(), status='SB01')
    show_booking_pendingpayment = ShowBooking.objects.filter(
        showtime_id__show_date__lt=date.today(), status='SB04')

    if len(show_booking_inprogress) > 0:
        for sb in show_booking_inprogress:
            print(sb)
            sb.delete()
            # sb.status = 'SB03'
            # sb.save()

    if len(show_booking_pendingpayment) > 0:
        for sb in show_booking_pendingpayment:
            print(sb)
            sb.delete()
            # sb.status = 'SB06'
            # sb.save()

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
