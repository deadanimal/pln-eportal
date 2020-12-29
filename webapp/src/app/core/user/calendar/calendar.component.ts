import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { CalendarsService } from "src/app/shared/services/calendars/calendars.service";
import { EducationalProgramsService } from "src/app/shared/services/educational-programs/educational-programs.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  // Calendar
  calendarOptions: CalendarOptions;

  // Data
  activitycancellations = [];
  checkboxArray = [];

  // Dropdown
  frequencies = [
    {
      value: "HM",
      display_name: "Hari Mingguan",
    },
    {
      value: "HB",
      display_name: "Hari Bulanan",
    },
    {
      value: "HT",
      display_name: "Hari Tahunan",
    },
    {
      value: "NA",
      display_name: "Tiada",
    },
  ];

  // FormGroup
  calendarFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private calendarService: CalendarsService,
    private eduprogramService: EducationalProgramsService,
    private showingService: ShowingsService
  ) {
    this.getData();
    this.getEduProgram();

    this.calendarFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      date_start: new FormControl(""),
      date_end: new FormControl(""),
      description_en: new FormControl(""),
      description_ms: new FormControl(""),
      status: new FormControl(false),
      frequency: new FormControl(""),
    });
  }

  initializeCalendar() {
    let arrayDate = [];
    for (let i = 0; i < this.tableRows.length; i++) {
      let obj = {
        id: this.tableRows[i].id,
        title: this.tableRows[i].description_ms,
        start: this.tableRows[i].date_start,
        end: this.tableRows[i].date_end,
        allDay: true,
      };
      arrayDate.push(obj);
    }

    this.calendarOptions = {
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      events: arrayDate,
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: "today",
      },
      height: 550,
      initialView: "dayGridMonth",
      plugins: [dayGridPlugin, interactionPlugin],
    };
  }

  getEduProgram() {
    this.eduprogramService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          let obj = {
            id: res[i].id,
            title: res[i].title_ms,
          };

          this.activitycancellations.push(obj);
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.getShowing();
      }
    );
  }

  getShowing() {
    this.showingService.get().subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          let obj = {
            id: res[i].id,
            title: res[i].title_ms,
          };

          this.activitycancellations.push(obj);
        }
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.arrayFormControl();
      }
    );
  }

  arrayFormControl() {
    if (this.activitycancellations.length > 0) {
      const arr = this.activitycancellations.map((element) => {
        return this.formBuilder.control(false);
      });

      this.calendarFormGroup.addControl(
        "activity_cancellation",
        this.formBuilder.array(arr)
      );
    }
  }

  handleDateClick(arg) {}

  handleEventClick(arg) {}

  ngOnInit() {}

  getData() {
    this.calendarService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.tableRows = res;
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      },
      (err) => {
        console.error("err", err);
      },
      () => {
        this.initializeCalendar();
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

  emptyFormGroup() {
    this.calendarFormGroup.patchValue({
      id: "",
      date_start: "",
      date_end: "",
      title: "",
      description_en: "",
      description_ms: "",
      activity_cancellation: "",
      status: false,
      frequency: "",
    });
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.calendarFormGroup.reset();
      // this.emptyFormGroup();
    } else if (process == "update") {
      this.calendarFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  checkboxChange(i: number, id: string) {
    if (this.calendarFormGroup.value.activity_cancellation[i] == true) {
      this.checkboxArray.push(this.activitycancellations[i].id);
    } else {
      for (let i = 0; i < this.checkboxArray.length; i++) {
        if (this.checkboxArray[i] == id) {
          this.checkboxArray.splice(i, 1);
          i--;
        }
      }
    }
  }

  create() {
    this.calendarFormGroup.value.activity_cancellation = this.checkboxArray;

    this.calendarService.post(this.calendarFormGroup.value).subscribe(
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
    this.calendarFormGroup.value.activity_cancellation = this.checkboxArray;

    this.calendarService
      .update(this.calendarFormGroup.value, this.calendarFormGroup.value.id)
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

  delete(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Ya",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.calendarService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
              });
            }
          );
        }
      });
  }
}
