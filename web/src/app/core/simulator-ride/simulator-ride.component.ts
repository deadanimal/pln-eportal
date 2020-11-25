import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import Glide from "@glidejs/glide";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-simulator-ride",
  templateUrl: "./simulator-ride.component.html",
  styleUrls: ["./simulator-ride.component.scss"],
})
export class SimulatorRideComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private metaTagService: Meta,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.metaTagService.addTags([
      { name: "og:title", content: "Kembara Simulasi" },
      {
        name: "og:description",
        content:
          "Kembara Simulasi merupakan sebuah simulator kokpit dua tempat duduk yang memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas. Pengunjung akan merasai pengalaman pergerakan tiga paksi dengan kebebasan pergerakan 360 darjah.",
      },
      { name: "og:url", content: environment.baseUrl + "simulator-ride" },
      { name: "og:site_name", content: "Planetarium Negara" },
      {
        name: "og:image",
        content: environment.baseUrl + "assets/logo/planetarium-logo.png",
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:description",
        content:
          "Kembara Simulasi merupakan sebuah simulator kokpit dua tempat duduk yang memberikan pengalaman penerokaan dan penerbangan ke angkasa lepas. Pengunjung akan merasai pengalaman pergerakan tiga paksi dengan kebebasan pergerakan 360 darjah.",
      },
      { name: "twitter:title", content: "Kembara Simulasi" },
      {
        name: "twitter:image",
        content: environment.baseUrl + "assets/logo/planetarium-logo.png",
      },
      { name: "twitter:url", content: environment.baseUrl + "simulator-ride" },
    ]);
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
