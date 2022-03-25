from .models import ShowBooking, Showtime
from carts.models import Cart
from datetime import date, datetime
import time

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
                print(c.id)
            else:
                c.delete()


def auto_change_status():
    print("initiate cron show")
    shows = Showtime.objects.filter(show_time_status='Ada')
    if len(shows) > 0:
        for i in shows:
            currentTime = int(time.time())

            ticketTime_str = f"{i.show_date} {i.show_time}"
            ticketTime_dt = datetime.strptime(ticketTime_str, '%Y-%m-%d %H:%M:%S')
            ticketTime = int(datetime.timestamp(ticketTime_dt)) - 10*60

            print("ctime", currentTime)
            print("ticketTime", ticketTime)

            if currentTime >= ticketTime:
                i.show_time_status = "Bakal Ditayang"
                i.save()
                print("sedang ditayang id", i)


    shows = Showtime.objects.filter(show_time_status='Ada')
    if len(shows) > 0:
        for i in shows:
            currentTime = int(time.time())

            ticketTime_str = f"{i.show_date} {i.show_time}"
            ticketTime_dt = datetime.strptime(ticketTime_str, '%Y-%m-%d %H:%M:%S')
            ticketTime = int(datetime.timestamp(ticketTime_dt))

            print("ctime", currentTime)
            print("ticketTime", ticketTime)

            if currentTime >= ticketTime:
                i.show_time_status = "Sedang Ditayang"
                i.save()
                print("sedang ditayang id", i)

    showings = Showtime.objects.filter(show_time_status='Sedang Ditayang')
    if len(showings) > 0:
        for i in showings:
            currentTime = int(time.time())
            ticketTime_str = f"{i.show_date} {i.show_time}"
            ticketTime_dt = datetime.strptime(ticketTime_str, '%Y-%m-%d %H:%M:%S')
            ticketTime = int(datetime.timestamp(ticketTime_dt))

            showing_duration = i.showing_id.duration_minutes * 60 + ticketTime

            if currentTime > showing_duration: 
                i.show_time_status = "Tamat"
                i.save()
                print("telah ditayang id", i)
     
    
