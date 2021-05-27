import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { UsersService } from "src/app/shared/services/users/users.service";
import { SupervisorsService } from "src/app/shared/services/supervisors/supervisors.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-supervisors",
  templateUrl: "./supervisors.component.html",
  styleUrls: ["./supervisors.component.scss"],
})
export class SupervisorsComponent implements OnInit {
  // Data
  users = [];

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
    class: "modal-dialog",
    ignoreBackdropClick: true,
  };

  // FormGroup
  supervisorFormGroup: FormGroup;

  // Dropdown
  usertypes = [
    {
      value: "DR",
      display_name: "Pengarah",
    },
    {
      value: "SA",
      display_name: "Super Admin",
    },
    {
      value: "FA",
      display_name: "Pentadbir Kewangan",
    },
    {
      value: "TA",
      display_name: "Pentadbir Teknikal",
    },
    {
      value: "TC",
      display_name: "Pentadbir Kaunter Tiket",
    },
    {
      value: "VA",
      display_name: "Pentadbir Lawatan",
    },
    {
      value: "EP",
      display_name: "Pentadbir Program Pendidikan",
    },
    {
      value: "EA",
      display_name: "Pentadbir Pameran",
    },
    {
      value: "PK",
      display_name: "Pentadbir Penerbitan & Kutubkhanah",
    },
    {
      value: "SV",
      display_name: "Pentadbir Maklum Balas / Soal Selidik",
    },
    {
      value: "CS",
      display_name: "Pelanggan",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UsersService,
    private supervisorService: SupervisorsService
  ) {
    this.supervisorFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      user: new FormControl(""),
      date_on_duty: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
    this.getUser();
  }

  getData() {
    this.supervisorService.extended("").subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }

  getUser() {
    this.userService.getAll().subscribe(
      (res) => {
        // console.log("res", res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].user_type != "CS") this.users.push(res[i]);
        }
      },
      (err) => {
        console.error("err", err);
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

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.supervisorFormGroup.reset();
    } else if (process == "update") {
      this.supervisorFormGroup.patchValue({
        ...row,
        user: row.user.id,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  checkInterceptSupervisor() {
    let new_user = this.supervisorFormGroup.value.user;
    let new_date_on_duty = this.supervisorFormGroup.value.date_on_duty;

    if (this.tableRows.length > 0) {
      for (let i = 0; i < this.tableRows.length; i++) {
        if (
          new_user == this.tableRows[i].user.id &&
          new_date_on_duty == this.tableRows[i].date_on_duty
        ) {
          return false;
        } else {
          return true;
        }
      }
    } else return true;
  }

  create() {
    if (this.checkInterceptSupervisor()) {
      this.supervisorService.post(this.supervisorFormGroup.value).subscribe(
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
      this.sweetAlertWarning(
        "Ralat",
        "Hanya 2 penyelia sahaja dibenarkan dalam satu hari bekerja"
      );
    }
  }

  update() {
    this.supervisorService
      .update(this.supervisorFormGroup.value, this.supervisorFormGroup.value.id)
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
          this.supervisorService.delete(row.id).subscribe(
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

  getUserType(value: string) {
    let result = this.usertypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
