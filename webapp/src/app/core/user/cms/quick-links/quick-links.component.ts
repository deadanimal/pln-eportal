import { Component, OnInit, TemplateRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import swal from "sweetalert2";

import { QuickLinkCategoriesService } from "src/app/shared/services/quick-link-categories/quick-link-categories.service";
import { QuickLinksService } from "src/app/shared/services/quick-links/quick-links.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-quick-links",
  templateUrl: "./quick-links.component.html",
  styleUrls: ["./quick-links.component.scss"],
})
export class QuickLinksComponent implements OnInit {
  // Data

  // Dropdown
  categories = [];

  // FormGroup
  categoryFormGroup: FormGroup;
  quicklinkFormGroup: FormGroup;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog",
  };

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any[] = [];

  tableEntries: number = 5;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  constructor(
    public formBuilder: FormBuilder,
    private modalService: BsModalService,
    private quicklinkcategoryService: QuickLinkCategoriesService,
    private quicklinkService: QuickLinksService
  ) {
    this.getCategory();
    this.getData();

    this.categoryFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      status: new FormControl(false),
    });

    this.quicklinkFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      link: new FormControl(""),
      category: new FormControl(""),
      status: new FormControl(false),
    });
  }

  ngOnInit() {}

  getCategory() {
    this.quicklinkcategoryService.get().subscribe(
      (res) => {
        this.categories = res;
        this.rows = res;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            no: key,
          };
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getData() {
    this.quicklinkService.extended().subscribe((res) => {
      this.tableRows = res;
      this.tableTemp = this.tableRows.map((prop, key) => {
        return {
          ...prop,
          no: key,
        };
      });
    });
  }

  // Datatable Kategori
  catEntriesChange($event) {
    this.entries = $event.target.value;
  }

  catFilterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
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

  catOnSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  catOnActivate(event) {
    this.activeRow = event.row;
  }

  // Datatable Pautan Pantas
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
      this.quicklinkFormGroup.reset();
    } else if (process == "update") {
      this.quicklinkFormGroup.patchValue({
        ...row,
        category: row.category ? row.category.id : ""
      });
    } else if (process == "categorycreate") {
      this.categoryFormGroup.reset();
    } else if (process == "categoryupdate") {
      this.categoryFormGroup.patchValue({
        ...row,
      });
    }
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  createCat() {
    this.quicklinkcategoryService.post(this.categoryFormGroup.value).subscribe(
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
              this.getCategory();
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

  updateCat() {
    this.quicklinkcategoryService
      .update(this.categoryFormGroup.value, this.categoryFormGroup.value.id)
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
                this.getCategory();
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

  create() {
    this.quicklinkService.post(this.quicklinkFormGroup.value).subscribe(
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
              this.getCategory();
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
    this.quicklinkService
      .update(this.quicklinkFormGroup.value, this.quicklinkFormGroup.value.id)
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
                this.getCategory();
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
}
