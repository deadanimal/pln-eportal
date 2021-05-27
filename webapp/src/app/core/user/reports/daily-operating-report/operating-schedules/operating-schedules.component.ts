import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { DailyOperatingReportsService } from "src/app/shared/services/daily-operating-reports/daily-operating-reports.service";
import { OperatingSchedulesService } from "src/app/shared/services/operating-schedules/operating-schedules.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-operating-schedules",
  templateUrl: "./operating-schedules.component.html",
  styleUrls: ["./operating-schedules.component.scss"],
})
export class OperatingSchedulesComponent implements OnInit {
  // Data
  dailyoperatingreport = [];

  // Dropdown
  times = [
    {
      value: "1000",
      display_name: "1000",
    },
    {
      value: "1100",
      display_name: "1100",
    },
    {
      value: "1200",
      display_name: "1200",
    },
    {
      value: "1300",
      display_name: "1300",
    },
    {
      value: "1400",
      display_name: "1400",
    },
    {
      value: "1500",
      display_name: "1500",
    },
    {
      value: "1600",
      display_name: "1600",
    },
  ];

  // FormGroup
  operatingscheduleFormGroup: FormGroup;

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
    private dailyoperatingreportService: DailyOperatingReportsService,
    private operatingscheduleService: OperatingSchedulesService
  ) {
    this.getDailyOperatingReport();

    this.operatingscheduleFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      time: new FormControl(""),
      show_name: new FormControl(""),
      show_audience: new FormControl(""),
      space_pod_participant: new FormControl(""),
      notes: new FormControl(""),
      daily_operating_report_id: new FormControl(""),
    });
  }

  getDailyOperatingReport() {
    this.dailyoperatingreportService
      .filter("id=" + this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.dailyoperatingreport = res;
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
    this.operatingscheduleService.get().subscribe((res) => {
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
      this.operatingscheduleFormGroup.patchValue({
        daily_operating_report_id: this.route.snapshot.paramMap.get("id"),
      });
    } else if (process == "update") {
      this.operatingscheduleFormGroup.patchValue({
        ...row,
        daily_operating_report_id: this.route.snapshot.paramMap.get("id"),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.operatingscheduleService
      .post(this.operatingscheduleFormGroup.value)
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
    this.operatingscheduleService
      .update(
        this.operatingscheduleFormGroup.value,
        this.operatingscheduleFormGroup.value.id
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
          this.operatingscheduleService.delete(row.id).subscribe(
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
