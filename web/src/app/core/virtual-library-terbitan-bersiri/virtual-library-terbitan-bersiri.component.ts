import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibrarySerialpublicationsService } from "src/app/shared/services/virtual-library-serialpublications/virtual-library-serialpublications.service";

@Component({
  selector: "app-virtual-library-terbitan-bersiri",
  templateUrl: "./virtual-library-terbitan-bersiri.component.html",
  styleUrls: ["./virtual-library-terbitan-bersiri.component.scss"],
})
export class VirtualLibraryTerbitanBersiriComponent implements OnInit {
  // Data
  vl_terbitanbersiris = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    private route: ActivatedRoute,
    private virtuallibraryserialpublicationService: VirtualLibrarySerialpublicationsService
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
          "&status=true"
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

  ngOnInit() {}
}
