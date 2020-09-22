import { Component, OnInit, HostListener } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  // Screen size
  screenWidth: any;
  screenHeight: any;

  rate: number = 0;
  totalnow: number = 8;
  totaltoday: number = 50;
  totalweek: number = 154;
  totalmonth: number = 367;
  totalyear: number = 590;
  totalall: number = 3098;

  constructor() {}

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
