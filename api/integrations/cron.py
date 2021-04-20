import json
from .models import HeadCounter


def empty_head_counter_json():

    with open("integrations/head_counter_json.txt", mode="r", encoding="utf-8") as myfile:
        mylist = myfile.read().splitlines()
        total_in = 0
        total_out = 0
        for line in mylist:
            json_line = json.loads(line.replace("\'", "\""))
            count_in = json_line['Data'][0]['CountingInfo'][0]['In']
            count_out = json_line['Data'][0]['CountingInfo'][0]['Out']
            total_in = total_in + count_in
            total_out = total_out + count_out
            utc_datetime = json_line['Source']['UtcTime']
            str_date = utc_datetime[0:10]

        headcounter = HeadCounter(
            total_in=total_in, total_out=total_out, total_stay=total_in-total_out, date=str_date)
        headcounter.save()

        myfile.close()

    open('integrations/head_counter_json.txt', 'w').close()
