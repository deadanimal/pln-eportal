import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import Glide from "@glidejs/glide";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.scss"],
})
export class ShowsComponent implements OnInit {
  // Form
  focus;

  // Data
  showings = []; //: Show[] = [];

  // Glide

  // Carousel
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  activeSlideIndex = 0;

  // Modal
  videoModal: BsModalRef;

  constructor(
    private jwtService: JwtService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService,
    private showingService: ShowingsService
  ) {
    this.getShowing();
  }

  getShowing() {
    let filterField = "status=AV";
    this.showingService.filter(filterField).subscribe(
      (res) => {
        this.showings = res;
        console.log("res", res);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    // this.initGlide();
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
      // let navigationExtras: NavigationExtras = {
      //   state: {
      //     show,
      //   },
      // };
      this.router.navigate(["/shows/shows-book/" + id]);
    } else {
      this.toastr.error(
        "Harap maaf. Anda perlu log masuk terlebih dahulu untuk menempah tiket.",
        "Ralat"
      );
    }
  }
}
