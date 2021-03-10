from .models import Voucher

from datetime import date, datetime

def check_voucher_valid():
    
    voucher = Voucher.objects.filter(validity_until__lt=date.today(), status='NU')
    
    if len(voucher) > 0:
        for v in voucher:
            v.status = 'EX'
            v.save()
            print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "voucher_id", v.id)