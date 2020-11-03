import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryBooksService } from "src/app/shared/services/virtual-library-books/virtual-library-books.service";

@Component({
  selector: "app-virtual-library-buku",
  templateUrl: "./virtual-library-buku.component.html",
  styleUrls: ["./virtual-library-buku.component.scss"],
})
export class VirtualLibraryBukuComponent implements OnInit {
  // Data
  vl_bukus = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    private route: ActivatedRoute,
    private virtuallibrarybookService: VirtualLibraryBooksService
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
    this.virtuallibrarybookService
      .filter(
        "virtual_library_collection_id=" +
          this.virtual_library_collection_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_bukus = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {}
}
