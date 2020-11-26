import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

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
    private metaTagService: Meta,
    private route: ActivatedRoute,
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

  ngOnInit() {
    this.addMetaTag();
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
