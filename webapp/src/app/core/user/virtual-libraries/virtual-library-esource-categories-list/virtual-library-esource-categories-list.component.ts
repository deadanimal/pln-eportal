import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { VirtualLibraryCollectionsService } from "src/app/shared/services/virtual-library-collections/virtual-library-collections.service";
import { VirtualLibraryESourceCategoriesService } from "src/app/shared/services/virtual-library-esource-categories/virtual-library-esource-categories.service";
import { FontAwesome } from "src/assets/json/font-awesome-dropdown";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-esource-categories-list",
  templateUrl: "./virtual-library-esource-categories-list.component.html",
  styleUrls: ["./virtual-library-esource-categories-list.component.scss"],
})
export class VirtualLibraryEsourceCategoriesListComponent implements OnInit {
  // Data
  virtual_library_collection_id = "";

  // Dropdown
  fontAwesomes = FontAwesome;

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
  virtuallibraryesourcecategoryFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private virtuallibrarycollectionService: VirtualLibraryCollectionsService,
    private virtuallibraryesourcecategoryService: VirtualLibraryESourceCategoriesService
  ) {
    this.virtuallibraryesourcecategoryFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      icon: new FormControl(""),
      status: new FormControl(false),
      virtual_library_collection_id: new FormControl(""),
    });

    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "esource"
    );
    if (this.virtual_library_collection_id) {
      this.virtuallibraryesourcecategoryFormGroup.patchValue({
        virtual_library_collection_id: this.virtual_library_collection_id,
      });
      this.getData();
    }
  }

  ngOnInit() {}

  getData() {
    this.virtuallibraryesourcecategoryService
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
      this.virtuallibraryesourcecategoryFormGroup.reset();
      if (this.virtual_library_collection_id) {
        this.virtuallibraryesourcecategoryFormGroup.patchValue({
          virtual_library_collection_id: this.virtual_library_collection_id,
        });
      }
    } else if (process == "update") {
      this.virtuallibraryesourcecategoryFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.virtuallibraryesourcecategoryService
      .post(this.virtuallibraryesourcecategoryFormGroup.value)
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
    this.virtuallibraryesourcecategoryService
      .update(
        this.virtuallibraryesourcecategoryFormGroup.value,
        this.virtuallibraryesourcecategoryFormGroup.value.id
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

  delete(row) {
    swal
      .fire({
        title: "Buang data",
        text: "Adakah anda ingin membuang data ini?",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Ya",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.value) {
          this.virtuallibraryesourcecategoryService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
              swal.fire({
                title: "Proses Buang berjaya",
                text: "Data anda berjaya dibuang.",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              });
              this.getData();
            },
            (err) => {
              console.error("err", err);
              swal.fire({
                title: "Proses Buang tidak berjaya",
                text: "Data anda tidak berjaya dibuang. Sila cuba lagi.",
                type: "warning",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-warning",
              });
            }
          );
        }
      });
  }
}
