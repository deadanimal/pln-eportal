import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { VirtualLibraryCategoriesService } from "src/app/shared/services/virtual-library-categories/virtual-library-categories.service";

@Component({
  selector: "app-virtual-library",
  templateUrl: "./virtual-library.component.html",
  styleUrls: ["./virtual-library.component.scss"],
})
export class VirtualLibraryComponent implements OnInit {
  // Data
  vl_categories = [];

  constructor(
    private router: Router,
    private virtuallibrarycategoryService: VirtualLibraryCategoriesService
  ) {
    this.getData();
  }

  getData() {
    this.virtuallibrarycategoryService.filter("status=true").subscribe(
      (res) => {
        console.log("res", res);
        this.vl_categories = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {}
}
