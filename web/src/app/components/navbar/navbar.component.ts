import { Component, OnInit, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, NavigationEnd } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

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

  // Token
  accessToken: string;

  // Modal
  loginModal: BsModalRef;
  registerModal: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
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

    this.registerFormGroup = this.formBuilder.group({
      full_name: ["", Validators.compose([Validators.required])],
      username: [
        "",
        Validators.compose([Validators.required, Validators.email]),
      ],
      email: ["", Validators.compose([Validators.required])],
      password1: ["", Validators.compose([Validators.required])],
      password2: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      postcode: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      state: ["", Validators.compose([Validators.required])],
      country: ["", Validators.compose([Validators.required])],
      user_type: ["CS"],
    });
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
    this.auth.obtainToken(this.loginFormGroup.value).subscribe(
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
    console.log(this.registerFormGroup.value);

    this.auth.registerAccount(this.registerFormGroup.value).subscribe(
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

  openLoginModal(template: TemplateRef<any>) {
    this.loginModal = this.modalService.show(template);
  }

  closeLoginModal() {
    this.loginModal.hide();
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.registerModal = this.modalService.show(template);
  }

  closeRegisterModal() {
    this.registerModal.hide();
  }
}
