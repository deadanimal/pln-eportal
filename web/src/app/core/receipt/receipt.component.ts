import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.scss"],
})
export class ReceiptComponent implements OnInit {
  // Data
  user: any;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {
    this.getUser();
  }

  getUser() {
    if (this.jwtService.getToken("accessToken")) {
      this.userService.get(this.authService.decodedToken().user_id).subscribe(
        (res) => {
          // console.log("res", res);
          this.user = res;
          console.log("user", this.user);
        },
        (err) => {
          console.error("err", err);
        }
      );
    }
  }

  ngOnInit(): void {}
}
