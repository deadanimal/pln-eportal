import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { CloseBookingsService } from "src/app/shared/services/close-bookings/close-bookings.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-close-booking",
  templateUrl: "./close-booking.component.html",
  styleUrls: ["./close-booking.component.scss"],
})
export class CloseBookingComponent implements OnInit {
  // FormGroup
  closebookingFormGroup: FormGroup;

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

  // Dropdown
  modules = [
    {
      value: "simulator-ride",
      display_name: "Kembara Simulasi",
    },
    {
      value: "shows",
      display_name: "Tayangan",
    },
    {
      value: "facility",
      display_name: "Fasiliti",
    },
    {
      value: "program",
      display_name: "Program Pendidikan",
    },
    {
      value: "visit",
      display_name: "Lawatan",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private closebookingService: CloseBookingsService
  ) {
    this.getData();

    this.closebookingFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      title_en: new FormControl(""),
      description_en: new FormControl(""),
      title_ms: new FormControl(""),
      description_ms: new FormControl(""),
      date_start: new FormControl(""),
      date_end: new FormControl(""),
      module: new FormControl(""),
    });
  }

  ngOnInit() {}

  getData() {
    this.closebookingService.get().subscribe((res) => {
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
      this.closebookingFormGroup.reset();
    } else if (process == "update") {
      this.closebookingFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  // to check if the new input intercept with the exist data
  checkInterceptDate() {
    let new_date_start = new Date(
      this.closebookingFormGroup.value.date_start
    ).setHours(0, 0, 0);
    let new_date_end = new Date(
      this.closebookingFormGroup.value.date_end
    ).setHours(23, 59, 59);
    let new_module = this.closebookingFormGroup.value.module;
    this.tableRows.forEach((obj) => {
      let obj_date_start = new Date(obj.date_start).setHours(0, 0, 0);
      let obj_date_end = new Date(obj.date_end).setHours(23, 59, 59);

      if (obj.module == new_module) {
        // console.log("obj_date_start", obj_date_start);
        // console.log("obj_date_end", obj_date_end);
        // console.log("new_date_start", new_date_start);
        // console.log("new_date_end", new_date_end);
        if (new_date_start > obj_date_start && new_date_end < obj_date_end) {
          obj.status = false;
        } else {
          obj.status = true;
        }
      } else {
        obj.status = true;
      }
    });

    let countFalse = 0;
    for (let i = 0; i < this.tableRows.length; i++) {
      if (this.tableRows[i].status == false) countFalse++;
    }
    return countFalse;
  }

  create() {
    if (this.checkInterceptDate() == 0) {
      this.closebookingService.post(this.closebookingFormGroup.value).subscribe(
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
    } else {
      swal.fire({
        title: "Ralat",
        text:
          "Data anda tidak boleh bertindih dengan tarikh yang sudah wujud. Sila cuba lagi",
        icon: "warning",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
    }
  }

  update() {
    this.closebookingService
      .update(
        this.closebookingFormGroup.value,
        this.closebookingFormGroup.value.id
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
          this.closebookingService.delete(row.id).subscribe(
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

  sweetAlertWarning(title, text) {
    swal.fire({
      title,
      text,
      icon: "warning",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-warning",
      },
    });
  }

  getModule(value: string) {
    let result = this.modules.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
