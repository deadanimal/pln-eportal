import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // Data
  user: any;
  selectedTab: string = "maklumat-am";

  // Dropdown
  races = [
    {
      value: "ML",
      display_name: "Melayu",
    },
    {
      value: "CN",
      display_name: "Cina",
    },
    {
      value: "ID",
      display_name: "India",
    },
    {
      value: "OT",
      display_name: "Lain-lain",
    },
  ];
  genders = [
    {
      value: "FM",
      display_name: "Perempuan",
    },
    {
      value: "ML",
      display_name: "Lelaki",
    },
  ];

  // FormGroup
  passwordchangeFormGroup: FormGroup;
  userFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      full_name: new FormControl(""),
      nric: new FormControl(""),
      nric_picture: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      birth_date: new FormControl(""),
      age: new FormControl(0),
      address_1: new FormControl(""),
      address_2: new FormControl(""),
      address_3: new FormControl(""),
      postcode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      country: new FormControl(""),
      user_type: new FormControl(""),
      gender_type: new FormControl(""),
      race_type: new FormControl(""),
      is_active: new FormControl(false),
    });

    this.passwordchangeFormGroup = this.formBuilder.group(
      {
        new_password1: new FormControl(
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
          ])
        ),
        new_password2: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        old_password: new FormControl(""),
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.changepasswordMatchValidator,
      }
    );

    this.getUser();
  }

  getUser() {
    this.userService.get(this.authService.decodedToken().user_id).subscribe(
      (res) => {
        console.log("res", res);
        this.user = res;
        this.userFormGroup.patchValue({
          ...res,
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  updateProfile() {
    this.userService
      .update(this.userFormGroup.value, this.userFormGroup.value.id)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            icon: "success",
            title: "Maklumat AM",
            text: "Maklumat am anda berjaya dikemaskini. Terima kasih.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            icon: "warning",
            title: "Tukar kata laluan",
            text: "Maklumat am anda tidak berjaya dikemaskini. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );
  }

  changePassword() {
    this.authService
      .changePassword(this.passwordchangeFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal.fire({
            icon: "success",
            title: "Tukar kata laluan",
            text: "Kata laluan anda berjaya dikemaskini. Terima kasih.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        },
        (err) => {
          console.error("err", err);
          swal.fire({
            icon: "warning",
            title: "Tukar kata laluan",
            text: "Kata laluan anda tidak berjaya dikemaskini. Sila cuba lagi.",
            buttonsStyling: false,
            confirmButtonText: "Tutup",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      );
  }
}
