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

import { VirtualLibraryESourceCategoriesService } from "src/app/shared/services/virtual-library-esource-categories/virtual-library-esource-categories.service";
import { VirtualLibraryESourcesService } from "src/app/shared/services/virtual-library-esources/virtual-library-esources.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-virtual-library-esources-list",
  templateUrl: "./virtual-library-esources-list.component.html",
  styleUrls: ["./virtual-library-esources-list.component.scss"],
})
export class VirtualLibraryEsourcesListComponent implements OnInit {
  // Data
  virtual_library_collection_id = "";
  virtual_library_esource_category_id = "";

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
  virtuallibraryesourceFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private virtuallibraryesourcecategoryService: VirtualLibraryESourceCategoriesService,
    private virtuallibraryesourceService: VirtualLibraryESourcesService
  ) {
    this.virtuallibraryesourceFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name_en: new FormControl(""),
      name_ms: new FormControl(""),
      link: new FormControl(""),
      status: new FormControl(false),
      virtual_library_esource_category_id: new FormControl(""),
    });

    this.virtual_library_collection_id = this.route.snapshot.paramMap.get(
      "esource"
    );
    this.virtual_library_esource_category_id = this.route.snapshot.paramMap.get(
      "id"
    );
    if (
      this.virtual_library_collection_id &&
      this.virtual_library_esource_category_id
    ) {
      this.virtuallibraryesourceFormGroup.patchValue({
        virtual_library_esource_category_id: this
          .virtual_library_esource_category_id,
      });
      this.getData();
    }
  }

  ngOnInit() {}

  getData() {
    this.virtuallibraryesourceService
      .filter(
        "virtual_library_esource_category_id=" +
          this.virtual_library_esource_category_id
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
      this.virtuallibraryesourceFormGroup.reset();
      if (
        this.virtual_library_collection_id &&
        this.virtual_library_esource_category_id
      ) {
        this.virtuallibraryesourceFormGroup.patchValue({
          virtual_library_esource_category_id: this
            .virtual_library_esource_category_id,
        });
      }
    } else if (process == "update") {
      this.virtuallibraryesourceFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  create() {
    this.virtuallibraryesourceService
      .post(this.virtuallibraryesourceFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
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
    this.virtuallibraryesourceService
      .update(
        this.virtuallibraryesourceFormGroup.value,
        this.virtuallibraryesourceFormGroup.value.id
      )
      .subscribe(
        (res) => {
          console.log("res", res);
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
          this.virtuallibraryesourceService.delete(row.id).subscribe(
            (res) => {
              console.log("res", res);
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
