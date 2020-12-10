import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { DynamicContentsService } from "src/app/shared/services/dynamic-contents/dynamic-contents.service";

@Component({
  selector: "app-noc",
  templateUrl: "./noc.component.html",
  styleUrls: ["./noc.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NocComponent implements OnInit {
  // Data
  dynamiccontents = [];

  constructor(
    private dynamiccontentService: DynamicContentsService,
    private router: Router
  ) {
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

  ngOnInit() {}
}
