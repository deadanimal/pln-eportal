import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { Gallery } from "@ngx-gallery/core";
import { Lightbox } from "@ngx-gallery/lightbox";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";
import { ShowingsService } from "src/app/shared/services/showings/showings.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ShowsComponent implements OnInit {
  // CSS class
  fontSize: string;

  // Form
  focus;

  // Data
  showings = []; //: Show[] = [];

  // Carousel
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  activeSlideIndex = 0;

  // Lightbox
  galleryId = "myLightbox";

  // Modal
  videoModal: BsModalRef;

  constructor(
    public gallery: Gallery,
    public lightbox: Lightbox,
    private jwtService: JwtService,
    private modalService: BsModalService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private showingService: ShowingsService,
    private w3cService: W3csService
  ) {
    this.getShowing();
  }

  getShowing() {
    let filterField = "status=AV";
    this.showingService.filter(filterField).subscribe(
      (res) => {
        console.log("res", res);
        this.showings = res;
        for (let i = 0; i < this.showings.length; i++) {
          this.showings[i].show = false;
        }
        console.log("showings", this.showings);
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
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

  openModal(template: TemplateRef<any>, showing) {
    // this.videoModal = this.modalService.show(template, { class: "modal-lg" });
    this.gallery.destroyAll();
    const lightboxRef = this.gallery.ref();
    lightboxRef.addYoutube({ src: showing.trailer_link.split("v=")[1] });
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

  showMore(index: number) {
    this.showings[index].show = !this.showings[index].show;
  }

  addMetaTag() {
    this.metaTagService.addTags([
      { name: "og:title", content: this.route.snapshot.data["title"] },
      {
        name: "og:description",
        content: this.route.snapshot.data["description"],
      },
      { name: "og:url", content: this.route.snapshot.data["url"] },
      { name: "og:site_name", content: this.route.snapshot.data["site_name"] },
      {
        name: "og:image",
        content: this.route.snapshot.data["image"],
      },
      {
        name: "twitter:card",
        content: this.route.snapshot.data["twitter_card"],
      },
      {
        name: "twitter:description",
        content: this.route.snapshot.data["twitter_description"],
      },
      {
        name: "twitter:title",
        content: this.route.snapshot.data["twitter_title"],
      },
      {
        name: "twitter:image",
        content: this.route.snapshot.data["twitter_image"],
      },
      {
        name: "twitter:url",
        content: this.route.snapshot.data["twitter_url"],
      },
    ]);
  }
}
