import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  // Screen size
  screenWidth: any;
  screenHeight: any;

  year: number = 0;
  establishedYear = 1994;

  constructor() {
    this.year = new Date().getFullYear() - this.establishedYear;
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
