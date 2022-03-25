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
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { RolesService } from "src/app/shared/services/roles/roles.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  // Errors
  errors = [
    {
      email: {
        exist: "Pengguna sudah didaftarkan dengan alamat emel ini.",
      },
    },
    {
      username: {
        exist: "Pengguna dengan nama pengguna tersebut sudah wujud.",
      },
    },
  ];

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
  userFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UsersService,
    public roleService: RolesService,
    private authService: AuthService
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl("", Validators.compose([Validators.required])),
      // nric: new FormControl(""),
      // nric_picture: new FormControl(""),
      email: new FormControl("", Validators.compose([Validators.required])),
      phone: new FormControl("", Validators.compose([Validators.required])),
      // birth_date: new FormControl(""),
      // age: new FormControl(""),
      address: new FormControl("", Validators.compose([Validators.required])),
      postcode: new FormControl("", Validators.compose([Validators.required])),
      city: new FormControl("", Validators.compose([Validators.required])),
      state: new FormControl("", Validators.compose([Validators.required])),
      country: new FormControl("", Validators.compose([Validators.required])),
      user_icon: new FormControl("CS"),
      is_active: new FormControl(false),
      // gender_icon: new FormControl(""),
      // race_icon: new FormControl(""),
      username: new FormControl("", Validators.compose([Validators.required])),
      password1: new FormControl(""),
      password2: new FormControl(""),
      role: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.tableRows.length > 0) this.tableRows = [];
    this.userService.extended("role=CS").subscribe((res) => {
      // for (let i = 0; i < res.length; i++) {
      //   if (res[i].role.code != 'CS') res.splice(i, 1);
      // }
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
    let auth_registration = {
	"username": this.userFormGroup.value.email,
	"password1": this.userFormGroup.value.password1,
	"password2": this.userFormGroup.value.password2,
    }

    this.roleService.filter("code=CS").subscribe((res) => {
      // console.log("res", res);
      this.userFormGroup.patchValue({
        role: res[0].id,
      });
    });



    this.authService.register(auth_registration).subscribe(
      (res) => {
        // console.log("res", res);
        if (res) {
	  console.log("form registration", this.userFormGroup.value)
          this.userService
            .update(res.user.pk, this.userFormGroup.value)
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
      },
      (err) => {
        console.error("err", err);
        let errorMsg = "";
        if (err.error.email) errorMsg += this.errors[0].email.exist;
        if (err.error.username) errorMsg += this.errors[1].username.exist;
        swal
          .fire({
            title: "Ralat",
            text:
              "Data anda tidak berjaya disimpan." +
              errorMsg +
              " Sila cuba lagi",
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
    this.userFormGroup.value.role = this.userFormGroup.value.role.id
    this.userService
      .update(this.userFormGroup.value.id, this.userFormGroup.value)
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
          this.userService.delete(row.id).subscribe(
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
