import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-virtual-library-terbitan-bersiri",
  templateUrl: "./virtual-library-terbitan-bersiri.component.html",
  styleUrls: ["./virtual-library-terbitan-bersiri.component.scss"],
})
export class VirtualLibraryTerbitanBersiriComponent implements OnInit {
  // CSS class
  fontSize: string;

  // Data
  vl_terbitanbersiris = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    public translate: TranslateService,
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private virtuallibraryserialpublicationService: VirtualLibrarySerialpublicationsService,
    private w3cService: W3csService
  ) {
    this.virtual_library_collection_category_id = this.route.snapshot.paramMap.get(
      "category_id"
    );
    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "collection_id"
    );
    if (
      this.virtual_library_collection_category_id &&
      this.virtual_library_collection_id
    ) {
      this.getData();
    }
  }

  getData() {
    this.virtuallibraryserialpublicationService
      .filter(
        "virtual_library_collection_id=" +
          this.virtual_library_collection_id +
          "&status=ACT"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_terbitanbersiris = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {
    this.addMetaTag();

    this.w3cService.currentFontSize.subscribe(
      (fontSize) => (this.fontSize = fontSize)
    );
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
