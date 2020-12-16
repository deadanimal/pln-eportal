import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryArchiveKutubkhanahCategoriesService } from "src/app/shared/services/virtual-library-archivekutubkhanah-categories/virtual-library-archivekutubkhanah-categories.service";
import { VirtualLibraryArchiveKutubkhanahsService } from "src/app/shared/services/virtual-library-archivekutubkhanahs/virtual-library-archivekutubkhanahs.service";
import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";
import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";
import { W3csService } from "src/app/shared/services/w3cs/w3cs.service";

@Component({
  selector: "app-virtual-library-arkib-kutubkhanah",
  templateUrl: "./virtual-library-arkib-kutubkhanah.component.html",
  styleUrls: ["./virtual-library-arkib-kutubkhanah.component.scss"],
})
export class VirtualLibraryArkibKutubkhanahComponent implements OnInit {
  // CSS class
  fontSize: string;

  // Data
  archive_books = [];
  archive_serialpublications = [];
  vl_akk_categories = [];
  vl_akks = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    private metaTagService: Meta,
    private route: ActivatedRoute,
    private virtuallibraryarchivekutubkhanahcategoryService: VirtualLibraryArchiveKutubkhanahCategoriesService,
    private virtuallibraryarchivekutubkhanahService: VirtualLibraryArchiveKutubkhanahsService,
    private virtuallibrarybookService: VirtualLibraryBooksService,
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
      this.getArkibKutubkhanah();
      this.getArkibBuku();
      this.getArkibTerbitanBersiri();
    }
  }

  getData() {
    this.virtuallibraryarchivekutubkhanahcategoryService
      .filter(
        "virtual_library_collection_id=" +
          this.virtual_library_collection_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_akk_categories = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getArkibKutubkhanah() {
    this.virtuallibraryarchivekutubkhanahService
      .filter("status=true")
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_akks = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getArkibBuku() {
    this.virtuallibrarybookService.filter("status=ARC").subscribe(
      (res) => {
        console.log("res", res);
        this.archive_books = res;
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getArkibTerbitanBersiri() {
    this.virtuallibraryserialpublicationService.filter("status=ARC").subscribe(
      (res) => {
        console.log("res", res);
        this.archive_serialpublications = res;
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
