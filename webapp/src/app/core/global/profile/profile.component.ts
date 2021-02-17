import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // FormGroup
  userFormGroup: FormGroup;

  // Toggle
  editEnabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl({ value: "" }),
      full_name: new FormControl({ value: "" }),
      // nric: new FormControl({value: ""}),
      // nric_picture: new FormControl({value: ""}),
      email: new FormControl({ value: "" }),
      phone: new FormControl({ value: "" }),
      // birth_date: new FormControl({value: ""}),
      // age: new FormControl(0),
      address_1: new FormControl({ value: "" }),
      address_2: new FormControl({ value: "" }),
      address_3: new FormControl({ value: "" }),
      postcode: new FormControl({ value: "" }),
      city: new FormControl({ value: "" }),
      state: new FormControl({ value: "" }),
      country: new FormControl({ value: "" }),
      user_type: new FormControl({ value: "" }),
      gender_type: new FormControl({ value: "" }),
      race_type: new FormControl({ value: "" }),
      // is_active: new FormControl(false),
      // date_joined: new FormControl({value: ""}),
    });

    this.getData();
    this.toggleEdit();
  }

  getData() {
    this.userService.getOne(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        // console.log("res", res);
        this.userFormGroup.patchValue({
          ...res,
        });
        console.log("userFormGroup", this.userFormGroup.value);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  toggleEdit() {
    this.editEnabled = !this.editEnabled;

    if (this.editEnabled) {
      this.userFormGroup.enable();
    } else {
      this.userFormGroup.disable();
    }
  }

  confirm() {
    swal
      .fire({
        title: "Pengesahan",
        text: "Adakah anda pasti menyimpan kemaskini ini?",
        icon: "info",
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-default",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Ya",
        showCancelButton: true,
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.edit();
        }
      });
  }

  edit() {
    this.userService
      .update(this.authService.decodedToken().user_id, this.userFormGroup.value)
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
                this.getData();
                this.toggleEdit();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            title: "Ralat",
            text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
            icon: "warning",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-warning",
            },
          });
        }
      );
  }
}
