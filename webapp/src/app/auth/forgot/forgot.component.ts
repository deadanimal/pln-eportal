import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  // Data
  users = [];

  // Image
  imgLogo: string = "assets/img/logo/planetarium-logo.png";

  // Reset form
  focusEmail: boolean = false;
  resetForm: FormGroup;
  resetFormMessages = {
    email: [
      { type: "required", message: "Emel diperlukan" },
      { type: "email", message: "Sila masukkan e-mel yang sah" },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.initForm();

    this.userService.extended("").subscribe(
      (res) => {
        // console.log("res", res);
        res.forEach((value) => {
          if (value.role.code != "CS") {
            this.users.push(value);
          }
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  initForm() {
    this.resetForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });
  }

  submitReset() {
    // console.log(this.resetForm.value)
    this.loadingBar.start();

    let result = this.users.find((obj) => {
      return obj.email == this.resetForm.value.email;
    });

    if (result) {
      this.authService.resetPassword(this.resetForm.value).subscribe(
        (res) => {
          // Success
          // console.log("res", res);
          this.loadingBar.complete();
          this.successMessage(
            "Berjaya",
            "Emel telah dihantar ke " +
              this.resetForm.value.email +
              " untuk menetapkan semula kata laluan anda"
          );
        },
        (err) => {
          // Failed
          console.error("err", err);
          this.loadingBar.complete();
          this.errorMessage(
            "Ralat",
            "Terdapat masalah ketika log masuk. Sila cuba sebentar lagi."
          );
        },
        () => {
          // After
        }
      );
    } else {
      this.loadingBar.complete();
      this.errorMessage(
        "Ralat",
        "Alamat emel anda tiada di dalam pengkalan data"
      );
    }
  }

  successMessage(title, message) {
    this.toastr.success(message, title);
  }

  errorMessage(title, message) {
    this.toastr.error(message, title);
  }

  navigatePage(path: string) {
    return this.router.navigate([path]);
  }
}
