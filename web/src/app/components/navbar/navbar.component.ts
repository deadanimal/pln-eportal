import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CustomValidators } from "src/app/shared/class/custom-validators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  // Default
  isCollapsed = true;
  autoclose = false;

  // Swtich
  switch = true;
  onText = "BM";
  offText = "EN";
  onColor = "danger";
  offColor = "primary";

  // Forms
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  forgotPasswordFormGroup: FormGroup;

  // Data
  rememberMe: boolean = false;

  // Token
  accessToken: string;

  // Modal
  loginModal: BsModalRef;
  registerModal: BsModalRef;
  forgotPasswordModal: BsModalRef;

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public jwtService: JwtService,
    public userService: UsersService,
    public translate: TranslateService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    router.events.subscribe((val) => {
      this.autoclose = true;
      this.isCollapsed = true;
    });

    this.loginFormGroup = this.formBuilder.group({
      username: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });

    this.forgotPasswordFormGroup = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });

    this.registerFormGroup = this.formBuilder.group(
      {
        full_name: ["", Validators.compose([Validators.required])],
        username: ["", Validators.compose([])],
        email: [
          "",
          Validators.compose([Validators.required, Validators.email]),
        ],
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
        phone: ["", Validators.compose([Validators.required])],
        address_1: ["", Validators.compose([Validators.required])],
        address_2: ["", Validators.compose([])],
        address_3: ["", Validators.compose([])],
        postcode: ["", Validators.compose([Validators.required])],
        city: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        country: ["", Validators.compose([Validators.required])],
        birth_date: ["", Validators.compose([Validators.required])],
        gender_type: ["", Validators.compose([Validators.required])],
        race_type: ["", Validators.compose([Validators.required])],
        user_type: ["CS"],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
    this.accessToken = this.jwtService.getToken("accessToken");
  }

  onSwitchChange(event) {
    // console.log(event);
    if (event.currentValue == true) {
      this.translate.use("my");
    } else {
      this.translate.use("en");
    }
  }

  navigatePage(link: string) {
    this.router.navigate([link]);
  }

  clickLogin() {
    this.authService.obtainToken(this.loginFormGroup.value).subscribe(
      (res) => {
        // console.log("res", res);
        this.toastr.success(
          "Log masuk berjaya. Sila tunggu sebentar.",
          "Berjaya",
          {
            progressBar: true,
            progressAnimation: "increasing",
          }
        );
        this.accessToken = res.access;
        this.loginModal.hide();
        this.router.navigate(["/home"]);
      },
      (err) => {
        // console.error("err", err);
        this.toastr.error(
          "Harap maaf, terdapat masalah ketika anda ingin log masuk. Sila cuba lagi.",
          "Ralat"
        );
      }
    );
  }

  clickLogout() {
    this.toastr.info("Anda telah log keluar. Terima kasih.", "Info");
    this.jwtService.destroyToken();
    this.accessToken = this.jwtService.getToken("accessToken");
    this.router.navigate(["/landing"]);
  }

  clickRegister() {
    this.registerFormGroup.value.username = this.registerFormGroup.value.email;

    this.authService.registerAccount(this.registerFormGroup.value).subscribe(
      (res) => {
        console.log("res", res);
        if (res) {
          this.userService
            .update(this.registerFormGroup.value, res.user.pk)
            .subscribe(
              (res) => {
                console.log("res", res);
                this.toastr.success(
                  "Pendaftaran anda berjaya. Sila log masuk.",
                  "Berjaya"
                );
                this.registerModal.hide();
              },
              (err) => {
                console.error("err", err);
                this.toastr.error(
                  "Pendaftaran anda tidak berjaya. Sila cuba lagi.",
                  "Ralat"
                );
              }
            );
        }
      },
      (err) => {
        console.error("err", err);
        this.toastr.error(
          "Pendaftaran anda tidak berjaya. Sila cuba lagi.",
          "Ralat"
        );
      }
    );
  }

  clickForgotPassword() {
    this.authService
      .resetPassword(this.forgotPasswordFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          if (res) {
            swal.fire({
              icon: "success",
              title: "Tukar kata laluan",
              text:
                "Tukar kata laluan sudah dihantar kepada emel anda. Sila check emel anda. Terima kasih.",
              buttonsStyling: false,
              confirmButtonText: "Tutup",
              customClass: {
                confirmButton: "btn btn-success",
              },
            }).then(result => {
              if (result.value) {
                this.forgotPasswordModal.hide();
              }
            });
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  openLoginModal(template: TemplateRef<any>) {
    this.loginModal = this.modalService.show(template);
  }

  closeLoginModal() {
    this.loginModal.hide();
  }

  openForgotPasswordModal(template: TemplateRef<any>) {
    this.closeLoginModal();
    this.forgotPasswordModal = this.modalService.show(template);
  }

  closeForgotPasswordModal() {
    this.forgotPasswordModal.hide();
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.registerModal = this.modalService.show(template);
  }

  closeRegisterModal() {
    this.registerModal.hide();
  }
}
