from .models import SimulatorRideBooking
from carts.models import Cart

from datetime import date, datetime, pytz

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
                print(c.id)
            else:
                c.delete()

def auto_change_status(simulator_Ride_times):
    days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
    current_weekday = datetime.now(timezone_).weekday()
    queryset = SimulatorRideTime.objects.filter(day=days[current_weekday]).order_by('time', 'round')
    for data in queryset:
        change_status_on_booking_change(data)
        change_status_on_time_change(data)
        

def change_status_on_booking_change(data):
    queryset_booking = SimulatorRideBooking.objects.filter(simulator_ride_time_id=data.id, booking_date=datetime.today().strftime('%Y-%m-%d')).count()
    if queryset_booking == 2:
        simulator_ride = SimulatorRideTime.objects.get(id=data.id)
        simulator_ride.status == "Penuh"
        simulator_ride.save()

def change_status_on_time_change(data):
    current_time = datetime.now(timezone_)
    slot_time = datetime.now(timezone_).replace(hour=int(data.time[0:1]), minute=int(data.time[3:4])) 
    time_elapsed = current_time - slot_time
    time_elapsed_second = datetime.timstamp(time_elapsed)
    if time_elapsed_second >= 10*60:
        simulator_ride = SimulatorRideTime.objects.get(id=data.id)
        simulator_ride.status == "Tamat"
        simulator_ride.save()



    
    

    





        

        






   
