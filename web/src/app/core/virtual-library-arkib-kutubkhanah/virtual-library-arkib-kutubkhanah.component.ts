import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryArchiveKutubkhanahCategoriesService } from "src/app/shared/services/virtual-library-archivekutubkhanah-categories/virtual-library-archivekutubkhanah-categories.service";
import { VirtualLibraryArchiveKutubkhanahsService } from "src/app/shared/services/virtual-library-archivekutubkhanahs/virtual-library-archivekutubkhanahs.service";

@Component({
  selector: "app-virtual-library-arkib-kutubkhanah",
  templateUrl: "./virtual-library-arkib-kutubkhanah.component.html",
  styleUrls: ["./virtual-library-arkib-kutubkhanah.component.scss"],
})
export class VirtualLibraryArkibKutubkhanahComponent implements OnInit {
  // Data
  vl_akk_categories = [];
  vl_akks = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    private route: ActivatedRoute,
    private virtuallibraryarchivekutubkhanahcategoryService: VirtualLibraryArchiveKutubkhanahCategoriesService,
    private virtuallibraryarchivekutubkhanahService: VirtualLibraryArchiveKutubkhanahsService
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

  ngOnInit() {}
}
