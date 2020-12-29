import { Component, OnInit } from "@angular/core";
import { LoadingBarService } from "@ngx-loading-bar/core";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // Image
  imgLogo: string = "assets/img/logo/planetarium-logo.png";

  // Login form
  focusUsername: boolean = false;
  focusPassword: boolean = false;
  loginForm: FormGroup;
  loginFormMessages = {
    username: [
      { type: "required", message: "Emel diperlukan" },
      { type: "email", message: "Sila masukkan e-mel yang sah" },
    ],
    password: [
      { type: "required", message: "Password diperlukan" },
      {
        type: "minLength",
        message: "Kata laluan mesti mengandungi sekurang-kurangnya 8 aksara",
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadingBar: LoadingBarService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  login() {
    // console.log("loginForm", this.loginForm.value);
    // this.navigatePage('/dashboard')

    this.authService.obtainToken(this.loginForm.value).subscribe(
      (res) => {
        // Success
        console.log("res", res);
        this.loadingBar.complete();
        if (this.authService.decodedToken().user_type != "CS") {
          this.navigatePage("/dashboard");
        } else {
          this.wrongRoleMessage();
        }
      },
      (err) => {
        // Failed
        console.error("err", err);
        this.loadingBar.complete();
        this.errorMessage();
      },
      () => {
        // After
        // this.navigatePage("/dashboard");
      }
    );
  }

  successMessage() {
    let title = "Berjaya";
    let message = "Anda sudah berjaya log masuk.";
    this.toastr.success(message, title);
  }

  errorMessage() {
    let title = "Ralat";
    let message =
      "Terdapat ralat pada maklumat log masuk anda. Sila cuba lagi.";
    this.toastr.error(message, title);
  }

  wrongRoleMessage() {
    let title = "Ralat";
    let message =
      "Anda cuba memasukkan peranan yang salah untuk log masuk. Sila cuba yang lain.";
    this.toastr.error(message, title);
  }

  navigatePage(path: string) {
    if (path == "/dashboard") {
      this.successMessage();
      return this.router.navigate([path]);
    } else if (path == "/forgot") {
      return this.router.navigate(["/auth/forgot"]);
    } else {
      this.errorMessage();
    }
  }

  initServices() {
    this.loadingBar.start();
    forkJoin([]).subscribe(
      () => {
        this.loadingBar.complete();
      },
      () => {
        this.loadingBar.complete();
      },
      () => {}
    );
  }
}
