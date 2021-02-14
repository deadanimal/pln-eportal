import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { JwtService } from "src/app/shared/jwt/jwt.service";
import { CartsService } from "src/app/shared/services/carts/carts.service";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;
  
  // Modules
  modules = [];
  /* modules = [
    {
      title: "Kembara Simulasi",
      link: "/simulator-ride",
      img: "../../../assets/home/icon/kembara-simulasi.jpeg",
    },
    {
      title: "Tayangan",
      link: "/shows",
      img: "../../../assets/home/icon/tayangan.jpeg",
    },
    {
      title: "Pameran",
      link: "/exhibit",
      img: "../../../assets/home/icon/pameran.jpeg",
    },
    {
      title: "Lawatan",
      link: "/visit",
      img: "../../../assets/home/icon/lawatan.jpeg",
    },
    {
      title: "Program Pendidikan",
      link: "/program",
      img: "../../../assets/home/icon/program-pendidikan.jpeg",
    },
    {
      title: "Maklum Balas",
      link: "/survey",
      img: "../../../assets/home/icon/maklum-balas.jpeg",
    },
    {
      title: "Fasiliti",
      link: "/facility",
      img: "../../../assets/home/icon/fasiliti.jpeg",
    },
    {
      title: "Penerbitan",
      link: "/publication",
      img: "../../../assets/home/icon/penerbitan.jpeg",
    },
    {
      title: "Kutubkhanah Mini",
      link: "/virtual-library",
      img: "../../../assets/home/icon/perpustakaan-maya.jpeg",
    },
  ]; */

  constructor(
    public translate: TranslateService,
    private authService: AuthService,
    private cartService: CartsService,
    private jwtService: JwtService,
    private moduleService: ModulesService,
    private w3cService: W3csService
  ) {
    this.getData();
    this.getAddToCartCount();
  }

  getData() {
    this.moduleService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.modules = res;
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  getAddToCartCount() {
    if (this.jwtService.getToken("accessToken")) {
      this.cartService
        .filter(
          "cart_status=CR&user=" + this.authService.decodedToken().user_id
        )
        .subscribe(
          (res) => {
            this.w3cService.changeAddToCartCount(res.length);
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe((fontSize) => {
      this.fontSize = fontSize;
      console.log("fontSize", this.fontSize);
    });

    this.w3cService.currentThemeColor.subscribe(
      (themeColor) => (this.themeColor = themeColor)
    );
  }
}
