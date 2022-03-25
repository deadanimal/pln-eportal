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
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
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
    ignoreBackdropClick: true,
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
        start: this.tableRows[i].date_start + " 00:00",
        end: this.tableRows[i].date_end + " 23:59",
        // allDay: true,
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
        // console.log("res", res);
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

  getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(
      ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
    );
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }

  getDateWeek(date: string, week: number) {
    return new Date(date).setDate(new Date(date).getDate() + 7 * week);
  }

  create() {
    this.calendarFormGroup.value.activity_cancellation = this.checkboxArray;

    // to make logic of frequncy (kekerapan) based on user's pick
    // HM - Hari Mingguan
    // HB - Hari Bulanan
    // HT - Hari Tahunan
    // NA - Tiada

    var new_date_start = this.calendarFormGroup.value.date_start;
    var new_date_end = this.calendarFormGroup.value.date_end;
    let new_description_en = this.calendarFormGroup.value.description_en;
    let new_description_ms = this.calendarFormGroup.value.description_ms;
    let new_status = this.calendarFormGroup.value.status;
    let new_frequency = this.calendarFormGroup.value.frequency;
    let new_activity_cancellation = this.calendarFormGroup.value
      .activity_cancellation;

    let postArray = [];
    if (new_frequency == "HM") {
      // loop until all weeks in 1 year
      let yearWeek = this.getWeekNumber(new Date());

      // they have 52 + 1 day in a year
      // they have 52 + 2 days in a loop year
      for (let i = 0; i < 53 - yearWeek[1]; i++) {
        var date_start_convert = new Date(this.getDateWeek(new_date_start, i));
        var date_start_format =
          date_start_convert.getFullYear() +
          "-" +
          (date_start_convert.getMonth() + 1 < 10
            ? "0" + (date_start_convert.getMonth() + 1)
            : date_start_convert.getMonth() + 1) +
          "-" +
          (date_start_convert.getDate() < 10
            ? "0" + date_start_convert.getDate()
            : date_start_convert.getDate());

        var date_end_convert = new Date(this.getDateWeek(new_date_end, i));
        var date_end_format =
          date_end_convert.getFullYear() +
          "-" +
          (date_end_convert.getMonth() + 1 < 10
            ? "0" + (date_end_convert.getMonth() + 1)
            : date_end_convert.getMonth() + 1) +
          "-" +
          (date_end_convert.getDate() < 10
            ? "0" + date_end_convert.getDate()
            : date_end_convert.getDate());

        let obj = {
          date_start: date_start_format,
          date_end: date_end_format,
          description_en: new_description_en,
          description_ms: new_description_ms,
          status: new_status,
          frequency: new_frequency,
          activity_cancellation: new_activity_cancellation,
        };
        postArray.push(obj);
      }
    } else if (new_frequency == "HB") {
      // loop until 12 month in 1 year
      for (let i = 0; i < 12; i++) {
        var date_start_set = new Date(new_date_start).setMonth(i);
        var date_start_convert = new Date(date_start_set);
        var date_start_format =
          date_start_convert.getFullYear() +
          "-" +
          (date_start_convert.getMonth() + 1 < 10
            ? "0" + (date_start_convert.getMonth() + 1)
            : date_start_convert.getMonth() + 1) +
          "-" +
          (date_start_convert.getDate() < 10
            ? "0" + date_start_convert.getDate()
            : date_start_convert.getDate());

        var date_end_set = new Date(new_date_end).setMonth(i);
        var date_end_convert = new Date(date_end_set);
        var date_end_format =
          date_end_convert.getFullYear() +
          "-" +
          (date_end_convert.getMonth() + 1 < 10
            ? "0" + (date_end_convert.getMonth() + 1)
            : date_end_convert.getMonth() + 1) +
          "-" +
          (date_end_convert.getDate() < 10
            ? "0" + date_end_convert.getDate()
            : date_end_convert.getDate());

        let obj = {
          date_start: date_start_format,
          date_end: date_end_format,
          description_en: new_description_en,
          description_ms: new_description_ms,
          status: new_status,
          frequency: new_frequency,
          activity_cancellation: new_activity_cancellation,
        };
        postArray.push(obj);
      }
    } else if (new_frequency == "HT") {
      // loop until 5 years onward
      for (let i = 0; i < 5; i++) {
        let obj = {
          date_start:
            +new_date_start.substr(0, 4) +
            i +
            new_date_start.substr(4, new_date_start.length),
          date_end:
            +new_date_end.substr(0, 4) +
            i +
            new_date_end.substr(4, new_date_end.length),
          description_en: new_description_en,
          description_ms: new_description_ms,
          status: new_status,
          frequency: new_frequency,
          activity_cancellation: new_activity_cancellation,
        };
        postArray.push(obj);
      }
    } else if (new_frequency == "NA") {
      let obj = {
        date_start: new_date_start,
        date_end: new_date_end,
        description_en: new_description_en,
        description_ms: new_description_ms,
        status: new_status,
        frequency: new_frequency,
        activity_cancellation: new_activity_cancellation,
      };
      postArray.push(obj);
    }

    postArray.forEach((obj) => {
      this.calendarService.post(obj).subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya disimpan.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
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
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
    });
  }

  update() {
    this.calendarFormGroup.value.activity_cancellation = this.checkboxArray;

    this.calendarService
      .update(this.calendarFormGroup.value, this.calendarFormGroup.value.id)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
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
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
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
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.calendarService.delete(row.id).subscribe(
            (res) => {
              // console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                icon: "warning",
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-warning",
                },
              });
            }
          );
        }
      });
  }
}
