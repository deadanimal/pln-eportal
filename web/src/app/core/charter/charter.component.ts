import { Component, OnInit } from "@angular/core";

import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-charter",
  templateUrl: "./charter.component.html",
  styleUrls: ["./charter.component.scss"],
})
export class CharterComponent implements OnInit {
  // CSS class
  fontSize: string;
  themeColor: string;

  constructor(private w3cService: W3csService) {}

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
