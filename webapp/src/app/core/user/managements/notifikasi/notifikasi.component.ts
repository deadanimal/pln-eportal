import { Component, OnInit } from '@angular/core';
import { NotificationService } from "src/app/shared/services/notification/notification.service";
import { Notification } from "src/app/shared/services/notification/notfication.model";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.component.html',
  styleUrls: ['./notifikasi.component.scss']
})
export class NotifikasiComponent implements OnInit {

   // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];

  // Notification
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        try { 
          if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      catch (err) {}
      }
      return false;
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  getData() {

    if (this.tableRows.length > 0) this.tableRows = [];
    this.notificationService.get().pipe(map(x => x.filter(i => i.user == null))).subscribe((res)  => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }



}
