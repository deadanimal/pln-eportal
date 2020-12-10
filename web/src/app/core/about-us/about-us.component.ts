import {
  Component,
  OnInit,
  HostListener,
  ViewEncapsulation,
} from "@angular/core";
import { Router } from "@angular/router";

import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit {
  // Data
  dynamiccontents = [];
  establishedYear = 1994;
  year: number = 0;

  // Screen size
  screenWidth: any;
  screenHeight: any;

  constructor(
    private dynamiccontentService: DynamicContentsService,
    private router: Router
  ) {
    this.year = new Date().getFullYear() - this.establishedYear;

    this.getData();
  }

  getData() {
    this.dynamiccontentService
      .filter("category=" + this.router.url.replace("/", ""))
      .subscribe(
        (res) => {
          console.log("res", res);
          this.dynamiccontents = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
}
