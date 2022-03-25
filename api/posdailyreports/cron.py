from .models import PosDailyReport
from datetime import date, datetime

def auto_close_counter():
    reports = PosDailyReport.objects.filter(status="OP")
    if len(reports) > 0:
        for r in reports:
            r.status = 'CL'
            r.save()

        print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "report_id", r.id)


