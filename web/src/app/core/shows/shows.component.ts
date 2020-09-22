import { Component, OnInit, TemplateRef } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import Glide from "@glidejs/glide";
import { NguCarouselConfig } from "@ngu/carousel";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";

class Show {
  id: string;
  title: string;
  description: string;
  poster: string;
}

const showings = [
  { id: "", title: "", description: "", poster: "" },
  { id: "", title: "", description: "", poster: "" },
  { id: "", title: "", description: "", poster: "" },
  { id: "", title: "", description: "", poster: "" },
  { id: "", title: "", description: "", poster: "" },
];

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.scss"],
})
export class ShowsComponent implements OnInit {
  // Form
  focus;

  // Data
  shows: Show[] = [];

  // Glide

  // Carousel

  imgags = [
    "assets/bg.jpg",
    "assets/car.png",
    "assets/canberra.jpg",
    "assets/holi.jpg",
  ];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true,
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: "cubic-bezier(0, 0, 0.2, 1)",
  };
  videoModal: BsModalRef;

  constructor(
    private jwtService: JwtService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.carouselTileItems.forEach((el) => {
      this.carouselTileLoad(el);
    });
    this.initGlide();
  }

  initGlide() {
    new Glide(".glide-shows", {
      type: "carousel",
      perView: 3,
      startAt: 2,
      focusAt: 2,
      animationDuration: 500,
      autoplay: 5000,
      clone: false,
    }).mount();
  }

  navigatePage(path: string, id: string) {
    this.router.navigate([path]);
  }

  public carouselTileLoad(j) {
    // console.log(this.carouselTiles[j]);
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTiles[j].push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
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

  openModal(template: TemplateRef<any>) {
    this.videoModal = this.modalService.show(template, { class: "modal-lg" });
  }

  makeBooking(id: number, title: string) {
    if (this.jwtService.getToken("accessToken")) {
      let show = {
        id,
        title,
      };
      let navigationExtras: NavigationExtras = {
        state: {
          show,
        },
      };
      this.router.navigate(["/shows/shows-book"], navigationExtras);
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menempah tiket.",
        "Ralat"
      );
    }
  }
}
