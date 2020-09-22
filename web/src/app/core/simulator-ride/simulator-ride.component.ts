import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Glide from "@glidejs/glide";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";

@Component({
  selector: "app-simulator-ride",
  templateUrl: "./simulator-ride.component.html",
  styleUrls: ["./simulator-ride.component.scss"],
})
export class SimulatorRideComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initGlide();
  }

  initGlide() {
    new Glide(".glide-simulator", {
      type: "carousel",
      perView: 4,
      startAt: 2,
      focusAt: 2,
      animationDuration: 500,
      autoplay: 5000,
      clone: false,
    }).mount();
  }

  changeAdultQuantity(value: number): void {
    console.log(value);
  }

  changeChildrenQuantity(value: number): void {
    console.log(value);
  }

  changeSeniorQuantity(value: number): void {
    console.log(value);
  }

  clickBook() {
    if (this.jwtService.getToken("accessToken")) {
      this.router.navigate(["/simulator-ride/simulator-ride-book"]);
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menempah tiket.",
        "Ralat"
      );
    }
  }
}
