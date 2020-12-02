import { Component, OnInit } from "@angular/core";

import { QuickLinkCategoriesService } from "src/app/shared/services/quick-link-categories/quick-link-categories.service";
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
  categories = [];

  constructor(
    private quicklinkcategoryService: QuickLinkCategoriesService,
    private quicklinkService: QuickLinksService
  ) {
    this.getCategory();
    this.getData();
  }

  getCategory() {
    this.quicklinkcategoryService.get().subscribe(
      (res) => {
        console.log("res", res);
        this.categories = res;
        for (let i = 0; i < this.categories.length; i++) {
          this.categories[i].show = false;
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
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

  showMore(index: number) {
    this.categories[index].show = !this.categories[index].show;
  }
}
