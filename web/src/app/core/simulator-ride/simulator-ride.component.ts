import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

import { JwtService } from "src/app/shared/jwt/jwt.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-simulator-ride",
  templateUrl: "./simulator-ride.component.html",
  styleUrls: ["./simulator-ride.component.scss"],
})
export class SimulatorRideComponent implements OnInit {
  // CSS class
  fontSize: string;

  constructor(
    public translate: TranslateService,
    private jwtService: JwtService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private w3cService: W3csService
  ) {}

  ngOnInit() {
    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
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
        this.translate.instant("RalatLoginBook"),
        this.translate.instant("Ralat")
      );
    }
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
