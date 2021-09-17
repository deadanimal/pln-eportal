import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";
import swal from "sweetalert2";

import { DailyOperatingReportsService } from "src/app/shared/services/daily-operating-reports/daily-operating-reports.service";
import { EmployeeDirectoriesService } from "src/app/shared/services/employee-directories/employee-directories.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-daily-operatings",
  templateUrl: "./daily-operatings.component.html",
  styleUrls: ["./daily-operatings.component.scss"],
})
export class DailyOperatingsComponent implements OnInit {
  // Data
  generateReportURL =
    environment.baseUrl +
    "v1/daily-operating-reports/generate_daily_operating_report/?id=";
  technicalofficers = [];
  ticketcounterclerks = [];

  // Dropdown
  employeedirectories = [];
  users = [];

  // FormGroup
  contractorFormGroup: FormGroup;
  dailyoperatingreportFormGroup: FormGroup;
  detailreportFormGroup: FormGroup;
  operatingscheduleFormGroup: FormGroup;
  visitorsummaryFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog modal-lg",
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
    private dailyoperatingreportService: DailyOperatingReportsService,
    private employeedirectoryService: EmployeeDirectoriesService,
    private userService: UsersService
  ) {
    this.getEmployeeDirectory();
    this.getUser();

    this.dailyoperatingreportFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      report_date: new FormControl(""),
      report_by: new FormControl(""),
      report_by_position: new FormControl(""),
      operations_manager: new FormControl(""),
      technical_officer: new FormControl(""),
      ticket_counter_clerk: new FormControl(""),
      stage_officer: new FormControl(""),
      info_counter_clerk: new FormControl(""),
      librarian: new FormControl(""),
    });
  }

  getEmployeeDirectory() {
    this.employeedirectoryService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.employeedirectories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getUser() {
    this.userService.extended("").subscribe(
      (res) => {
        // console.log("res", res);
        this.users = res.filter((item) => item.role.code != "CS");
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
    this.dailyoperatingreportService.extended("").subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
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
      this.dailyoperatingreportFormGroup.reset();
    } else if (process == "update") {
      this.dailyoperatingreportFormGroup.patchValue({
        ...row,
        report_by: row.report_by ? row.report_by.id : "",
      });

      // empty first the arrays
      this.technicalofficers = [];
      this.ticketcounterclerks = [];

      // push the value into arrays
      row.technical_officer.forEach((value) => {
        this.technicalofficers.push({ value: value });
      });

      row.ticket_counter_clerk.forEach((value) => {
        this.ticketcounterclerks.push({ value: value });
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  addInput(input_name: string) {
    if (input_name == "technicalofficers")
      this.technicalofficers.push({ value: "" });
    if (input_name == "ticketcounterclerks")
      this.ticketcounterclerks.push({ value: "" });
  }

  removeInput(input_name: string, index) {
    if (input_name == "technicalofficers")
      this.technicalofficers.splice(index, 1);
    if (input_name == "ticketcounterclerks")
      this.ticketcounterclerks.splice(index, 1);
  }

  create() {
    this.dailyoperatingreportFormGroup.value.technical_officer = this.technicalofficers.map(
      (item) => item["value"]
    );
    this.dailyoperatingreportFormGroup.value.ticket_counter_clerk = this.ticketcounterclerks.map(
      (item) => item["value"]
    );

    this.dailyoperatingreportService
      .post(this.dailyoperatingreportFormGroup.value)
      .subscribe(
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
  }

  update() {
    this.dailyoperatingreportFormGroup.value.technical_officer = this.technicalofficers.map(
      (item) => item["value"]
    );
    this.dailyoperatingreportFormGroup.value.ticket_counter_clerk = this.ticketcounterclerks.map(
      (item) => item["value"]
    );

    this.dailyoperatingreportService
      .update(
        this.dailyoperatingreportFormGroup.value,
        this.dailyoperatingreportFormGroup.value.id
      )
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
          this.dailyoperatingreportService.delete(row.id).subscribe(
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
