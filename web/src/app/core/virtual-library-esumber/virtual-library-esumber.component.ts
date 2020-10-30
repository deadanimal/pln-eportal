import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { VirtualLibraryESourceCategoriesService } from 'src/app/shared/services/virtual-library-esource-categories/virtual-library-esource-categories.service';
import { VirtualLibraryESourcesService } from 'src/app/shared/services/virtual-library-esources/virtual-library-esources.service';

@Component({
  selector: 'app-virtual-library-esumber',
  templateUrl: './virtual-library-esumber.component.html',
  styleUrls: ['./virtual-library-esumber.component.scss']
})
export class VirtualLibraryEsumberComponent implements OnInit {
  // Data
  vl_esumber_categories = [];
  vl_esumbers = [];
  virtual_library_collection_category_id: string = "";
  virtual_library_collection_id: string = "";

  constructor(
    private route: ActivatedRoute,
    private virtuallibraryesourcecategoryService: VirtualLibraryESourceCategoriesService,
    private virtuallibraryesourceService: VirtualLibraryESourcesService
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
      this.getESumber();
    }
  }

  getData() {
    this.virtuallibraryesourcecategoryService
      .filter(
        "virtual_library_collection_id=" +
          this.virtual_library_collection_id +
          "&status=true"
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_esumber_categories = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  getESumber() {
    this.virtuallibraryesourceService
      .filter("status=true")
      .subscribe(
        (res) => {
          console.log("res", res);
          this.vl_esumbers = res;
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  ngOnInit() {}
}
