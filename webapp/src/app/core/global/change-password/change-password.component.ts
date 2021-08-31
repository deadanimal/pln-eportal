import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import swal from "sweetalert2";

import { UsersService } from "src/app/shared/services/users/users.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  // Icons
  password1: boolean = false;
  password2: boolean = false;

  // FormGroup
  passwordFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UsersService,
    private authService: AuthService
  ) {
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
    this.passwordFormGroup.patchValue({
      id: this.authService.decodedToken().user_id,
      full_name: this.authService.decodedToken().full_name,
      email: this.authService.decodedToken().email,
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
}
