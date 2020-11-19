import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { VirtualLibraryCategoriesService } from "src/app/shared/services/virtual-library-categories/virtual-library-categories.service";
import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";
import { FontAwesome } from "src/assets/json/font-awesome-dropdown";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-collections-list",
  templateUrl: "./virtual-library-collections-list.component.html",
  styleUrls: ["./virtual-library-collections-list.component.scss"],
})
export class VirtualLibraryCollectionsListComponent implements OnInit {
  // Data
  categories = [];

  // Dropdown
  fontAwesomes = FontAwesome;
  links = [
    {
      value: "buku",
      display_name: "Buku",
    },
    {
      value: "terbitan-bersiri",
      display_name: "Terbitan Bersiri",
    },
    {
      value: "e-sumber",
      display_name: "eSumber",
    },
    {
      value: "arkib-kutubkhanah",
      display_name: "Arkib Kutubkhanah",
    },
    {
      value: "not-available",
      display_name: "Tiada",
    },
  ];

  // Table
  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  // FormGroup
  virtuallibrarycollectionFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private router: Router,
    private virtuallibrarycategoryService: VirtualLibraryCategoriesService,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService
  ) {
    this.virtuallibrarycollectionFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      icon: new FormControl(""),
      link: new FormControl(""),
      status: new FormControl(false),
      virtual_library_collection_category_id: new FormControl(""),
    });

    this.virtuallibrarycategoryService.filter("link=koleksi").subscribe(
      (res) => {
        console.log("res", res);
        this.categories = res;
        if (this.categories) {
          this.virtuallibrarycollectionFormGroup.patchValue({
            virtual_library_collection_category_id: this.categories[0].id,
          });
        }
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.virtuallibrarycollectionService.get().subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.tableTemp = this.tableRows.filter(function (d) {
      for (var key in d) {
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>, process: string, row) {
    if (process == "create") {
      this.virtuallibrarycollectionFormGroup.reset();
      if (this.categories) {
        this.virtuallibrarycollectionFormGroup.patchValue({
          virtual_library_collection_category_id: this.categories[0].id,
        });
      }
    } else if (process == "update") {
      this.virtuallibrarycollectionFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.virtuallibrarycollectionService
      .post(this.virtuallibrarycollectionFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya disimpan.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya disimpan. Sila cuba lagi",
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  update() {
    this.virtuallibrarycollectionService
      .update(
        this.virtuallibrarycollectionFormGroup.value,
        this.virtuallibrarycollectionFormGroup.value.id
      )
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
            })
            .then((result) => {
              if (result.value) {
                this.modal.hide();
                this.getData();
              }
            });
        },
        (err) => {
          console.error("err", err);
          swal
            .fire({
              title: "Ralat",
              text: "Data anda tidak berjaya dikemaskini. Sila cuba lagi",
              type: "warning",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-warning",
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  openPage(row) {
    if (row.link == "buku")
      this.router.navigate(["/virtual-libraries/collections/book/", row.id]);
    else if (row.link == "terbitan-bersiri")
      this.router.navigate([
        "/virtual-libraries/collections/serialpublication/",
        row.id,
      ]);
    else if (row.link == "e-sumber")
      this.router.navigate(["/virtual-libraries/collections/esource/", row.id]);
    else if (row.link == "arkib-kutubkhanah")
      this.router.navigate([
        "/virtual-libraries/collections/archivekutubkhanah/",
        row.id,
      ]);
  }

  getLink(value: string) {
    let result = this.links.find((obj) => {
      return obj.value == value;
    });
    return result.display_name;
  }
}
