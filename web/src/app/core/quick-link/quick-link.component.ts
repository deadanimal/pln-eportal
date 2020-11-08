import { Component, OnInit } from "@angular/core";

import { QuickLinksService } from "src/app/shared/services/quick-links/quick-links.service";

@Component({
  selector: "app-quick-link",
  templateUrl: "./quick-link.component.html",
  styleUrls: ["./quick-link.component.scss"],
})
export class QuickLinkComponent implements OnInit {
  // Data
  quicklinks = [];

  // Dropdown
  categories = [
    {
      value: "PTMY",
      display_name: "Planetarium Malaysia",
    },
    {
      value: "PTLN",
      display_name: "Planetarium Luar Negara",
    },
    {
      value: "BCMY",
      display_name: "Balai Cerap Malaysia",
    },
    {
      value: "BCLN",
      display_name: "Balai Cerap Luar Negara",
    },
  ];

  constructor(private quicklinkService: QuickLinksService) {
    this.getData();
  }

  getData() {
    this.quicklinkService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.quicklinks = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
