import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";

@Component({
  selector: "app-virtual-library-koleksi",
  templateUrl: "./virtual-library-koleksi.component.html",
  styleUrls: ["./virtual-library-koleksi.component.scss"],
})
export class VirtualLibraryKoleksiComponent implements OnInit {
  // Data
  vl_collections = [];
  virtual_library_collection_category_id: string = "";

  constructor(
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService
  ) {
    this.virtual_library_collection_category_id = this.route.snapshot.paramMap.get(
      "category_id"
    );
    if (this.virtual_library_collection_category_id) this.getData();
  }

  getData() {
    this.virtuallibrarycollectionService
      .filter(
        "virtual_library_collection_category_id=" +
          this.virtual_library_collection_category_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_collections = res;
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
