import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CustomValidators } from "src/app/shared/class/custom-validators";
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
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
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

  // Icons
  password1: boolean = false;
  password2: boolean = false;

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
  passwordFormGroup: FormGroup;

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
      staff_id: new FormControl("", Validators.compose([Validators.required])),
      user_type: new FormControl("", Validators.compose([Validators.required])),
      is_active: new FormControl(false),
      // gender_type: new FormControl(""),
      // race_type: new FormControl(""),
      username: new FormControl("", Validators.compose([Validators.required])),
      password1: new FormControl(""),
      password2: new FormControl(""),
    });

    this.passwordFormGroup = this.formBuilder.group(
      {
        id: new FormControl(""),
        full_name: new FormControl(""),
        email: new FormControl(""),
        password1: [
          "",
          Validators.compose([
            Validators.required, // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true,
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true,
              }
            ),
            Validators.minLength(8),
          ]),
        ],
        password2: ["", Validators.compose([Validators.required])],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    if (this.tableRows.length > 0) this.tableRows = [];
    this.userService.getAll().subscribe((res) => {
      res.forEach((obj) => {
        if (obj.user_type != "CS") this.tableRows.push(obj);
      });
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
    } else if ((process = "change-password")) {
      this.passwordFormGroup.reset();
      this.passwordFormGroup.patchValue({
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
        // console.log("res", res);
        if (res) {
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

  changeNewPassword() {
    this.userService
      .changeNewPassword(
        this.passwordFormGroup.value.id,
        this.passwordFormGroup.value["password1"]
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Kata laluan baru anda berjaya dikemaskini.",
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
          console.log("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Kata laluan baru anda tidak berjaya dikemaskini. Sila cuba lagi",
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

  changePassword1Icon() {
    this.password1 = !this.password1;
  }

  changePassword2Icon() {
    this.password2 = !this.password2;
  }

  getUserType(value: string) {
    let result = this.usertypes.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
