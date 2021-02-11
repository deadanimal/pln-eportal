import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { UsersService } from "src/app/shared/services/users/users.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
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
  };

  // FormGroup
  userFormGroup: FormGroup;

  // Dropdown
  usertypes = [
    {
      value: "CS",
      display_name: "Pelanggan",
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UsersService,
    private authService: AuthService
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      // nric: new FormControl(""),
      // nric_picture: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      // birth_date: new FormControl(""),
      // age: new FormControl(""),
      address: new FormControl(""),
      postcode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
      user_icon: new FormControl("CS"),
      is_active: new FormControl(false),
      // gender_icon: new FormControl(""),
      // race_icon: new FormControl(""),
      username: new FormControl(""),
      password1: new FormControl(""),
      password2: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getAll().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].user_type != 'CS') res.splice(i, 1);
      }
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
      this.userFormGroup.reset();
    } else if (process == "update") {
      this.userFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.userFormGroup.value.password1 = "planetarium@2020";
    this.userFormGroup.value.password2 = "planetarium@2020";

    this.authService.register(this.userFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        if (res) {
          this.userService
            .update(res.user.pk, this.userFormGroup.value)
            .subscribe(
              (res) => {
                console.log("res", res);
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
    this.userService
      .update(this.userFormGroup.value, this.userFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
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
          this.userService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
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

  getUserType(value: string) {
    let result = this.usertypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
