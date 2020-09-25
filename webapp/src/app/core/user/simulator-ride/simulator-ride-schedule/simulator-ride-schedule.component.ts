import { Component, OnInit, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import swal from 'sweetalert2';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox'
}

@Component({
  selector: 'app-simulator-ride-schedule',
  templateUrl: './simulator-ride-schedule.component.html',
  styleUrls: ['./simulator-ride-schedule.component.scss']
})
export class SimulatorRideScheduleComponent implements OnInit {

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = []
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered"
  };

  constructor(
    private zone: NgZone,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    // this.getCharts()
    this.getData()
  }

  ngOnDestroy() {
  }

  getData() {
    let fakeData = [
      { 'day': 'Sabtu - Khamis', 'time': '10.00', 'start_time_1': '10.00 am', 'start_time_2': '10.10 am', 'start_time_3': '10.20 am', 'start_time_4': '10.30 am', 'start_time_5': '10.40 am' },
      { 'day': 'Sabtu - Khamis', 'time': '11.00', 'start_time_1': '11.00 am', 'start_time_2': '11.10 am', 'start_time_3': '11.20 am', 'start_time_4': '11.30 am', 'start_time_5': '11.40 am' },
      { 'day': 'Sabtu - Khamis', 'time': '12.00', 'start_time_1': '12.00 pm', 'start_time_2': '12.10 pm', 'start_time_3': '12.20 pm', 'start_time_4': '12.30 pm', 'start_time_5': '12.40 pm' },
      { 'day': 'Sabtu - Khamis', 'time': '1.00', 'start_time_1': 'REHAT / BREAK', 'start_time_2': 'REHAT / BREAK', 'start_time_3': 'REHAT / BREAK', 'start_time_4': 'REHAT / BREAK', 'start_time_5': 'REHAT / BREAK' },
      { 'day': 'Sabtu - Khamis', 'time': '2.00', 'start_time_1': '2.00 pm', 'start_time_2': '2.10 pm', 'start_time_3': '2.20 pm', 'start_time_4': '2.30 pm', 'start_time_5': '2.40 pm' },
      { 'day': 'Sabtu - Khamis', 'time': '3.00', 'start_time_1': '3.00 pm', 'start_time_2': '3.10 pm', 'start_time_3': '3.20 pm', 'start_time_4': '3.30 pm', 'start_time_5': '3.40 pm' },
      { 'day': 'Sabtu - Khamis', 'time': '4.00', 'start_time_1': '4.00 pm', 'start_time_2': '4.10 pm', 'start_time_3': '4.20 pm', 'start_time_4': '4.30 pm', 'start_time_5': '4.40 pm' },
      { 'day': 'JUMAAT', 'time': '10.00', 'start_time_1': '10.00 am', 'start_time_2': '10.10 am', 'start_time_3': '10.20 am', 'start_time_4': '10.30 am', 'start_time_5': '10.40 am' },
      { 'day': 'JUMAAT', 'time': '11.00', 'start_time_1': '11.00 am', 'start_time_2': '11.10 am', 'start_time_3': '11.20 am', 'start_time_4': '11.30 am', 'start_time_5': '11.40 am' },
      { 'day': 'JUMAAT', 'time': '12.00', 'start_time_1': 'REHAT / BREAK', 'start_time_2': 'REHAT / BREAK', 'start_time_3': 'REHAT / BREAK', 'start_time_4': 'REHAT / BREAK', 'start_time_5': 'REHAT / BREAK' },
      { 'day': 'JUMAAT', 'time': '1.00', 'start_time_1': 'REHAT / BREAK', 'start_time_2': 'REHAT / BREAK', 'start_time_3': 'REHAT / BREAK', 'start_time_4': 'REHAT / BREAK', 'start_time_5': 'REHAT / BREAK' },
      { 'day': 'JUMAAT', 'time': '10.00', 'start_time_1': 'REHAT / BREAK', 'start_time_2': 'REHAT / BREAK', 'start_time_3': 'REHAT / BREAK', 'start_time_4': 'REHAT / BREAK', 'start_time_5': 'REHAT / BREAK' },
      { 'day': 'JUMAAT', 'time': '3.00', 'start_time_1': '3.00 pm', 'start_time_2': '3.10 pm', 'start_time_3': '3.20 pm', 'start_time_4': '3.30 pm', 'start_time_5': '3.40 pm' },
      { 'day': 'JUMAAT', 'time': '4.00', 'start_time_1': '4.00 pm', 'start_time_2': '4.10 pm', 'start_time_3': '4.20 pm', 'start_time_4': '4.30 pm', 'start_time_5': '4.40 pm' },
    ]

    this.tableRows = [...fakeData]
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      }
    );
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (d[key].toLowerCase().indexOf(val) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
    // this.registerForm.reset()
  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure to create this new user?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-info",
      confirmButtonText: "Simpan",
      showCancelButton: true,
      cancelButtonClass: "btn btn-outline-info",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.value) {
        // this.register()
      }
    })
  }

}
