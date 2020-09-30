import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { SimulatorRideTimesService } from "src/app/shared/services/simulator-ride-times/simulator-ride-times.service";
import { VenuesService } from "src/app/shared/services/venues/venues.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-simulator-ride-schedule",
  templateUrl: "./simulator-ride-schedule.component.html",
  styleUrls: ["./simulator-ride-schedule.component.scss"],
})
export class SimulatorRideScheduleComponent implements OnInit {
  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered",
  };

  // FormGroup
  simridetimeFormGroup: FormGroup;

  // Dropdown
  times = [
    {
      time: "10.00 AM",
    },
    {
      time: "11.00 AM",
    },
    {
      time: "12.00 PM",
    },
    {
      time: "01.00 PM",
    },
    {
      time: "02.00 PM",
    },
    {
      time: "03.00 PM",
    },
    {
      time: "04.00 PM",
    },
  ];
  days = [
    {
      value: "MON",
      display_name: "Isnin",
    },
    {
      value: "TUE",
      display_name: "Selasa",
    },
    {
      value: "WED",
      display_name: "Rabu",
    },
    {
      value: "THU",
      display_name: "Khamis",
    },
    {
      value: "FRI",
      display_name: "Jumaat",
    },
    {
      value: "SAT",
      display_name: "Sabtu",
    },
    {
      value: "SUN",
      display_name: "Ahad",
    },
  ];
  rounds = [
    {
      value: "P1",
      display_name: "Pusingan 1",
    },
    {
      value: "P2",
      display_name: "Pusingan 2",
    },
    {
      value: "P3",
      display_name: "Pusingan 3",
    },
    {
      value: "P4",
      display_name: "Pusingan 4",
    },
    {
      value: "P5",
      display_name: "Pusingan 5",
    },
  ];
  venues = [];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private simridetimeService: SimulatorRideTimesService,
    private venueService: VenuesService
  ) {
    this.getVenue();

    this.simridetimeFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      time: new FormControl(""),
      venue_id: new FormControl(""),
      day: new FormControl(""),
      round: new FormControl(""),
    });
  }

  getVenue() {
    this.venueService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.venues = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let fakeData = [
      {
        day: "Sabtu - Khamis",
        time: "10.00",
        start_time_1: "10.00 am",
        start_time_2: "10.10 am",
        start_time_3: "10.20 am",
        start_time_4: "10.30 am",
        start_time_5: "10.40 am",
      },
      {
        day: "Sabtu - Khamis",
        time: "11.00",
        start_time_1: "11.00 am",
        start_time_2: "11.10 am",
        start_time_3: "11.20 am",
        start_time_4: "11.30 am",
        start_time_5: "11.40 am",
      },
      {
        day: "Sabtu - Khamis",
        time: "12.00",
        start_time_1: "12.00 pm",
        start_time_2: "12.10 pm",
        start_time_3: "12.20 pm",
        start_time_4: "12.30 pm",
        start_time_5: "12.40 pm",
      },
      {
        day: "Sabtu - Khamis",
        time: "1.00",
        start_time_1: "REHAT / BREAK",
        start_time_2: "REHAT / BREAK",
        start_time_3: "REHAT / BREAK",
        start_time_4: "REHAT / BREAK",
        start_time_5: "REHAT / BREAK",
      },
      {
        day: "Sabtu - Khamis",
        time: "2.00",
        start_time_1: "2.00 pm",
        start_time_2: "2.10 pm",
        start_time_3: "2.20 pm",
        start_time_4: "2.30 pm",
        start_time_5: "2.40 pm",
      },
      {
        day: "Sabtu - Khamis",
        time: "3.00",
        start_time_1: "3.00 pm",
        start_time_2: "3.10 pm",
        start_time_3: "3.20 pm",
        start_time_4: "3.30 pm",
        start_time_5: "3.40 pm",
      },
      {
        day: "Sabtu - Khamis",
        time: "4.00",
        start_time_1: "4.00 pm",
        start_time_2: "4.10 pm",
        start_time_3: "4.20 pm",
        start_time_4: "4.30 pm",
        start_time_5: "4.40 pm",
      },
      {
        day: "JUMAAT",
        time: "10.00",
        start_time_1: "10.00 am",
        start_time_2: "10.10 am",
        start_time_3: "10.20 am",
        start_time_4: "10.30 am",
        start_time_5: "10.40 am",
      },
      {
        day: "JUMAAT",
        time: "11.00",
        start_time_1: "11.00 am",
        start_time_2: "11.10 am",
        start_time_3: "11.20 am",
        start_time_4: "11.30 am",
        start_time_5: "11.40 am",
      },
      {
        day: "JUMAAT",
        time: "12.00",
        start_time_1: "REHAT / BREAK",
        start_time_2: "REHAT / BREAK",
        start_time_3: "REHAT / BREAK",
        start_time_4: "REHAT / BREAK",
        start_time_5: "REHAT / BREAK",
      },
      {
        day: "JUMAAT",
        time: "1.00",
        start_time_1: "REHAT / BREAK",
        start_time_2: "REHAT / BREAK",
        start_time_3: "REHAT / BREAK",
        start_time_4: "REHAT / BREAK",
        start_time_5: "REHAT / BREAK",
      },
      {
        day: "JUMAAT",
        time: "10.00",
        start_time_1: "REHAT / BREAK",
        start_time_2: "REHAT / BREAK",
        start_time_3: "REHAT / BREAK",
        start_time_4: "REHAT / BREAK",
        start_time_5: "REHAT / BREAK",
      },
      {
        day: "JUMAAT",
        time: "3.00",
        start_time_1: "3.00 pm",
        start_time_2: "3.10 pm",
        start_time_3: "3.20 pm",
        start_time_4: "3.30 pm",
        start_time_5: "3.40 pm",
      },
      {
        day: "JUMAAT",
        time: "4.00",
        start_time_1: "4.00 pm",
        start_time_2: "4.10 pm",
        start_time_3: "4.20 pm",
        start_time_4: "4.30 pm",
        start_time_5: "4.40 pm",
      },
    ];

    this.tableRows = [...fakeData];
    this.tableTemp = this.tableRows.map((prop, key) => {
      return {
        ...prop,
        no: key,
      };
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
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

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.simridetimeFormGroup.reset();
    } else if (process == "update") {
      this.simridetimeFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    // this.modal.hide();
    swal
      .fire({
        title: "Berjaya",
        text: "Data anda berjaya disimpan.",
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
      })
      .then((result) => {
        if (result.value) {
          this.modal.hide();
        }
      });
  }

  create() {
    this.simridetimeService.post(this.simridetimeFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        swal
          .fire({
            title: "Berjaya",
            text: "Data anda berjaya disimpan.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
          })
          .then((result) => {
            if (result.value) {
              this.modal.hide();
              this.getData();
            }
          });
      },
      (err) => {
        console.error("err", err);
        swal
          .fire({
            title: "Ralat",
            text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
            type: "warning",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-warning",
          })
          .then((result) => {
            if (result.value) {
              // this.modal.hide();
            }
          });
      }
    );
  }

  update() {
    this.simridetimeService
      .update(
        this.simridetimeFormGroup.value,
        this.simridetimeFormGroup.value.id
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }
}
