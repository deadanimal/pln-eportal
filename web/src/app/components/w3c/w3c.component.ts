import { Component, OnInit } from "@angular/core";

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-w3c",
  templateUrl: "./w3c.component.html",
  styleUrls: ["./w3c.component.scss"],
})
export class W3cComponent implements OnInit {
  // Data
  fontSize: string;
  slider = 0.9;

  constructor(private w3cService: W3csService) {}

  ngOnInit() {
    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
  }

  openNav() {
    document.getElementById("myStickeyw3c").style.width = "300px";
  }

  closeNav() {
    document.getElementById("myStickeyw3c").style.width = "0";
  }

  onFontSizeChange(value: any) {
    var fontSizeClass = "fs-" + value.toString().replace(".", "") + "rem";
    this.w3cService.changeFontSize(fontSizeClass);
  }
}
