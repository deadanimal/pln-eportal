import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";
import { VirtualLibraryArchiveKutubkhanahCategoriesService } from "src/app/shared/services/virtual-library-archivekutubkhanah-categories/virtual-library-archivekutubkhanah-categories.service";
import { FontAwesome } from "src/assets/json/font-awesome-dropdown";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-archivekutubkhanah-categories-list",
  templateUrl:
    "./virtual-library-archivekutubkhanah-categories-list.component.html",
  styleUrls: [
    "./virtual-library-archivekutubkhanah-categories-list.component.scss",
  ],
})
export class VirtualLibraryArchivekutubkhanahCategoriesListComponent
  implements OnInit {
  // Data
  virtual_library_collection_id = "";

  // Dropdown
  fontAwesomes = FontAwesome;
  archivefroms = [
    {
      value: "KBK",
      display_name: "Koleksi - Buku",
    },
    {
      value: "KTB",
      display_name: "Koleksi - Terbitan Bersiri",
    },
    {
      value: "NAV",
      display_name: "Tidak ada",
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
    ignoreBackdropClick: true,
  };

  // FormGroup
  virtuallibraryarchivekutubkhanahcategoryFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService,
    private virtuallibraryarchivekutubkhanahcategoryService: VirtualLibraryArchiveKutubkhanahCategoriesService
  ) {
    this.virtuallibraryarchivekutubkhanahcategoryFormGroup = this.formBuilder.group(
      {
        id: new FormControl(""),
        name_en: new FormControl(""),
        name_ms: new FormControl(""),
        icon: new FormControl(""),
        archive_from: new FormControl(""),
        status: new FormControl(false),
        virtual_library_collection_id: new FormControl(""),
      }
    );

    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "archivekutubkhanah"
    );
    if (this.virtual_library_collection_id) {
      this.virtuallibraryarchivekutubkhanahcategoryFormGroup.patchValue({
        virtual_library_collection_id: this.virtual_library_collection_id,
      });
      this.getData();
    }
  }

  ngOnInit() {}

  getData() {
    this.virtuallibraryarchivekutubkhanahcategoryService
      .filter(
        "virtual_library_collection_id=" + this.virtual_library_collection_id
      )
      .subscribe((res) => {
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
      this.virtuallibraryarchivekutubkhanahcategoryFormGroup.reset();
      if (this.virtual_library_collection_id) {
        this.virtuallibraryarchivekutubkhanahcategoryFormGroup.patchValue({
          virtual_library_collection_id: this.virtual_library_collection_id,
        });
      }
    } else if (process == "update") {
      this.virtuallibraryarchivekutubkhanahcategoryFormGroup.patchValue({
        ...row,
        status: row.status.toString(),
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.virtuallibraryarchivekutubkhanahcategoryService
      .post(this.virtuallibraryarchivekutubkhanahcategoryFormGroup.value)
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya disimpan.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
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
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
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
    this.virtuallibraryarchivekutubkhanahcategoryService
      .update(
        this.virtuallibraryarchivekutubkhanahcategoryFormGroup.value,
        this.virtuallibraryarchivekutubkhanahcategoryFormGroup.value.id
      )
      .subscribe(
        (res) => {
          // console.log("res", res);
          swal
            .fire({
              title: "Berjaya",
              text: "Data anda berjaya dikemaskini.",
              icon: "success",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-success",
              },
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
              icon: "warning",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-warning",
              },
            })
            .then((result) => {
              if (result.value) {
                // this.modal.hide();
              }
            });
        }
      );
  }

  delete(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-secondary",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.virtuallibraryarchivekutubkhanahcategoryService
            .delete(row.id)
            .subscribe(
              (res) => {
                // console.log("res", res);
                swal.fire({
                  title: "Proses Buang berjaya",
                  text: "Data anda berjaya dibuang.",
                  icon: "success",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                });
                this.getData();
              },
              (err) => {
                console.error("err", err);
                swal.fire({
                  title: "Proses Buang tidak berjaya",
                  text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                  icon: "warning",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-warning",
                  },
                });
              }
            );
        }
      });
  }
}
