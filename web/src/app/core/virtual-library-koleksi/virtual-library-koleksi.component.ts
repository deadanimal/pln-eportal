import { Component, OnInit } from "@angular/core";
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

  ngOnInit() {}
}
